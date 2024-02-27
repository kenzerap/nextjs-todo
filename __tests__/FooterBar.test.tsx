import FooterBar from '@/components/FooterBar/FooterBar';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('when the dom init', () => {
  it('should render the FooterBar', () => {
    render(<FooterBar />);
    const textItem = screen.getByText(/FOLLOW US/i);

    expect(textItem).toBeInTheDocument();
  });
});
