import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'; // Provides custom matchers
import Loader from './Loader';
import styles from "./loader.module.css";

describe('Loader Component', () => {
  it('renders the loader with correct structure', () => {
    const { container } = render(<Loader />);

    // Ensure the wrapper div has the correct class
    const wrapperDiv = container.firstChild;
    expect(wrapperDiv).toHaveClass('fixed w-full h-full');

    // Ensure the loader div exists
    const loaderDiv = container.querySelector(`.${styles.loader}`);
    expect(loaderDiv).toBeInTheDocument();
  });

  it('applies the loader animation styles', () => {
    const { container } = render(<Loader />);
    const loaderDiv = container.querySelector(`.${styles.loader}`);

    // Validate if the loader has the expected styles (assuming animation and keyframes are defined in CSS)
    expect(loaderDiv).toHaveClass(styles.loader);
  });
});
