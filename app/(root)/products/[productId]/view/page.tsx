import ProductCreateEditForm from '@/components/ProductCreateEditForm/ProductCreateEditForm';
import ProductViewDetail from '@/components/ProductViewDetail/ProductViewDetail';
import { Product } from '@/models/product.model';
import { apiUrl } from '@/utils/constants';

export async function generateStaticParams() {
  const productPaging: {
    data: Product[];
    totalItem: number;
    hasNextPage: number;
  } = await fetch(`${apiUrl}/product/list?page=1&itemPerPage=9999`).then(
    (res) => res.json()
  );

  return productPaging.data.map((product) => ({
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

export default async function ProductViewPage({
  params,
}: {
  params: { productId: string };
}) {
  const item: Product = await fetchProductById(params.productId);

  return <ProductViewDetail data={item}></ProductViewDetail>;
}
