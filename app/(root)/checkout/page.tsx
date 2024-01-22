import { Fragment, Suspense } from 'react';
import { Card, Spinner } from 'flowbite-react';
import CartShoppingList from '@/components/CartShoppingList/CartShoppingList';
import ShippingAddress from '@/components/ShippingAddress/ShippingAddress';

export default async function Cart() {
  return (
    <Fragment>
      <div className="flex justify-between mb-8">
        <div className="text-2xl font-bold">Checkout</div>
      </div>

      <ShippingAddress></ShippingAddress>
    </Fragment>
  );
}
