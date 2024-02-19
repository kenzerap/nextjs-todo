import { Category } from './category.model';

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrls?: string[];
  description: string;
  category?: Category;
  soldCount: number;
  discountPercentage: number;
}

export interface BestProduct {
  imageShowUrl: string;
  imageHoverUrl: string;
  rate: { averageValue: number; rateCount: number };
  price: number;
  name: string;
  description: string;
}

export interface ProductFilterOptions {
  searchBy?: string;
  search?: string;
  orderBy?: string;
  orderByDirection?: 'asc' | 'desc';
  page?: number;
  itemPerPage?: number;
  categoryCode?: string;
}
