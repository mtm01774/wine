export interface WineType {
  id: number;
  name: string;
  type: string;
  region: string;
  price: number;
  rating: number;
  image: string;
  year: number;
  description?: string;
  grapeVariety?: string;
  body?: string;
  servingTemp?: string;
} 