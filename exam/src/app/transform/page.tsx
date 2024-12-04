"use client";
import React from "react";
import Link from "next/link";

type users = {
  firstName: string;
  lastName: string;
}

function TransformPage() {

  const userData: users[] = [
    {
      firstName: "firstName1",
      lastName: "lastName1",
    },
    {
      firstName: "firstName2",
      lastName: "lastName2",
    }
  ];


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
      <span>transform</span>
      <span>{userData.length}</span>
    </div>
  );
}

export default TransformPage;
