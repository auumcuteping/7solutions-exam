import {
  fetchData,
  transformData,
  getAgeRange,
  updateHairColorCount,
  updateAddress,
} from "./handler";
import { Address, HeadersUsers, User } from "../models/user-models";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("fetchData", () => {
  it("should fetch and return the list of users", async () => {
    const mockUsers: User[] = [
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
            hair: { color: "Brown", type: "Curly" },
            ip: "42.48.100.32",
            address: {
              address: "626 Main Street",
              city: "Phoenix",
              state: "Mississippi",
              stateCode: "MS",
              postalCode: "29112",
              coordinates: { lat: -77.16213, lng: -92.084824 },
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
                coordinates: { lat: 71.814525, lng: -161.150263 },
                country: "United States",
              },
            },
            ein: "977-175",
            ssn: "900-590-289",
            userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
            crypto: {
              coin: "Bitcoin",
              wallet: "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
              network: "Ethereum (ERC20)",
            },
            role: "admin",
          },
    ];
    const mockResponse = {
        data: {
          users: mockUsers,
          total: 1,
          skip: 0,
          limit: 30,
        },
      };
      mockedAxios.get.mockResolvedValueOnce(mockResponse);

    const result = await fetchData();

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith("https://dummyjson.com/users");
    expect(result).toEqual(mockUsers);
  });

  it("should throw an error if the API call fails", async () => {
    const mockError = new Error("Network Error");
    mockedAxios.get.mockRejectedValueOnce(mockError);

    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {}); // Suppress console.error

    await expect(fetchData()).rejects.toThrow("Network Error");

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith("https://dummyjson.com/users");

    consoleSpy.mockRestore(); // Restore original console.error
  });
});

describe("transformData", () => {
  it("should group users by department and calculate statistics", () => {
    const mockUsers = {
      users: [
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
        {
          id: 3,
          firstName: "Sophia",
          lastName: "Brown",
          maidenName: "",
          age: 42,
          gender: "female",
          email: "sophia.brown@x.dummyjson.com",
          phone: "+81 210-652-2785",
          username: "sophiab",
          password: "sophiabpass",
          birthDate: "1982-11-6",
          image: "https://dummyjson.com/icon/sophiab/128",
          bloodGroup: "O-",
          height: 177.72,
          weight: 52.6,
          eyeColor: "Hazel",
          hair: {
            color: "White",
            type: "Wavy",
          },
          ip: "214.225.51.195",
          address: {
            address: "1642 Ninth Street",
            city: "Washington",
            state: "Alabama",
            stateCode: "AL",
            postalCode: "32822",
            coordinates: {
              lat: 45.289366,
              lng: 46.832664,
            },
            country: "United States",
          },
          macAddress: "12:a3:d3:6f:5c:5b",
          university: "Pepperdine University",
          bank: {
            cardExpire: "04/25",
            cardNumber: "7795895470082859",
            cardType: "Korean Express",
            currency: "SEK",
            iban: "90XYKT83LMM7AARZ8JN958JC",
          },
          company: {
            department: "Research and Development",
            name: "Schiller - Zieme",
            title: "Accountant",
            address: {
              address: "1896 Washington Street",
              city: "Dallas",
              state: "Nevada",
              stateCode: "NV",
              postalCode: "88511",
              coordinates: {
                lat: 20.086743,
                lng: -34.577107,
              },
              country: "United States",
            },
          },
          ein: "963-113",
          ssn: "638-461-822",
          userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
          crypto: {
            coin: "Bitcoin",
            wallet: "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
            network: "Ethereum (ERC20)",
          },
          role: "admin",
        },
      ] as User[],
      total: 3,
      skip: 0,
      limit: 0,
    } as HeadersUsers;

    const result = transformData(mockUsers.users);

    expect(result).toEqual([
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
      {
        department: "Research and Development",
        male: 0,
        female: 1,
        ageRange: "36-45",
        hair: [{ color: "White", count: 1 }],
        addressUser: [{ fullName: "SophiaBrown", postalCode: "32822" }],
      },
    ]);
  });
});

describe("getAgeRange", () => {
  it("should return the correct age range", () => {
    expect(getAgeRange(23)).toBe("18-25");
    expect(getAgeRange(30)).toBe("26-35");
    expect(getAgeRange(40)).toBe("36-45");
    expect(getAgeRange(55)).toBe("46-60");
    expect(getAgeRange(65)).toBe("60+");
  });
});

describe("updateHairColorCount", () => {
  it("should update or add hair color count correctly", () => {
    const hairArr = [{ color: "brown", count: 2 }];
    updateHairColorCount(hairArr, "brown");
    expect(hairArr).toEqual([{ color: "brown", count: 3 }]);

    updateHairColorCount(hairArr, "black");
    expect(hairArr).toEqual([
      { color: "brown", count: 3 },
      { color: "black", count: 1 },
    ]);
  });
});

describe("updateAddress", () => {
  it("should add a new address entry", () => {
    const addressArr: Address[] = [];
    updateAddress(addressArr, "12345", "John", "Doe");
    expect(addressArr).toEqual([{ fullName: "JohnDoe", postalCode: "12345" }]);

    updateAddress(addressArr, "67890", "Jane", "Smith");
    expect(addressArr).toEqual([
      { fullName: "JohnDoe", postalCode: "12345" },
      { fullName: "JaneSmith", postalCode: "67890" },
    ]);
  });
});
