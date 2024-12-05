export interface User {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: HairUser;
    ip: string;
    address: AddressUser;
    macAddress: string;
    university: string;
    bank: Bank;
    company: Company;
    ein: string;
    ssn: string;
    userAgent: string;
    crypto: Crypto;
    role: string;
  }

  export interface HeadersUsers {
    users: User[];
    total: number;
    skip: number;
    limit: number;
  }
  
  interface Bank {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  }
  
  interface Company {
    department: string;
    name: string;
    title: string;
    address: AddressUser;
  }
  
  interface Crypto {
    coin: string;
    wallet: string;
    network: string;
  }
  
  export interface GroupUsers {
    department: string;
    male: number;
    female: number;
    ageRange: string;
    hair: Hair[];
    addressUser: Address[];
  }
  
  export interface AddressUser {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: Coordinates;
    country: string;
  }

  export interface Coordinates {
    lat: number;
    lng: number;
  }

  export interface Address {
    fullName: string;
    postalCode: string;
  }
  
  export interface HairUser {
    color: string;
    type: string;
  }
  export interface Hair {
    color: string;
    count: number;
  }