import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TransformPage from "./page";
import { fetchData, transformData } from "../handler/handler";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));


// Mock the functions from handler module
jest.mock("../handler/handler", () => ({
  fetchData: jest.fn(),
  transformData: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("TransformPage", () => {
  let mockPush: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      pathname: "/transform",
      push: mockPush,
    });
  });

  test("initially shows the loader", () => {
    render(<TransformPage />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("initial state: loading and no data", () => {
    render(<TransformPage />);

    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();

    const usersList = screen.queryByRole("list");
    expect(usersList).not.toBeInTheDocument();
  });

  test("fetches and displays data after loading", async () => {
    const mockUsers = [
      {
        id: 1,
        firstName: "Emily",
        lastName: "Johnson",
        maidenName: "Smith",
        age: 28,
        gender: "female",
        email: "emily.johnson@x.dummyjson.com",
        phone: "+81 965-431-3024",
        username: "emilys",
        password: "emilyspass",
        birthDate: "1996-5-30",
        image: "https://dummyjson.com/icon/emilys/128",
        bloodGroup: "O-",
        height: 193.24,
        weight: 63.16,
        eyeColor: "Green",
        hair: {
          color: "Brown",
          type: "Curly",
        },
        ip: "42.48.100.32",
        address: {
          address: "626 Main Street",
          city: "Phoenix",
          state: "Mississippi",
          stateCode: "MS",
          postalCode: "29112",
          coordinates: {
            lat: -77.16213,
            lng: -92.084824,
          },
          country: "United States",
        },
        macAddress: "47:fa:41:18:ec:eb",
        university: "University of Wisconsin--Madison",
        bank: {
          cardExpire: "03/26",
          cardNumber: "9289760655481815",
          cardType: "Elo",
          currency: "CNY",
          iban: "YPUXISOBI7TTHPK2BR3HAIXL",
        },
        company: {
          department: "Engineering",
          name: "Dooley, Kozey and Cronin",
          title: "Sales Manager",
          address: {
            address: "263 Tenth Street",
            city: "San Francisco",
            state: "Wisconsin",
            stateCode: "WI",
            postalCode: "37657",
            coordinates: {
              lat: 71.814525,
              lng: -161.150263,
            },
            country: "United States",
          },
        },
        ein: "977-175",
        ssn: "900-590-289",
        userAgent:
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
        crypto: {
          coin: "Bitcoin",
          wallet: "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
          network: "Ethereum (ERC20)",
        },
        role: "admin",
      },
      {
        id: 2,
        firstName: "Michael",
        lastName: "Williams",
        maidenName: "",
        age: 35,
        gender: "male",
        email: "michael.williams@x.dummyjson.com",
        phone: "+49 258-627-6644",
        username: "michaelw",
        password: "michaelwpass",
        birthDate: "1989-8-10",
        image: "https://dummyjson.com/icon/michaelw/128",
        bloodGroup: "B+",
        height: 186.22,
        weight: 76.32,
        eyeColor: "Red",
        hair: {
          color: "Green",
          type: "Straight",
        },
        ip: "12.13.116.142",
        address: {
          address: "385 Fifth Street",
          city: "Houston",
          state: "Alabama",
          stateCode: "AL",
          postalCode: "38807",
          coordinates: {
            lat: 22.815468,
            lng: 115.608581,
          },
          country: "United States",
        },
        macAddress: "79:15:78:99:60:aa",
        university: "Ohio State University",
        bank: {
          cardExpire: "02/27",
          cardNumber: "6737807858721625",
          cardType: "Elo",
          currency: "SEK",
          iban: "83IDT77FWYLCJVR8ISDACFH0",
        },
        company: {
          department: "Support",
          name: "Spinka - Dickinson",
          title: "Support Specialist",
          address: {
            address: "395 Main Street",
            city: "Los Angeles",
            state: "New Hampshire",
            stateCode: "NH",
            postalCode: "73442",
            coordinates: {
              lat: 79.098326,
              lng: -119.624845,
            },
            country: "United States",
          },
        },
        ein: "912-602",
        ssn: "108-953-962",
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/97.0.1072.76 Safari/537.36",
        crypto: {
          coin: "Bitcoin",
          wallet: "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
          network: "Ethereum (ERC20)",
        },
        role: "admin",
      },
    ];
    const mockGroupData = [
      {
        department: "Engineering",
        male: 0,
        female: 1,
        ageRange: "26-35",
        hair: [{ color: "Brown", count: 1 }],
        addressUser: [{ fullName: "EmilyJohnson", postalCode: "29112" }],
      },
      {
        department: "Support",
        male: 1,
        female: 0,
        ageRange: "26-35",
        hair: [{ color: "Green", count: 1 }],
        addressUser: [{ fullName: "MichaelWilliams", postalCode: "38807" }],
      },
    ];

    (fetchData as jest.Mock).mockResolvedValue(mockUsers);
    (transformData as jest.Mock).mockReturnValue(mockGroupData);

    render(<TransformPage />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
    });

    expect(screen.getByText("Department: Engineering")).toBeInTheDocument();
    expect(screen.getByText("Male: 1")).toBeInTheDocument();
    expect(screen.getByText("Female: 1")).toBeInTheDocument();
  });

  test("renders the back button",async () => {

    render(<TransformPage />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
    });

    const backLink = screen.getByText("back");
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute("href", "/");

    const backButton = screen.getByRole("link", { name: /back/i });
    fireEvent.click(backButton);
    mockPush("/");
    expect(mockPush).toHaveBeenCalledWith("/");
  })
});
