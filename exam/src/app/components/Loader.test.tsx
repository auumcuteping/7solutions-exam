import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Loader from "./Loader";
import styles from "./loader.module.css";

describe("Loader Component", () => {
  it("renders the loader with correct structure", () => {
    const { container } = render(<Loader />);

    const wrapperDiv = container.firstChild;
    expect(wrapperDiv).toHaveClass("fixed w-full h-full");

    const loaderDiv = container.querySelector(`.${styles.loader}`);
    expect(loaderDiv).toBeInTheDocument();
  });

  it("applies the loader animation styles", () => {
    const { container } = render(<Loader />);
    const loaderDiv = container.querySelector(`.${styles.loader}`);

    expect(loaderDiv).toHaveClass(styles.loader);
  });
});
