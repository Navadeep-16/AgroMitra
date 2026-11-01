# 🌾 AgroMitra — Java Spring Boot Modular Backend Architecture

This document defines the production backend architecture for **AgroMitra**, adhering to enterprise domain-driven design, Spring Security 6 with stateless JWT authentication, Spring Data JPA with Hibernate, and clean separation of concerns.

---

## 1. Project Organization & Package Hierarchy

```text
com.agromitra
├── AgroMitraApplication.java
│
├── config/
│   ├── SecurityConfig.java              # Spring Security filter chain, CORS & CSRF
│   ├── JwtAuthenticationFilter.java     # Stateless Bearer token extractor & validator
│   ├── JwtTokenProvider.java            # Cryptographic token generator (HMAC-SHA256)
│   ├── OpenApiConfig.java               # Swagger 3 / OpenAPI documentation
│   └── WebMvcConfig.java                # Global CORS & interceptors
│
├── common/
│   ├── ApiResponse.java                 # Standardized envelope: { success, message, data, timestamp }
│   ├── BaseEntity.java                  # Auditable mapped superclass: createdAt, updatedAt
│   └── exception/
│       ├── GlobalExceptionHandler.java  # @RestControllerAdvice with RFC 7807 ProblemDetails
│       ├── ResourceNotFoundException.java
│       ├── BadRequestException.java
│       └── UnauthorizedException.java
│
└── modules/
    ├── auth/                            # User registration, login, token refresh, OTP
    │   ├── controller/AuthController.java
    │   ├── service/AuthService.java
    │   ├── dto/LoginRequest.java
    │   ├── dto/RegisterRequest.java
    │   └── dto/AuthResponse.java
    │
    ├── user/                            # User entity & role repository
    ├── farmer/                          # FarmerProfile, landpassbook records
    ├── farm/                            # Farm, FarmZone, SoilReport entities & services
    ├── crop/                            # Crop, CropVariety, FarmCrop, CropActivity phenology
    ├── weather/                         # WeatherService client with IMD / OpenWeather cache
    ├── recommendation/                  # CropRecommendationService (Rule-based & AI bridge)
    ├── disease/                         # PlantDiseaseService & Vision AI REST client
    ├── ai/                              # AIService client to Python FastAPI microservice
    ├── product/                         # Product, ProductCategory, ProductBatch entities
    ├── inventory/                       # Inventory tracking, batch audits & low stock alerts
    ├── cart/                            # Cart & CartItem management
    ├── order/                           # Order lifecycle state machine, OrderItem, tracking
    ├── payment/                         # UPI / Razorpay payment gateway integration
    ├── expert/                          # ExpertQuestion & ExpertResponse consultation workflow
    ├── market/                          # Mandi MarketPrice polling & AGMARKNET integration
    ├── expense/                         # Farm expenses, cost-per-acre, financial summary
    ├── notification/                    # Push notifications, SMS gateway & in-app alerts
    ├── community/                       # Community posts, comments, likes & moderation
    ├── content/                         # Knowledge hub articles & Government schemes
    └── admin/                           # Platform governance, verification, and audit logs
```

---

## 2. Security & JWT Filter Chain Configuration

```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final UserDetailsService userDetailsService;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthFilter, UserDetailsService userDetailsService) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(Customizer.withDefaults())
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Public Endpoints
                .requestMatchers(
                    "/api/auth/**",
                    "/api/products/**",
                    "/api/market-prices/**",
                    "/api/weather/**",
                    "/api/schemes/**",
                    "/api/articles/**",
                    "/swagger-ui/**",
                    "/v3/api-docs/**"
                ).permitAll()
                // Role-Protected Endpoints
                .requestMatchers("/api/farmer/**", "/api/farms/**", "/api/expenses/**").hasRole("FARMER")
                .requestMatchers("/api/shop/**", "/api/inventory/**", "/api/batches/**").hasRole("SHOP_OWNER")
                .requestMatchers("/api/expert/**").hasRole("EXPERT")
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .authenticationProvider(authenticationProvider())
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }
}
```

---

## 3. Core REST API Endpoints Specification

| Method | Endpoint | Allowed Roles | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register new User & profile |
| `POST` | `/api/auth/login` | Public | Authenticate and return JWT token |
| `GET` | `/api/farms` | FARMER, ADMIN | List registered farm parcels for authenticated farmer |
| `POST` | `/api/farms` | FARMER | Create new farm parcel with soil type and zones |
| `GET` | `/api/crops` | FARMER | List current crops and phenological stage progress |
| `POST` | `/api/crops` | FARMER | Register newly sown crop and calculate lifecycle |
| `POST` | `/api/recommendations/crop` | FARMER, EXPERT | Execute multi-variable crop suitability recommendation |
| `POST` | `/api/disease/analyze` | FARMER | Submit leaf image for neural computer-vision diagnosis |
| `POST` | `/api/ai/chat` | All | Agri conversational assistant turn |
| `GET` | `/api/weather` | Public | Live weather conditions and agro advisories |
| `GET` | `/api/products` | Public | Paginated product catalog with category and crop filters |
| `POST` | `/api/cart/items` | FARMER | Add authenticated batch item to shopping cart |
| `POST` | `/api/orders` | FARMER | Place order with store pickup or farm delivery |
| `GET` | `/api/orders` | FARMER, SHOP_OWNER | Track orders and order lifecycle history |
| `PATCH`| `/api/shop/orders/{id}/status`| SHOP_OWNER | Update order status (Packed, Ready, Delivered) |
| `GET` | `/api/orders/{id}/invoice` | All (Owner) | Generate printable tax invoice |
| `POST` | `/api/expenses` | FARMER | Log field expenditure by category |
| `GET` | `/api/expenses/summary` | FARMER | Profit & loss breakdown and cost per acre |
| `GET` | `/api/market-prices` | Public | Mandi modal rates across regional yards |
| `POST` | `/api/expert/questions` | FARMER | Submit photo and query to Krishi Vigyan Kendra |
| `POST` | `/api/expert/questions/{id}/answer` | EXPERT | Issue diagnostic summary and recommendations |
```

---

## 4. Layered Architectural Directives

1. **Controller Layer**:
   - Zero business logic in `@RestController` classes.
   - Responsible only for request binding, Bean Validation (`@Valid`), role annotations (`@PreAuthorize`), and returning `ResponseEntity<ApiResponse<T>>`.
2. **Service Layer**:
   - Transactional business logic `@Transactional(readOnly = ...)` strictly lives in service implementations.
   - Domain state transitions (such as Order lifecycle `Placed` -> `Confirmed` -> `Packed` -> `Ready for Pickup` -> `Delivered`) enforced here.
3. **Repository Layer**:
   - Leverages Spring Data JPA interfaces extending `JpaRepository<T, UUID>` and `JpaSpecificationExecutor<T>` for dynamic multi-attribute product filters.
4. **DTO & Mapper**:
   - MapStruct for zero-overhead compile-time mapping between JPA Entities and JSON DTOs, preventing infinite JSON recursion and hiding sensitive fields (e.g. password hashes).

