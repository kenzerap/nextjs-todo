import { Product } from '@/models/product.model';
import classes from './Products.module.css';
import { apiUrl } from '@/utils/constants';
import ProductList from '@/components/ProductList/ProductList';
import { Suspense } from 'react';
import { Spinner } from 'flowbite-react';
import { Category } from '@/models/category.model';

async function fetchProducts() {
  const response = await fetch(`${apiUrl}/product/list`, {
    next: { revalidate: 0 },
  });

  const data: { data: Product[]; totalItem: number; hasNextPage: number } =
    await response.json();
  return data.data;
}

async function fetchCategories() {
  const response = await fetch(`${apiUrl}/category/list`, {
    next: { revalidate: 120 },
  });

  const data: Category[] = await response.json();
  return data;
}

export default async function Products() {
  const products: Product[] = await fetchProducts();
  const categories: Category[] = await fetchCategories();

  return (
    <Suspense
      fallback={
        <div className="text-center">
          <Spinner />
        </div>
      }
    >
      <ProductList products={products} categories={categories}></ProductList>
    </Suspense>
  );
}
