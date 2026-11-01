export interface MarketPrice {
  id: string;
  crop: string;
  cropTe: string;
  variety: string;
  mandi: string;
  district: string;
  state: string;
  modalPrice: number; // ₹ per Quintal
  minPrice: number;
  maxPrice: number;
  changePercent: number; // e.g. +2.1%
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
  source: string;
}

export interface WeatherCondition {
  currentTemp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  humidityPercent: number;
  rainProbabilityPercent: number;
  rainfallMm: number;
  windSpeedKmh: number;
  windDirection: string;
  uvIndex: number;
  condition: 'Sunny' | 'Partly Cloudy' | 'Cloudy' | 'Light Rain' | 'Heavy Rain' | 'Thunderstorm';
  location: string;
  farmAlerts: {
    type: 'warning' | 'info' | 'caution';
    title: string;
    titleTe: string;
    description: string;
    descriptionTe: string;
    action: string;
  }[];
  forecast: {
    day: string;
    dayTe: string;
    date: string;
    maxTemp: number;
    minTemp: number;
    condition: string;
    rainProb: number;
    windSpeed: number;
  }[];
}

export interface ExpertConsultation {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  farmerLocation: string;
  crop: string;
  cropTe: string;
  issueCategory: 'Pest / Disease' | 'Nutrient Deficiency' | 'Irrigation / Weather' | 'Yield & Harvesting' | 'Seed Selection';
  question: string;
  imageUrl?: string;
  status: 'Pending' | 'Answered' | 'Closed';
  createdAt: string;
  expertResponse?: {
    expertId: string;
    expertName: string;
    expertTitle: string;
    responseDate: string;
    diagnosisSummary: string;
    recommendations: string[];
    preventiveGuidance: string;
  };
}

export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  authorVillage: string;
  content: string;
  cropTag: string;
  imageUrl?: string;
  likesCount: number;
  likedByCurrentUser: boolean;
  commentsCount: number;
  comments: {
    id: string;
    authorName: string;
    text: string;
    timestamp: string;
  }[];
  createdAt: string;
}

export interface GovernmentScheme {
  id: string;
  name: string;
  nameTe: string;
  shortDesc: string;
  shortDescTe: string;
  eligibility: string[];
  eligibilityTe: string[];
  benefits: string;
  benefitsTe: string;
  howToApply: string;
  howToApplyTe: string;
  officialSource: string;
  sourceUrl: string;
  lastUpdated: string;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  titleTe: string;
  category: 'Soil Management' | 'Drip Irrigation' | 'Pest Management' | 'Seeds & Sowing' | 'Organic Farming' | 'Harvesting';
  summary: string;
  summaryTe: string;
  content: string;
  readTimeMinutes: number;
  author: string;
  publishedDate: string;
  lastUpdated: string;
  imageUrl: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  type: 'weather' | 'crop' | 'order' | 'expert' | 'market';
  title: string;
  titleTe: string;
  message: string;
  messageTe: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

