import CartShopping from '@/components/CartShopping/CartShopping';
import ProductList from '@/components/ProductList/ProductList';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('when the dom init', () => {
  it('should render the ProductList', () => {
    render(
      <ProductList categories={[]} products={[]} />
    );
    const textItem = screen.getByText(/Product list/i);

    expect(textItem).toBeInTheDocument();
  });
});
