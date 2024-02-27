import { renderWithProviders } from '@/__mocks__/storeMock';
import CartShopping from '@/components/CartShopping/CartShopping';
import HeaderBar from '@/components/HeaderBar/HeaderBar';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

jest.mock('next/navigation', () => {
  const originalModule = jest.requireActual('next/navigation');

  return {
    ...originalModule,
    useRouter: jest.fn(),
    usePathname: jest.fn().mockReturnValue('/'),
  };
});

jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react');
  const mockSession = {
    user: { username: 'admin', isAdmin: true },
  };
  return {
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: 'authenticated' };
    }),
  };
});

describe('when the dom init', () => {
  it('should render the HeaderBar', () => {
    renderWithProviders(<HeaderBar />);
    const textItem = screen.getByRole('navigation');

    expect(textItem).toBeInTheDocument();
  });

  it('should render link Users when admin account login', () => {
    renderWithProviders(<HeaderBar />);
    const textItem = screen.getByText(/Users/);

    expect(textItem).toBeInTheDocument();
  });
});
