export type ProductCategory = 
  | 'Seeds'
  | 'Fertilizers'
  | 'Crop Protection'
  | 'Organic Products'
  | 'Farming Accessories';

export interface ProductBatch {
  id: string;
  batchNumber: string;
  manufacturingDate: string;
  expiryDate: string;
  supplierName: string;
  purchasePrice: number;
  sellingPrice: number;
  quantityAdded: number;
  quantityRemaining: number;
  qrCodeToken: string;
  verifiedAuthentic: boolean;
}

export interface Product {
  id: string;
  shopId: string;
  shopName: string;
  name: string;
  nameTe: string;
  category: ProductCategory;
  brand: string;
  packSize: string;
  price: number;
  mrp: number;
  stockQuantity: number;
  lowStockThreshold: number;
  sku: string;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  description: string;
  descriptionTe: string;
  suitableCrops: string[];
  activeIngredients?: string;
  dosageInstructions?: string;
  safetyInstructions?: string;
  storageInstructions?: string;
  manufacturer: string;
  batches: ProductBatch[];
  isOrganic?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedBatch?: ProductBatch;
}

export type OrderStatus = 
  | 'Placed'
  | 'Confirmed'
  | 'Packed'
  | 'Out for Delivery'
  | 'Ready for Pickup'
  | 'Delivered'
  | 'Cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  category: ProductCategory;
  packSize: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  batchNumber?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  shopId: string;
  shopName: string;
  shopPhone: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  taxAmount: number;
  totalAmount: number;
  deliveryType: 'Store Pickup' | 'Home Delivery';
  deliveryAddress?: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    note?: string;
  }[];
  paymentMethod: 'Cash on Delivery / Pickup' | 'UPI / Digital Payment';
  paymentStatus: 'Pending' | 'Paid';
  invoiceNumber?: string;
}

export interface Invoice {
  invoiceNumber: string;
  orderId: string;
  orderNumber: string;
  date: string;
  shopName: string;
  shopAddress: string;
  shopGstin: string;
  shopPhone: string;
  farmerName: string;
  farmerPhone: string;
  farmerAddress: string;
  items: OrderItem[];
  subtotal: number;
  cgst: number;
  sgst: number;
  total: number;
  paymentMode: string;
}

