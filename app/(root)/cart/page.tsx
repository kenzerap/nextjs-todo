import { Suspense } from 'react';
import { Spinner } from 'flowbite-react';
import CartShoppingList from '@/components/CartShoppingList/CartShoppingList';

export default async function Cart() {
  return (
    <Suspense
      fallback={
        <div className="text-center">
          <Spinner />
        </div>
      }
    >
      <CartShoppingList></CartShoppingList>
    </Suspense>
  );
}
