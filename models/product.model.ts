export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

export interface BestProduct {
  imageShowUrl: string;
  imageHoverUrl: string;
  rate: { averageValue: number; rateCount: number };
  price: number;
  name: string;
  description: string;
}
