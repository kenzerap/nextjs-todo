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

async function fetchRelatedProducts(categoryCode: string) {
  const params = new URLSearchParams({
    categoryCode: categoryCode,
    searchBy: 'name',
    search: '',
    page: '1',
    itemPerPage: '10',
    orderBy: 'name',
    orderByDirection: 'asc',
  }).toString();
  const response = await fetch(`${apiUrl}/product/list?${params}`, {
    next: { revalidate: 0 },
  });

  const { data } = await response.json();
  const dummyRateData = data.map((item: any) => {
    return item.rate
      ? item
      : {
          ...item,
          rate: {
            averageValue: Math.floor(Math.random() * 5) + 1,
            rateCount: Math.floor(Math.random() * 9999) + 1,
          },
        };
  });

  return dummyRateData;
}

export default async function ProductViewPage({
  params,
}: {
  params: { productId: string };
}) {
  const item: Product = await fetchProductById(params.productId);
  const relatedProducts: Product[] = await fetchRelatedProducts(
    item.category?.code || ''
  );

  return (
    <ProductViewDetail
      data={item}
      relatedProducts={relatedProducts}
    ></ProductViewDetail>
  );
}
