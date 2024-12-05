import axios from "axios";
import { HeadersUsers, User } from "../models/user-models";

interface GroupUsers {
  department: string;
  male: number;
  female: number;
  ageRange: string;
  hair: Hair[];
  addressUser: Address[];
}

interface Address {
  fullName: string;
  postalCode: string;
}

interface Hair {
  color: string;
  count: number;
}

export const fetchData = async (limit: number): Promise<User[]> => {
  try {
    const res = await axios.get<HeadersUsers>("https://dummyjson.com/users", {
      params: {
        limit: limit,
      }
    });
    return res.data.users;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const transformData = (users: User[]) => {
  const groupMap = new Map<string, GroupUsers>();

  users.forEach((user) => {
    const department = user.company.department;
    let group = groupMap.get(department);

    if (!group) {
      group = {
        department,
        male: 0,
        female: 0,
        ageRange: getAgeRange(user.age),
        hair: [],
        addressUser: [],
      };
      groupMap.set(department, group);
    }

    if (user.gender === "male") {
      group.male++;
    } else if (user.gender === "female") {
      group.female++;
    }

    updateHairColorCount(group.hair, user.hair.color);
    updateAddress(
      group.addressUser,
      user.address.postalCode,
      user.firstName,
      user.lastName
    );
  });

  return Array.from(groupMap.values());
};

export const getAgeRange = (age: number): string => {
  if (age >= 18 && age <= 25) return "18-25";
  if (age >= 26 && age <= 35) return "26-35";
  if (age >= 36 && age <= 45) return "36-45";
  if (age >= 46 && age <= 60) return "46-60";
  return "60+"; // default
};

export const updateHairColorCount = (hairArr: Hair[], color: string) => {
  const existingHairColor = hairArr.find((hair) => hair.color === color);
  if (existingHairColor) {
    existingHairColor.count++;
  } else {
    hairArr.push({ color, count: 1 });
  }
};

export const updateAddress = (
  addressArr: Address[],
  postalCode: string,
  firstName: string,
  lastName: string
) => {
  const fullName = `${firstName + lastName}`;
  const newAddress = {
    fullName: fullName,
    postalCode: postalCode,
  };
  addressArr.push(newAddress);
};
