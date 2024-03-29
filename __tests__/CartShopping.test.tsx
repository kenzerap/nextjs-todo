import CartShopping from '@/components/CartShopping/CartShopping';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('when the dom init', () => {
  it('should render the CartShopping', () => {
    const selectedItem = 1;
    render(
      <CartShopping selectedItem={selectedItem} onShowCartDetail={jest.fn()} />
    );
    const textItem = screen.getByText(selectedItem);

    expect(textItem).toBeInTheDocument();
  });
});
