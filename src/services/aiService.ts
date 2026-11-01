import { CropRecommendationInput, CropSuitabilityResult, PlantDiseaseDiagnosis, AIChatMessage } from '../types/ai';
import { SEED_DISEASE_SAMPLES } from './storage';

// Smart Crop Recommendation Engine
export class CropRecommendationEngine {
  static evaluate(input: CropRecommendationInput): CropSuitabilityResult[] {
    const results: CropSuitabilityResult[] = [];

    // 1. Cotton Evaluation
    let cottonScore = 65;
    if (input.soilType === 'Black Soil' || input.soilType === 'Clay Loam') cottonScore += 18;
    if (input.ph >= 6.5 && input.ph <= 8.0) cottonScore += 8;
    if (input.nitrogen >= 200 && input.nitrogen <= 380) cottonScore += 5;
    if (input.season === 'Kharif') cottonScore += 8;
    if (input.irrigationType === 'Drip' || input.irrigationType === 'Borewell') cottonScore += 6;
    cottonScore = Math.min(Math.max(cottonScore, 35), 96);

    results.push({
      cropName: 'Cotton (Bt Hybrid)',
      cropNameTe: 'హైబ్రిడ్ పత్తి',
      suitabilityScore: cottonScore,
      expectedYieldRange: '10 - 14 Quintals / Acre',
      growthDurationDays: 140,
      waterRequirement: 'Medium',
      riskLevel: 'Moderate',
      explanation: `Your ${input.soilType} with pH ${input.ph} provides optimal cation exchange capacity for taproot growth. With ${input.irrigationType} irrigation and Kharif conditions, high boll retention is anticipated.`,
      explanationTe: `${input.soilType} మరియు pH ${input.ph} విలువ పత్తి వేరు వ్యవస్థ వ్యాప్తికి ఎంతో అనుకూలం. డ్రిప్ ద్వారా కరిగే ఎరువులు అందిస్తే ఆశించిన దిగుబడి సాధించవచ్చు.`,
      optimalConditions: {
        ph: '6.5 - 8.0',
        temperature: '25°C - 35°C',
        rainfall: '650 - 900 mm',
        soil: 'Deep Black or Clay Loam with good drainage'
      },
      keyAdvice: [
        'Apply basal DAP (50kg) + MOP (25kg) during deep ploughing.',
        'Use drip fertigation with 19:19:19 from 30 to 75 days after sowing.',
        'Install 8 pheromone traps per acre for early pink bollworm detection.'
      ],
      keyAdviceTe: [
        'దుక్కిలో ఎకరాకు 50 కిలోల డీఏపీ మరియు 25 కిలోల పొటాష్ వేయండి.',
        '30 నుండి 75 రోజుల వరకు డ్రిప్ ద్వారా 19:19:19 ఎరువును అందించండి.',
        'గులాబీ రంగు కాయతొలుచు పురుగు నిఘా కోసం ఎకరాకు 8 లింగాకర్షక బుట్టలు అమర్చండి.'
      ]
    });

    // 2. Chilli Evaluation
    let chilliScore = 60;
    if (input.soilType === 'Black Soil' || input.soilType === 'Red Soil') chilliScore += 15;
    if (input.potassium >= 250) chilliScore += 10;
    if (input.irrigationType === 'Drip') chilliScore += 12;
    if (input.ph >= 6.0 && input.ph <= 7.5) chilliScore += 6;
    chilliScore = Math.min(Math.max(chilliScore, 30), 94);

    results.push({
      cropName: 'Chilli (Teja / Hot Hybrid)',
      cropNameTe: 'తేజ హైబ్రిడ్ మిరప',
      suitabilityScore: chilliScore,
      expectedYieldRange: '22 - 30 Quintals (Dry) / Acre',
      growthDurationDays: 160,
      waterRequirement: 'Medium',
      riskLevel: 'Moderate',
      explanation: `Chilli thrives with high potassium availability (${input.potassium} kg/ha in your report) and controlled moisture through ${input.irrigationType}. Excellent market value at regional mandis.`,
      explanationTe: `నేలలో పొటాష్ శాతం బాగున్నందున మరియు డ్రిప్ సేద్యం ఉన్నందున మిరప పంటకు అత్యంత అనుకూలం. మంచి మార్కెట్ ధర పొందవచ్చు.`,
      optimalConditions: {
        ph: '6.0 - 7.5',
        temperature: '20°C - 32°C',
        rainfall: '600 - 800 mm',
        soil: 'Well-drained Black or Red Loam'
      },
      keyAdvice: [
        'Erect 25 yellow & blue sticky traps per acre against thrips and mites.',
        'Ensure raised bed transplantation with silver-black mulch sheet for moisture retention.',
        'Foliar spray of micronutrient mixture at 40 and 65 days after transplantation.'
      ],
      keyAdviceTe: [
        'తామర పురుగులు, నల్లి నివారణకు ఎకరాకు 25 పసుపు, నీలి రంగు జిగురు అట్టలు పెట్టండి.',
        'తేమ సంరక్షణకు మల్చింగ్ షీట్లపై ఎత్తు మడులలో నారు నాటండి.',
        '40 మరియు 65 రోజుల వద్ద సూక్ష్మ పోషకాల మిశ్రమాన్ని పిచికారీ చేయండి.'
      ]
    });

    // 3. Maize Evaluation
    let maizeScore = 70;
    if (input.nitrogen >= 280) maizeScore += 12;
    if (input.rainfall >= 400 && input.rainfall <= 800) maizeScore += 8;
    maizeScore = Math.min(Math.max(maizeScore, 40), 91);

    results.push({
      cropName: 'Maize (Single Cross Hybrid)',
      cropNameTe: 'హైబ్రిడ్ మొక్కజొన్న',
      suitabilityScore: maizeScore,
      expectedYieldRange: '28 - 36 Quintals / Acre',
      growthDurationDays: 105,
      waterRequirement: 'Low',
      riskLevel: 'Low',
      explanation: `Maize is a sturdy, short-duration cereal requiring moderate water. Highly suitable as a rotation crop following cotton or pulses to break weed and pathogen cycles.`,
      explanationTe: `తక్కువ పెట్టుబడి, తక్కువ నీటితో 105 రోజుల్లో చేతికి వచ్చే నమ్మకమైన పంట. పత్తి తర్వాత పంట మార్పిడికి మేలైన ఎంపిక.`,
      optimalConditions: {
        ph: '6.0 - 7.8',
        temperature: '21°C - 30°C',
        rainfall: '500 - 750 mm',
        soil: 'Fertile loams with good water holding capacity'
      },
      keyAdvice: [
        'Monitor for Fall Armyworm (FAW) at knee-high stage (20-30 days).',
        'Top-dress Nitrogen in 3 splits at knee-high, tasseling, and grain-filling stages.'
      ],
      keyAdviceTe: [
        '20-30 రోజుల మోకాలి లోతు దశలో కత్తెర పురుగు ఉధృతిని గమనించండి.',
        'నత్రజని ఎరువును విడతల వారీగా పూత మరియు గింజ కట్టే దశలలో అందించండి.'
      ]
    });

    // 4. Red Gram (Pulses / Legume)
    results.push({
      cropName: 'Red Gram / Pigeon Pea',
      cropNameTe: 'కందులు (పప్పుధాన్యం)',
      suitabilityScore: 82,
      expectedYieldRange: '6 - 9 Quintals / Acre',
      growthDurationDays: 150,
      waterRequirement: 'Low',
      riskLevel: 'Low',
      explanation: 'Deep-rooted legume that biologically fixes 40-50 kg atmospheric Nitrogen per hectare, restoring organic carbon and soil porosity for succeeding seasons.',
      explanationTe: 'నత్రజనిని నేలలో స్థిరీకరించి భూసారాన్ని పెంచే సహజ సిద్ధమైన పప్పుధాన్యపు పంట. తక్కువ నీటితో అధిక నికరాదాయం.',
      optimalConditions: {
        ph: '6.5 - 7.5',
        temperature: '24°C - 32°C',
        rainfall: '600 - 700 mm',
        soil: 'Deep well-drained loams and black soils'
      },
      keyAdvice: [
        'Treat seed with Rhizobium culture (10g/kg seed) before sowing.',
        'Nip apical buds at 45-50 days to promote profusely branched lateral fruiting.'
      ],
      keyAdviceTe: [
        'విత్తే ముందు రైజోబియం కల్చర్‌తో విత్తన శుద్ధి చేయండి.',
        'ఎక్కువ కొమ్మలు, పూత రావడం కోసం 45-50 రోజుల వద్ద పైకొనలను గిల్లండి.'
      ]
    });

    // Sort by suitability descending
    return results.sort((a, b) => b.suitabilityScore - a.suitabilityScore);
  }
}

// Plant Disease Detection AI Service
export class DiseaseDetectionService {
  static async analyzeImage(sampleKey?: string, _fileName?: string): Promise<PlantDiseaseDiagnosis> {
    // Simulate real AI neural network processing latency
    await new Promise(resolve => setTimeout(resolve, 1400));

    if (sampleKey && SEED_DISEASE_SAMPLES[sampleKey]) {
      return SEED_DISEASE_SAMPLES[sampleKey];
    }

    // Default realistic diagnosis if user uploads custom image
    return {
      id: `diag-custom-${Date.now()}`,
      cropDetected: 'Cotton (Gossypium hirsutum)',
      cropDetectedTe: 'పత్తి పంట',
      diseaseName: 'Early Alternaria Leaf Spot (Fungal)',
      diseaseNameTe: 'ఆల్టర్నేరియా ఆకుమచ్చ తెగులు',
      confidenceScore: 91.2,
      severity: 'Moderate',
      imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=80',
      symptoms: [
        'Small, circular to irregular brown spots with grayish white centers on lower and middle leaves',
        'Purplish-brown margins encircling mature spots',
        'Premature shedding of severely spotted leaves under high humidity'
      ],
      symptomsTe: [
        'ఆకులపై చిన్న గుండ్రటి లేదా క్రమరహిత గోధుమ రంగు మచ్చలు',
        'మచ్చల చుట్టూ ముదురు ఎరుపు-గోధుమ అంచులు',
        'అధిక తేమ ఉన్నప్పుడు ఆకులు ఎండి రాలిపోవడం'
      ],
      culturalPrevention: [
        'Collect and destroy fallen infected leaf debris away from the field perimeter.',
        'Maintain proper row spacing to maximize sunlight penetration into the lower canopy.',
        'Avoid excessive late vegetative nitrogen application.'
      ],
      culturalPreventionTe: [
        'రాలిన రోగగ్రస్త ఆకులను ఏరివేసి నాశనం చేయండి.',
        'క్రింది ఆకులకు తగినంత సూర్యరశ్మి మరియు గాలి సోకేలా అంతరం పాటించండి.',
        'ఆలస్యంగా యూరియాను ఎక్కువగా వేయవద్దు.'
      ],
      organicRemedies: [
        'Foliar spray with Copper Oxychloride 50% WP @ 3g/L or Bio-fungicide Trichoderma viride @ 5g/L.',
        'Sour buttermilk solution (5% concentration) spray helps suppress fungal sporulation.'
      ],
      organicRemediesTe: [
        'కాపర్ ఆక్సిక్లోరైడ్ 3 గ్రాములు లేదా ట్రైకోడెర్మ విరిడి 5 గ్రాములు లీటరు నీటికి కలిపి పిచికారీ చేయండి.',
        'పుల్లటి మజ్జిగ ద్రావణం పిచికారీ చేయవచ్చు.'
      ],
      expertConsultationRecommended: true,
      disclaimer: 'This diagnosis is an informational computer-vision assessment. Follow registered agricultural label protocols and consult your local Krishi Vigyan Kendra specialist before applying plant protection chemicals.',
      suggestedInputCategories: ['Crop Protection', 'Organic Products']
    };
  }
}

// AgroMitra AI Assistant Conversational Agent
export class AgroMitraAIAssistant {
  static getResponse(question: string, lang: 'en' | 'te' = 'en'): AIChatMessage {
    const q = question.toLowerCase();

    // Telugu Responses
    if (lang === 'te') {
      if (q.includes('నల్లరేగడి') || q.includes('black soil') || q.includes('నేల')) {
        return {
          id: `msg-${Date.now()}`,
          sender: 'assistant',
          language: 'te',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `నల్లరేగడి నేలలు తేమను పట్టి ఉంచే స్వభావం మరియు సున్నపు పోషకాలు కలిగి ఉంటాయి. ఈ నేలలకు అత్యంత అనువైన పంటలు:\n\n1. **పత్తి (Cotton):** నల్లరేగడి నేలలో పత్తి వేర్లు బాగా విస్తరించి అధిక కాయలు నిలుస్తాయి.\n2. **మిరప (Chilli):** డ్రిప్ సేద్యం ఉంటే నల్లరేగడిలో అద్భుతమైన దిగుబడి వస్తుంది.\n3. **మొక్కజొన్న & శనగ (Maize & Bengal Gram):** రబీ సీజన్ లో శనగ పంట వేస్తే నత్రజని పెరిగి భూసారం బాగుపడుతుంది.\n\n*ముఖ్య సూచన:* అధిక వర్షాలప్పుడు మురుగునీరు పోయేలా డ్రైనేజ్ కాలువలు తీయడం తప్పనిసరి.`,
          suggestedActions: [
            { label: 'స్మార్ట్ పంట సిఫార్సు చూడండి', actionKey: 'recommendation' },
            { label: 'సాయిల్ హెల్త్ కార్డు చూడండి', actionKey: 'soil' }
          ]
        };
      }

      if (q.includes('పసుపు') || q.includes('ఆకులు') || q.includes('yellow') || q.includes('ముడత')) {
        return {
          id: `msg-${Date.now()}`,
          sender: 'assistant',
          language: 'te',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `ఆకులు పసుపు రంగులోకి మారడానికి లేదా ముడుచుకోవడానికి ప్రధాన కారణాలు:\n\n1. **నత్రజని (Nitrogen) లోపం:** క్రింది ముదురు ఆకులు మొత్తం పసుపుగా మారితే నత్రజని లోపం. 19:19:19 ఎరువును లీటరు నీటికి 5 గ్రాములు కలిపి పిచికారీ చేయండి.\n2. **రసం పీల్చే పురుగులు:** ఆకుల అడుగు భాగంలో పచ్చదోమ, పేనుబంక లేదా తామర పురుగులు రసం పీల్చడం వల్ల ఆకుల అంచులు పసుపుగా మారి ముడుచుకుంటాయి. వేపనూనె (10,000 PPM) 4 మి.లీ పిచికారీ చేయండి.\n3. **నీరు నిల్వ ఉండటం:** వేర్లకు గాలి ఆడకపోవడం వల్ల కూడా పసుపు రంగు వస్తుంది.\n\nఖచ్చితమైన రోగ నిర్ధారణ కోసం మా **"పంట తెగుళ్ల గుర్తింపు"** లో ఆకు ఫోటోను స్కాన్ చేయండి.`,
          suggestedActions: [
            { label: 'ఆకు తెగులు స్కాన్ చేయండి', actionKey: 'disease' },
            { label: 'శాస్త్రవేత్తను అడగండి', actionKey: 'expert' }
          ]
        };
      }

      if (q.includes('dap') || q.includes('npk') || q.includes('ఎరువు')) {
        return {
          id: `msg-${Date.now()}`,
          sender: 'assistant',
          language: 'te',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `**DAP మరియు NPK మధ్య తేడాలు:**\n\n- **DAP (18-46-0):** ఇందులో 18% నత్రజని మరియు 46% భాస్వరం మాత్రమే ఉంటుంది. పొటాష్ (K) ఉండదు. ఇది విత్తే సమయంలో లేదా నాటే సమయంలో ప్రాథమిక ఎరువుగా వేర్ల అభివృద్ధికి వాడతారు.\n- **NPK (ఉదా: 19:19:19 లేదా 20:20:0:13):** ఇందులో నత్రజని, భాస్వరం మరియు పొటాష్ మూడూ సమతుల్యంగా ఉంటాయి. పంట ఎదుగుదల మరియు పూత, కాత దశలలో డ్రిప్ ద్వారా లేదా పిచికారీ ద్వారా వాడతారు.\n\n*సిఫార్సు:* విత్తేప్పుడు డీఏపీ, ఆ తర్వాత పూత దశలో 19:19:19 వాడటం ద్వారా సమతుల్య పోషణ అందుతుంది.`,
          suggestedActions: [
            { label: 'రైతు అంగడిలో ఎరువులు చూడండి', actionKey: 'store' }
          ]
        };
      }

      // Default Telugu response
      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        language: 'te',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `నమస్కారం! మీ ప్రశ్నకు ధన్యవాదాలు. పంటల ఎంపిక, తెగుళ్ల నివారణ, ఎరువుల సమతుల్యత, వాతావరణ ఆధారిత పనులు మరియు మార్కెట్ ధరలపై నేను మీకు సహాయం చేయగలను. మీరు మీ పొలంలో గమనించిన లక్షణాలను లేదా పంట పేరును వివరించండి.`,
        suggestedActions: [
          { label: 'వాతావరణ హెచ్చరికలు చూడండి', actionKey: 'weather' },
          { label: 'వ్యవసాయ క్యాలెండర్ చూడండి', actionKey: 'calendar' }
        ]
      };
    }

    // English Responses
    if (q.includes('black soil') || q.includes('soil')) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        language: 'en',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `Black soils (Vertisols / Regur soils) have high clay content and remarkable moisture-retention capacity. The most profitable crops suited for black soils include:\n\n1. **Cotton (Bt Hybrids):** The deep root system benefits from moisture reserves. Maintain 90x60cm spacing.\n2. **Chilli:** Gives high capsaicin content and yield on raised beds with drip irrigation.\n3. **Maize & Pulses (Chickpea / Bengal Gram):** Ideal for crop rotation to break pest cycles and replenish nitrogen.\n\n*Agronomic Tip:* Incorporate decomposed organic manure to prevent severe surface cracking during dry spells.`,
        suggestedActions: [
          { label: 'Run Smart Crop Recommendation', actionKey: 'recommendation' },
          { label: 'Check Soil Health Card', actionKey: 'soil' }
        ]
      };
    }

    if (q.includes('yellow') || q.includes('leaves') || q.includes('curling')) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        language: 'en',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `Yellowing or leaf cupping in agricultural crops usually stems from 3 distinct factors:\n\n1. **Nitrogen Deficiency:** Bottom/older leaves turn uniformly pale yellow starting from leaf tips. Remedy: Foliar application of water-soluble 19:19:19 @ 5g/L.\n2. **Sucking Pest Attack (Whiteflies / Thrips / Jassids):** Leaves curl upward or downward with yellow chlorotic spots on margins. Remedy: Spray cold-pressed Neem Oil (10,000 PPM) @ 4ml/L or install sticky traps.\n3. **Root Waterlogging:** Temporary asphyxiation of roots due to heavy rain. Ensure field drainage furrows are cleared immediately.\n\nTo identify the exact cause, please upload a clear photo in our **Disease Detection** module!`,
        suggestedActions: [
          { label: 'Scan Leaf Image Now', actionKey: 'disease' },
          { label: 'Ask a KVK Expert', actionKey: 'expert' }
        ]
      };
    }

    if (q.includes('dap') || q.includes('npk') || q.includes('difference')) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        language: 'en',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `**Key Differences between DAP and NPK:**\n\n- **DAP (Di-Ammonium Phosphate 18:46:0):** Contains 18% Ammoniacal Nitrogen and 46% Phosphorus (P2O5). Contains ZERO potassium. It is primarily used as a **basal application** at sowing time to foster robust early root system establishment.\n- **NPK (e.g. 19:19:19 or 20:20:0:13):** A complete balanced grade supplying Nitrogen, Phosphorus, and Potassium in equal proportions. Best used through drip fertigation or foliar spray during **vegetative and flowering stages**.\n\n*Recommendation:* Use DAP in the soil furrow at sowing, and switch to 19:19:19 water-soluble grade from 35-70 days for balanced square and boll retention.`,
        suggestedActions: [
          { label: 'Browse Verified Fertilizers', actionKey: 'store' }
        ]
      };
    }

    if (q.includes('prepare') || q.includes('irrigation') || q.includes('field')) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        language: 'en',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `**Checklist Before Scheduling Field Irrigation:**\n\n1. **Check 48-Hour Weather Forecast:** Suspend irrigation if rain probability exceeds 50% to prevent root suffocation and nutrient leaching.\n2. **Soil Moisture Feel Test:** Dig 4-6 inches deep in the active root zone. If soil forms a firm moist ball without crumbling, irrigation can be delayed by 2 days.\n3. **Inspect Drip Lateral Flush Valves:** Ensure emitters are free from silt and algae before starting pump pressure.\n4. **Schedule in Early Morning:** Reduces evaporative loss by up to 35% compared to midday watering.`,
        suggestedActions: [
          { label: 'View Weather Dashboard', actionKey: 'weather' }
        ]
      };
    }

    // Default English response
    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      language: 'en',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `Hello! I am your AgroMitra AI farming companion. I can help you with crop suitability, soil nutrient balancing, pest identification, weather advisories, and certified input selection. Please share your crop type or what you're observing in your field!`,
      suggestedActions: [
        { label: 'Explore Weather Advisories', actionKey: 'weather' },
        { label: 'Check Farming Calendar', actionKey: 'calendar' }
      ]
    };
  }
}

