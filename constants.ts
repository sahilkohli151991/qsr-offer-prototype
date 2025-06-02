import { OfferTemplate, OfferTimingKey, Product } from './types';

export const AVAILABLE_SEGMENTS: string[] = [
  'Occasional Customers',
  'Big Spenders',
  'Premium Members',
  'New Users',
  'Lapsed Users',
  'Students',
  'Seniors',
  'Families',
];

export const AVAILABLE_TEMPLATES: OfferTemplate[] = [
  OfferTemplate.BOGO,
  OfferTemplate.SINGLE_ITEM_DISCOUNT,
  OfferTemplate.MULTI_ITEM_DISCOUNT,
  OfferTemplate.PERCENTAGE_OFF_TOTAL,
  OfferTemplate.FIXED_AMOUNT_OFF_TOTAL,
  OfferTemplate.CUSTOM,
];

export const AVAILABLE_TIMINGS: OfferTimingKey[] = [
  OfferTimingKey.ANYTIME,
  OfferTimingKey.WEEKDAY,
  OfferTimingKey.WEEKEND,
  OfferTimingKey.MONDAY,
  OfferTimingKey.TUESDAY,
  OfferTimingKey.WEDNESDAY,
  OfferTimingKey.THURSDAY,
  OfferTimingKey.FRIDAY,
  OfferTimingKey.SATURDAY,
  OfferTimingKey.SUNDAY,
];

export const AVAILABLE_PRODUCTS: Product[] = [
  { id: 'prod_001', name: 'Classic Burger', category: 'Burgers' },
  { id: 'prod_002', name: 'Cheeseburger Deluxe', category: 'Burgers' },
  { id: 'prod_003', name: 'Veggie Burger Supreme', category: 'Burgers' },
  { id: 'prod_004', name: 'Spicy Chicken Sandwich', category: 'Chicken' },
  { id: 'prod_005', name: 'Grilled Chicken Wrap', category: 'Chicken' },
  { id: 'prod_006', name: 'Fries (Small)', category: 'Sides' },
  { id: 'prod_007', name: 'Fries (Large)', category: 'Sides' },
  { id: 'prod_008', name: 'Onion Rings', category: 'Sides' },
  { id: 'prod_009', name: 'Garden Salad', category: 'Salads' },
  { id: 'prod_010', name: 'Caesar Salad', category: 'Salads' },
  { id: 'prod_011', name: 'Soda (Regular)', category: 'Drinks' },
  { id: 'prod_012', name: 'Soda (Large)', category: 'Drinks' },
  { id: 'prod_013', name: 'Iced Tea', category: 'Drinks' },
  { id: 'prod_014', name: 'Bottled Water', category: 'Drinks' },
  { id: 'prod_015', name: 'Milkshake (Vanilla)', category: 'Desserts' },
  { id: 'prod_016', name: 'Milkshake (Chocolate)', category: 'Desserts' },
  { id: 'prod_017', name: 'Apple Pie Slice', category: 'Desserts' },
  { id: 'prod_018', name: 'Soft Serve Cone', category: 'Desserts' },
  { id: 'prod_019', name: 'Kids Meal - Burger', category: 'Kids Meals' },
  { id: 'prod_020', name: 'Kids Meal - Nuggets', category: 'Kids Meals' },
];
