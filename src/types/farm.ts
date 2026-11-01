export type SoilType = 'Black Soil' | 'Red Soil' | 'Alluvial Soil' | 'Sandy Loam' | 'Clay Loam' | 'Laterite';
export type IrrigationType = 'Drip' | 'Sprinkler' | 'Canal / Flood' | 'Borewell' | 'Rainfed';

export interface FarmZone {
  id: string;
  name: string;
  acres: number;
  cropName: string;
  cropVariety: string;
  color: string;
  soilMoisturePercent: number;
  healthIndex: 'Optimal' | 'Needs Attention' | 'Good';
}

export interface Farm {
  id: string;
  farmerId: string;
  farmName: string;
  village: string;
  district: string;
  state: string;
  totalAcres: number;
  soilType: SoilType;
  irrigationType: IrrigationType;
  waterSource: string;
  currentCrop: string;
  cropVariety: string;
  sowingDate: string;
  zones: FarmZone[];
  latitude?: number;
  longitude?: number;
  createdAt: string;
}

export type CropGrowthStage = 
  | 'Sowing'
  | 'Germination'
  | 'Vegetative Growth'
  | 'Flowering'
  | 'Fruit Development'
  | 'Harvest';

export interface Crop {
  id: string;
  farmId: string;
  name: string;
  nameTe: string;
  variety: string;
  sowingDate: string;
  estimatedHarvestDate: string;
  acres: number;
  currentStage: CropGrowthStage;
  stageProgressPercent: number;
  daysSinceSowing: number;
  totalDurationDays: number;
  healthStatus: 'Excellent' | 'Good' | 'Fair' | 'At Risk';
  targetYieldQuintals: number;
  actualYieldQuintals?: number;
}

export interface CropActivity {
  id: string;
  cropId: string;
  farmId: string;
  title: string;
  titleTe: string;
  scheduledDay: number;
  dueDate: string;
  category: 'Sowing' | 'Irrigation' | 'Fertilization' | 'Pest Scouting' | 'Weeding' | 'Harvest';
  completed: boolean;
  completedAt?: string;
  notes?: string;
}

export interface SoilReport {
  id: string;
  farmId: string;
  sampleDate: string;
  reportYear: number;
  ph: number; // optimal: 6.0 - 7.5
  nitrogenKgPerHa: number; // Low < 280, Med 280-560, High > 560
  phosphorusKgPerHa: number; // Low < 10, Med 10-25, High > 25
  potassiumKgPerHa: number; // Low < 108, Med 108-280, High > 280
  organicCarbonPercent: number; // Low < 0.5%, Med 0.5-0.75%, High > 0.75%
  electricalConductivity: number; // dS/m
  micronutrientsStatus: {
    zinc: 'Adequate' | 'Deficient';
    iron: 'Adequate' | 'Deficient';
    boron: 'Adequate' | 'Deficient';
  };
  recommendations: string[];
  recommendationsTe: string[];
}

export interface FarmExpense {
  id: string;
  farmerId: string;
  farmId: string;
  date: string;
  category: 'Seeds' | 'Fertilizer' | 'Crop Protection' | 'Labour' | 'Irrigation' | 'Machinery' | 'Transport' | 'Other';
  description: string;
  amount: number;
  cropSeason: string;
}

export interface FarmFinancialSummary {
  season: string;
  year: number;
  crop: string;
  acres: number;
  totalExpenses: number;
  costPerAcre: number;
  yieldQuintals: number;
  sellingPricePerQuintal: number;
  totalRevenue: number;
  netProfit: number;
  profitPerAcre: number;
}

