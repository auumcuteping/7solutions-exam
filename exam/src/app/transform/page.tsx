"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchData, transformData } from "../handler/handler";
import { GroupUsers, User } from "../models/user-models";

function TransformPage() {
  const [data, setData] = useState<User[]>([]);
  const [groupData, setGroupData] = useState<GroupUsers[]>([]);
  const [limit, setLimitData] = useState<number>(30);

  useEffect(() => {
    const fetchAndTransformData = async (limit: number) => {
      try {
        const data = await fetchData(limit);
        const groupData = transformData(data);
        setData(data);
        setGroupData(groupData);
        console.log("data: ", data);
        console.log("groupData: ", groupData);
      } catch (error) {
        console.error("Error fetching data:", error); // Handle any errors
        alert("Error fetching data");
      }
    };

    fetchAndTransformData(limit);
  }, [limit]);

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLimitData(Number(event.target.value)); // Update limitData state
  };

  return (
    <div>
      <div className="flex p-2.5">
        <Link href="/" className="flex flex-row">
          <svg
            className="w-6 h-6 text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h14M5 12l4-4m-4 4 4 4"
            />
          </svg>
          back
        </Link>
      </div>
      <div className="flex justify-end gap-2.5 mt-2.5 px-10">
        <label htmlFor="limit">select limit: </label>
        <select
          id="limit"
          value={limit}
          onChange={handleLimitChange}
          className="bg-[#f0f0f0] border border-[#000000]"
        >
          <option value={30}>30</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={200}>200</option>
          <option value={300}>300</option>
        </select>
      </div>
      <div className="flex justify-end gap-2.5 mt-2.5 px-10">
        <span>total customer: {data.length}</span>
        <span>total department: {groupData.length}</span>
      </div>
      <div className="flex flex-row justify-center flex-wrap gap-2.5 mt-2.5 p-2.5">
        {groupData.map((item) => (
          <div
            key={item.department}
            className="mx-2.5 p-5 border flex flex-col bg-[#f0f0f0] border-[#f0f0f0] w-[400px]"
          >
            <span className="mb-3 border border-t-[#f0f0f0] border-b-black border-x-[#f0f0f0]">Department: {item.department}</span>
            <span>Male: {item.male}</span>
            <span>Female: {item.female}</span>
            <span>Hair Color:</span>
            {Array.isArray(item.hair) && item.hair.length > 0 ? (
              <ul>
                  {item.hair.map((hair, index) => (
                    <li className="pl-10 list-none" key={index}>
                     • {hair.count} {hair.color}
                    </li>
                  ))}
              </ul>
            ) : (
              <span></span>
            )}
            <span>Age Range: {item.ageRange}</span>
            <span>Address User:</span>
            {Array.isArray(item.addressUser) && item.addressUser.length > 0 ? (
              <ul>
                  {item.addressUser.map((addr, index) => (
                    <li className="pl-10 list-none" key={index}>
                     • {addr.fullName} / {addr.postalCode}
                    </li>
                  ))}
              </ul>
            ) : (
              <span></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransformPage;
