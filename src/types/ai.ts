export interface CropRecommendationInput {
  location: string;
  soilType: string;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature: number;
  humidity: number;
  rainfall: number;
  season: 'Kharif' | 'Rabi' | 'Zaid';
  irrigationType: string;
}

export interface CropSuitabilityResult {
  cropName: string;
  cropNameTe: string;
  suitabilityScore: number; // 0 - 100%
  expectedYieldRange: string;
  growthDurationDays: number;
  waterRequirement: 'Low' | 'Medium' | 'High';
  riskLevel: 'Low' | 'Moderate' | 'High';
  explanation: string;
  explanationTe: string;
  optimalConditions: {
    ph: string;
    temperature: string;
    rainfall: string;
    soil: string;
  };
  keyAdvice: string[];
  keyAdviceTe: string[];
}

export interface PlantDiseaseDiagnosis {
  id: string;
  cropDetected: string;
  cropDetectedTe: string;
  diseaseName: string;
  diseaseNameTe: string;
  confidenceScore: number; // e.g. 94.8%
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Healthy';
  imageUrl: string;
  sampleKey?: string;
  symptoms: string[];
  symptomsTe: string[];
  culturalPrevention: string[];
  culturalPreventionTe: string[];
  organicRemedies: string[];
  organicRemediesTe: string[];
  expertConsultationRecommended: boolean;
  disclaimer: string;
  suggestedInputCategories?: string[];
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  language: 'en' | 'te';
  imageAttached?: string;
  suggestedActions?: {
    label: string;
    actionKey: string;
  }[];
}

