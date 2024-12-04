import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import MarketPage from "./page";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("MarketPage", () => {
  it("renders the back button", () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });

    render(<MarketPage />);

    const backLink = screen.getByRole("link", { name: /back/i });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute("href", "/");
  });

  test("moves an item to the correct column when clicked", async () => {
    render(<MarketPage />);

    const itemToMove = screen.getByText("Apple");
    act(() => {
      fireEvent.click(itemToMove);
    });

    expect(screen.getByText("Fruits")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Apple")).toBeInTheDocument();
    });

    expect(screen.queryAllByText("Apple").length).toBe(1);
  });

  test("moves an item back to the main list when clicked in the column", async () => {
    render(<MarketPage />);

    const itemToMove = screen.getByText("Apple");
    fireEvent.click(itemToMove);

    await waitFor(() => {
      expect(screen.getByText("Apple")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Apple"));

    expect(
      screen.getByText("Apple", { selector: "button" })
    ).toBeInTheDocument();
  });

  test("moves a vegetable item to the Vegetables column", async () => {
    render(<MarketPage />);

    const itemToMove = screen.getByText("Broccoli");
    fireEvent.click(itemToMove);

    expect(screen.getByText("Vegetables")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Broccoli")).toBeInTheDocument();
    });

    expect(screen.queryAllByText("Broccoli").length).toBe(1);
  });

  test("automatically moves an item back to the main list after 5 seconds", async () => {
    jest.useFakeTimers();
    render(<MarketPage />);

    const itemToMove = screen.getByText("Banana");
    fireEvent.click(itemToMove);

    expect(screen.getByText("Banana")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    await waitFor(() => {
      expect(
        screen.getByText("Banana", { selector: "button" })
      ).toBeInTheDocument();
    });

    jest.useRealTimers();
  });
});
