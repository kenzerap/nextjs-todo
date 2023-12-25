'use client';

import { Button, Card, Spinner, Table } from 'flowbite-react';
import classes from './ProductList.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';
import { Product } from '@/models/product.model';

export default function ProductList({ products }: { products: Product[] }) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const productsLoading = false;

  const deleteProductHandler = async (productId: any) => {
    const url = `/api/product/${productId}`;
    const method = 'DELETE';

    setDeleting(true);
    const res = await fetch(url, {
      method: method,
    });

    setDeleting(false);

    if (res.ok) {
      router.replace('/products');
    }
  };

  return (
    <Fragment>
      <div className="flex justify-between mb-8">
        <div className="text-2xl font-bold">Product list</div>
        <Link href={'/products/create'}>
          <Button>Create</Button>
        </Link>
      </div>

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
              {(products || []).map((product) => {
                return (
                  <Table.Row
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={product.id}
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </Table.Cell>
                    <Table.Cell className="text-red-600 font-bold text-xl">
                      {product.price}$
                    </Table.Cell>
                    <Table.Cell>
                      <div className="w-60 h-60 relative">
                        <Image
                          src={product.imageUrl}
                          alt={product.imageUrl}
                          quality={100}
                          fill
                        />
                      </div>
                    </Table.Cell>
                    <Table.Cell>{product.description}</Table.Cell>
                    <Table.Cell>
                      <Link
                        href={`/products/${product.id}`}
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
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        )}
      </Card>

      {/* <DeleteProductModal
        isShowDeleteModal={isShowDeleteModal}
        onCloseConfirmModal={closeConfirmModalHandeler}
      ></DeleteProductModal> */}
    </Fragment>
  );
}
