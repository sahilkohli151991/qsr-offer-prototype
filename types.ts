export enum OfferType {
  MASS = 'Mass',
  PERSONALIZED = 'Personalized',
}

export enum OfferTemplate {
  BOGO = 'Buy One Get One Free',
  SINGLE_ITEM_DISCOUNT = 'Single Item Discount',
  MULTI_ITEM_DISCOUNT = 'Multi-Item Discount',
  PERCENTAGE_OFF_TOTAL = '% Off Total Order',
  FIXED_AMOUNT_OFF_TOTAL = '$ Off Total Order',
  CUSTOM = 'Custom Template',
}

export enum OfferTimingKey {
  WEEKDAY = 'Weekday',
  WEEKEND = 'Weekend',
  MONDAY = 'Monday',
  TUESDAY = 'Tuesday',
  WEDNESDAY = 'Wednesday',
  THURSDAY = 'Thursday',
  FRIDAY = 'Friday',
  SATURDAY = 'Saturday',
  SUNDAY = 'Sunday',
  ANYTIME = 'Anytime',
}

export interface OfferDuration {
  fromDate: string; // YYYY-MM-DD
  toDate: string;   // YYYY-MM-DD
}

export interface Offer {
  id: string;
  name: string;
  description: string;
  type: OfferType;
  duration: OfferDuration;
  cycles?: string; 
  segments?: string[];
  products: string[]; 
  template: OfferTemplate;
  discountDepth: string; 
  timing: OfferTimingKey[];
  isActive: boolean;
}

export interface OfferConfig {
  type: OfferType;
  duration: OfferDuration;
  cycles?: string;
  segments: string[];
  products: string[];
  template: OfferTemplate;
  discountDepth: string;
  timing: OfferTimingKey[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
}