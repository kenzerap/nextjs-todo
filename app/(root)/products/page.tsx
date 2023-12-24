import { Product } from '@/models/product.model';
import classes from './Products.module.css';
import { apiUrl } from '@/utils/constants';
import ProductList from '@/components/ProductList/ProductList';

async function fetchProducts() {
  const response = await fetch(`${apiUrl}/product/list`, {
    next: { revalidate: 0 },
  });

  const data: Product[] = await response.json();
  return data;
}

export default async function Products() {
  const products: Product[] = await fetchProducts();

  return <ProductList products={products}></ProductList>;
}
