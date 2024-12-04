import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TransformPage from "./page";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("TransformPage", () => {
  it("renders the back button", () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });

    render(<TransformPage />);

    const backLink = screen.getByRole("link", { name: /back/i });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute("href", "/");
  });
});
