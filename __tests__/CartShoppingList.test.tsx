import { renderWithProviders } from '@/__mocks__/storeMock';
import CartShoppingList from '@/components/CartShoppingList/CartShoppingList';
import { addToCart } from '@/store/slices/cartShoppingSlice';
import { setupStore } from '@/store/store';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('when the dom init', () => {
  it('should render the CartShoppingList', () => {
    renderWithProviders(<CartShoppingList />);
    const textTitle = screen.getByText(/Shopping Cart/);

    expect(textTitle).toBeInTheDocument();
  });

  it('should render the item cart in list', () => {
    const store = setupStore();
    store.dispatch(
      addToCart({
        item: {
          id: 'cartId',
          name: 'test name',
          price: 100,
          description: 'test',
          discountPercentage: 10,
          soldCount: 10,
          imageUrls: ['https://testImg.jpg'],
        },
        quantity: 1,
      })
    );

    renderWithProviders(<CartShoppingList />, { store });
    const textTitle = screen.getByText(/test name/);

    expect(textTitle).toBeInTheDocument();
  });
});
