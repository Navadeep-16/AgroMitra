export type UserRole = 'FARMER' | 'SHOP_OWNER' | 'EXPERT' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  location: string;
  district: string;
  state: string;
  preferredLanguage: 'en' | 'te';
  createdAt: string;
}

export interface FarmerProfile {
  id: string;
  userId: string;
  totalAcreage: number;
  primaryCrops: string[];
  kisanCreditCardNo?: string;
  soilHealthCardId?: string;
  bankAccountLinked: boolean;
}

export interface Shop {
  id: string;
  ownerId: string;
  shopName: string;
  ownerName: string;
  licenseNumber: string;
  phone: string;
  email: string;
  address: string;
  district: string;
  state: string;
  pincode: string;
  isOpen: boolean;
  openingHours: string;
  distanceKm?: number;
  rating: number;
  reviewsCount: number;
  verified: boolean;
  pickupAvailable: boolean;
  homeDeliveryAvailable: boolean;
  image?: string;
}

export interface ExpertProfile {
  id: string;
  userId: string;
  specialization: string;
  qualification: string;
  institution: string;
  experienceYears: number;
  consultationsCompleted: number;
  rating: number;
  availableForConsultation: boolean;
}

