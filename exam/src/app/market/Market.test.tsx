import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MarketComponent from "./Market";

describe("MarketComponent Unit Tests", () => {
  test("renders all items in the main list initially", () => {
    render(<MarketComponent />);
    const initialItems = [
      "Apple",
      "Broccoli",
      "Mushroom",
      "Banana",
      "Tomato",
      "Orange",
      "Mango",
      "Pineapple",
      "Cucumber",
      "Watermelon",
      "Carrot",
    ];

    initialItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test("moves an item to the correct column when clicked", async () => {
    render(<MarketComponent />);

    const itemToMove = screen.getByText("Apple");
    fireEvent.click(itemToMove);

    // Verify it's moved to the Fruits column
    expect(screen.getByText("Fruits")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Apple")).toBeInTheDocument();
    });

    // Ensure it's removed from the main list
    expect(screen.queryAllByText("Apple").length).toBe(1); // Only in the Fruits column
  });

  test("moves an item back to the main list when clicked in the column", async () => {
    render(<MarketComponent />);

    const itemToMove = screen.getByText("Apple");
    fireEvent.click(itemToMove);

    // Wait for it to be in the Fruits column
    await waitFor(() => {
      expect(screen.getByText("Apple")).toBeInTheDocument();
    });

    // Click it in the Fruits column
    fireEvent.click(screen.getByText("Apple"));

    // Verify it's back in the main list
    expect(screen.getByText("Apple", { selector: "button" })).toBeInTheDocument();
  });

  test("moves a vegetable item to the Vegetables column", async () => {
    render(<MarketComponent />);

    const itemToMove = screen.getByText("Broccoli");
    fireEvent.click(itemToMove);

    // Verify it's in the Vegetables column
    expect(screen.getByText("Vegetables")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Broccoli")).toBeInTheDocument();
    });

    // Ensure it's removed from the main list
    expect(screen.queryAllByText("Broccoli").length).toBe(1); // Only in the Vegetables column
  });

  test("automatically moves an item back to the main list after 5 seconds", async () => {
    jest.useFakeTimers();
    render(<MarketComponent />);

    const itemToMove = screen.getByText("Banana");
    fireEvent.click(itemToMove);

    // Verify it's in the Fruits column
    expect(screen.getByText("Banana")).toBeInTheDocument();

    // Fast-forward 5 seconds
    jest.advanceTimersByTime(5000);

    // Verify it's back in the main list
    await waitFor(() => {
      expect(screen.getByText("Banana", { selector: "button" })).toBeInTheDocument();
    });

    jest.useRealTimers();
  });
});
