import MyComponentMock from '@/__mocks__/MockComponent';
import { renderWithProviders } from '@/__mocks__/storeMock';
import Home from '@/app/page';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';

jest.mock('@/components/HeaderBar/HeaderBar', () => {
  return MyComponentMock;
});

jest.mock('@/components/FooterBar/FooterBar', () => {
  return MyComponentMock;
});

jest.mock('@/components/CategoryCard/CategoryCard', () => {
  return MyComponentMock;
});

jest.mock('@/components/ProductCard/ProductCard', () => {
  return MyComponentMock;
});

jest.mock('@/components/SliderArrow/SliderArrow', () => {
  return MyComponentMock;
});

describe('when the dom init', () => {
  it('should render the Home', () => {
    renderWithProviders(<Home />);
    const textItem = screen.getByText(/WINTER SALE/i);

    expect(textItem).toBeInTheDocument();
  });
});
