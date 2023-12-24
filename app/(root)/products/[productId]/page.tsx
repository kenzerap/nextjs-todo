import ProductCreateEditForm from '@/components/ProductCreateEditForm/ProductCreateEditForm';
import { Product } from '@/models/product.model';
import { apiUrl } from '@/utils/constants';

export async function generateStaticParams() {
  const products: Product[] = await fetch(`${apiUrl}/product/list`).then(
    (res) => res.json()
  );
  return products.map((product) => ({
    productId: product.id,
  }));
}

async function fetchProductById(productId: string) {
  const response = await fetch(`${apiUrl}/product/${productId}`, {
    next: { revalidate: 0 },
  });

  const data: Product = await response.json();
  return data;
}

export default async function ProductCreatePage({
  params,
}: {
  params: { productId: string };
}) {
  const item: Product = await fetchProductById(params.productId);

  return (
    <ProductCreateEditForm data={item} isCreate={false}></ProductCreateEditForm>
  );
}
