'use client';

import { Button, Card, Spinner, Table } from 'flowbite-react';
import classes from './ProductList.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment, useCallback, useState } from 'react';
import { Product } from '@/models/product.model';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartShoppingSlice';
import DeleteProductModal from '../DeleteProductModal/DeleteProductModal';
import ProductListFilter from '../ProductListFilter/ProductListFilter';
import { Category } from '@/models/category.model';
import ProductCard from '../ProductCard/ProductCard';

export default function ProductList({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const [deleting, setDeleting] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [productIdDeleted, setProductIdDeleted] = useState('');
  const [productList, setProductList] = useState(products);
  const [productsLoading, setProductsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: session } = useSession();
  const isAdmin = session?.user.isAdmin;

  const deleteProductHandler = async (productId: any) => {
    setIsShowDeleteModal(true);
    setProductIdDeleted(productId);
  };

  const closeConfirmModalHandeler = async (isConfirm: boolean) => {
    if (isConfirm) {
      const url = `/api/product/${productIdDeleted}`;
      const method = 'DELETE';

      setDeleting(true);
      const res = await fetch(url, {
        method: method,
      });

      setDeleting(false);

      if (res.ok) {
        toast.success('Delete successfully');
        router.replace('/products');
      } else {
        const resBody = await res.json();
        toast.error(resBody?.message || resBody);
      }
    }

    setIsShowDeleteModal(false);
  };

  const addToCard = (product: Product) => {
    dispatch(addToCart({ item: product }));
  };

  const adminAdtions = (product: Product) => (
    <>
      <Link
        href={`/products/${product.id}/edit`}
        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
      >
        Edit
      </Link>
      <Link
        href={''}
        onClick={() => deleteProductHandler(product.id)}
        className={`font-medium text-cyan-600 hover:underline dark:text-cyan-500 ml-4 ${
          deleting ? classes.disabled : ''
        }`}
      >
        Delete
      </Link>
    </>
  );

  const userAdtions = (product: Product) => (
    <Button onClick={() => addToCard(product)} className="w-max">
      Add to cart
    </Button>
  );

  const filterProductHandler = useCallback(async (query: any) => {
    const params = new URLSearchParams(query).toString();
    const url = `/api/product?${params}`;
    const method = 'GET';

    setProductsLoading(true);
    const res = await fetch(url, {
      method: method,
    });

    setProductsLoading(false);

    const resBody = await res.json();

    if (res.ok) {
      setProductList(resBody.data);
    } else {
      toast.error(resBody.message);
    }
  }, []);

  return (
    <Fragment>
      <div className="flex justify-between mb-8">
        <div className="text-2xl font-bold">Product list</div>
        {isAdmin && (
          <Link href={'/products/create'}>
            <Button>Create</Button>
          </Link>
        )}
      </div>

      <div className="mb-8">
        <ProductListFilter
          onFilter={filterProductHandler}
          categories={categories}
        ></ProductListFilter>
      </div>

      {isAdmin && (
        <Card className="overflow-x-auto">
          {productsLoading ? (
            <div className="text-center">
              <Spinner aria-label="loading" />
            </div>
          ) : (
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Price</Table.HeadCell>
                <Table.HeadCell>Image</Table.HeadCell>
                <Table.HeadCell>Description</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {(productList || []).map((product) => {
                  return (
                    <Table.Row
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      key={product.id}
                    >
                      <Table.Cell className="font-medium text-gray-900 dark:text-white text-2xl">
                        {product.name}
                      </Table.Cell>
                      <Table.Cell className="text-green-500 font-bold text-xl">
                        {product.price}$
                      </Table.Cell>
                      <Table.Cell>
                        <div className="w-60 h-60 relative">
                          <Image
                            src={product.imageUrls?.[0] || ''}
                            alt={product.imageUrls?.[0] || ''}
                            quality={100}
                            fill
                          />
                        </div>
                      </Table.Cell>
                      <Table.Cell>{product.description}</Table.Cell>
                      <Table.Cell>
                        {isAdmin ? adminAdtions(product) : userAdtions(product)}
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          )}
        </Card>
      )}

      {!isAdmin &&
        (productsLoading ? (
          <Card>
            <div className="text-center">
              <Spinner aria-label="loading" />
            </div>
          </Card>
        ) : (
          <div className={classes.productsCardData}>
            {productList.map((product, index) => {
              return <ProductCard product={product} key={index}></ProductCard>;
            })}
          </div>
        ))}

      <DeleteProductModal
        isShowDeleteModal={isShowDeleteModal}
        isLoading={deleting}
        onCloseConfirmModal={closeConfirmModalHandeler}
      ></DeleteProductModal>
    </Fragment>
  );
}
