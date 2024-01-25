'use client';

import { Button, Card, Table, TextInput } from 'flowbite-react';
import classes from './CartShoppingList.module.css';
import Image from 'next/image';
import { ChangeEvent, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  modifyQuantity,
  removeCartProduct,
} from '@/store/slices/cartShoppingSlice';
import { CartShoppingItem } from '@/models/cart-shopping-item.model';
import * as fromReducer from '../../store/store';
import { FaRegTrashCan } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import DeleteProductModal from '../DeleteProductModal/DeleteProductModal';
import Link from 'next/link';

export default function CartShoppingList() {
  const dispatch = useDispatch();
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [productIdDeleted, setProductIdDeleted] = useState('');

  const cartItemCount: number = useSelector(fromReducer.selectCartItemCount);

  const cartProducts: CartShoppingItem[] = useSelector(
    fromReducer.selectCartitems
  );

  const deleteCartProductHandler = async (productId: string) => {
    setIsShowDeleteModal(true);
    setProductIdDeleted(productId);
  };

  const closeConfirmModalHandeler = async (isConfirm: boolean) => {
    if (isConfirm) {
      dispatch(removeCartProduct({ productId: productIdDeleted }));
    }

    setIsShowDeleteModal(false);
  };

  const addCartProductHandler = async (
    event: ChangeEvent<HTMLInputElement>,
    cartProductId: string
  ) => {
    const quantity = Number(event.target.value);
    if (quantity === 0) {
      deleteCartProductHandler(cartProductId);
    } else {
      dispatch(
        modifyQuantity({
          productId: cartProductId,
          quantity,
        })
      );
    }
  };

  const checkoutHandler = () => {
    localStorage.removeItem('cartShopping');
  };

  return (
    <Fragment>
      <div className="flex justify-between mb-8">
        <div className="text-2xl font-bold">Shopping Cart</div>
      </div>

      <Card className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Quantity</Table.HeadCell>
            <Table.HeadCell>Total</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {(cartProducts || []).map((cartProduct) => {
              return (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={cartProduct.id}
                >
                  <Table.Cell className="font-medium text-gray-900 dark:text-white text-2xl">
                    {cartProduct.name}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="w-60 h-60 relative">
                      <Image
                        src={cartProduct.imageUrls?.[0] || ''}
                        alt={cartProduct.imageUrls?.[0] || ''}
                        quality={100}
                        fill
                      />
                    </div>
                  </Table.Cell>
                  <Table.Cell className="text-green-500 font-bold text-xl">
                    {cartProduct.price}$
                  </Table.Cell>
                  <Table.Cell>
                    <TextInput
                      className="w-16"
                      id="quantity"
                      type="number"
                      min={0}
                      value={cartProduct.quantity}
                      onChange={(event) =>
                        addCartProductHandler(event, cartProduct.id)
                      }
                    />
                  </Table.Cell>

                  <Table.Cell className="text-green-500 font-bold text-xl">
                    {cartProduct.quantity * cartProduct.price}$
                  </Table.Cell>
                  <Table.Cell>
                    <FaRegTrashCan
                      className="h-5 w-5 cursor-pointer"
                      onClick={() => deleteCartProductHandler(cartProduct.id)}
                    ></FaRegTrashCan>
                  </Table.Cell>
                </Table.Row>
              );
            })}

            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell colSpan={4}></Table.Cell>
              <Table.Cell className="text-green-500 font-bold text-xl">
                {cartProducts.reduce((result, cur) => {
                  return result + cur.price * cur.quantity;
                }, 0)}
                $
              </Table.Cell>
              <Table.Cell>
                <Link href={'https://buy.stripe.com/test_bIY7swegObX4frW6oo'}>
                  <Button disabled={!cartItemCount} onClick={checkoutHandler}>
                    Checkout
                  </Button>
                </Link>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Card>

      <DeleteProductModal
        isShowDeleteModal={isShowDeleteModal}
        isLoading={false}
        onCloseConfirmModal={closeConfirmModalHandeler}
      ></DeleteProductModal>
    </Fragment>
  );
}
