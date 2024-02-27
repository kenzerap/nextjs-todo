import CategoryCard from '@/components/CategoryCard/CategoryCard';
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

describe('when the dom init', () => {
  it('should render the CategoryCard', () => {
    const textBody = 'Category name';
    render(
      <CategoryCard coverImg="https://testImg.jpg" textBody="Category name" />
    );
    const textItem = screen.getByText(textBody);

    expect(textItem).toBeInTheDocument();
  });
});
