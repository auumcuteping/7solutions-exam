"use client";
import Link from "next/link";
import React, { useState, useRef } from "react";

type Item = {
  type: "Fruit" | "Vegetable";
  name: string;
};

function MarketPage() {
  const initialItems: Item[] = [
    { type: "Fruit", name: "Apple" },
    { type: "Vegetable", name: "Broccoli" },
    { type: "Vegetable", name: "Mushroom" },
    { type: "Fruit", name: "Banana" },
    { type: "Vegetable", name: "Tomato" },
    { type: "Fruit", name: "Orange" },
    { type: "Fruit", name: "Mango" },
    { type: "Fruit", name: "Pineapple" },
    { type: "Vegetable", name: "Cucumber" },
    { type: "Fruit", name: "Watermelon" },
    { type: "Vegetable", name: "Carrot" },
  ];

  const [mainList, setMainList] = useState<Item[]>(initialItems);
  const [fruitColumn, setFruitColumn] = useState<Item[]>([]);
  const [vegetableColumn, setVegetableColumn] = useState<Item[]>([]);
  const timeouts = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const moveToColumn = (item: Item) => {
    setMainList((prev) => prev.filter((i) => i.name !== item.name));
    if (item.type === "Fruit") {
      setFruitColumn((prev) => [...prev, item]);
    } else {
      setVegetableColumn((prev) => [...prev, item]);
    }

    const timeoutId = setTimeout(() => {
      moveBackToMainList(item);
    }, 5000);

    timeouts.current[item.name] = timeoutId;
  };

  const handleColumnClick = (item: Item) => {
    moveBackToMainList(item);
  };

  const moveBackToMainList = (item: Item) => {
    if (timeouts.current[item.name]) {
      clearTimeout(timeouts.current[item.name]);
      delete timeouts.current[item.name];
    }

    setMainList((prev) => [...prev, item]);
    if (item.type === "Fruit") {
      setFruitColumn((prev) => prev.filter((i) => i.name !== item.name));
    } else {
      setVegetableColumn((prev) => prev.filter((i) => i.name !== item.name));
    }
  };

  return (
    <div>
      <div>
        <Link href="/" className="flex flex-row p-2.5">
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
      <div className="flex gap-5 p-5">
        {/* Main List */}
        <div className="flex-1">
          <div className="flex flex-col gap-2.5">
            {mainList.map((item) => (
              <button
                key={item.name}
                onClick={() => moveToColumn(item)}
                className="p-2.5 border border-[#f0f0f0] cursor-pointer rounded-xl"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Fruits Column */}
        <div className="flex-1 h-screen min-w-12 border border-[#f0f0f0]">
          <span className="flex justify-center p-2.5 border border-b-2 bg-[#f0f0f0]">
            Fruits
          </span>
          <div className="flex flex-col gap-2.5 mt-2.5">
            {fruitColumn.map((item) => (
              <button
                key={item.name}
                onClick={() => handleColumnClick(item)}
                className="p-2.5 mx-2.5 border border-[#f0f0f0] bg-[#d45e5e] text-white cursor-pointer sm-380:text-[3vw] sm-500:text-[2.5vw] rounded-xl"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Vegetables Column */}
        <div className="flex-1 h-screen min-w-12 border border-[#f0f0f0]">
          <span className="flex justify-center p-2.5 border border-b-2 bg-[#f0f0f0]">
            Vegetables
          </span>
          <div className="flex flex-col gap-2.5 mt-2.5">
            {vegetableColumn.map((item) => (
              <button
                key={item.name}
                onClick={() => handleColumnClick(item)}
                className="p-2.5 mx-2.5 border border-[#f0f0f0] bg-[#5fc35f] text-white cursor-pointer sm-380:text-[3vw] sm-500:text-[2.5vw] rounded-xl"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketPage;
