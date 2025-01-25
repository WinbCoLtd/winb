/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Building2, CarFront, Fuel, Gem, LifeBuoy, Palette, Calendar, Users } from "lucide-react";
import { FaRegSnowflake } from "react-icons/fa";
import React, { useState } from "react";

// Icon mapping
const icons: any = {
  model: <CarFront size={24} />,
  maker: <Building2 size={24} />,
  vehicleType: <LifeBuoy size={24} />,
  fuel: <Fuel size={24} />,
  drive: <Gem size={24} />,
  condition: <FaRegSnowflake size={24} />,
  color: <Palette size={24} />,
  grade: <Gem size={24} />,
  manufactureYear: <Calendar size={24} />,
  maxPassengers: <Users size={24} />,
};

// Filter type
type FilterItem = {
  [key: string]: string[];
};

const Filterbar = ({ filters }: { filters: FilterItem }) => {
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});

  // Handle filter selection
  const handleFilterSelect = (name: string, value: string) => {
    setSelectedFilters((prev) => {
      const prevValues = prev[name] || [];
      if (prevValues.includes(value)) {
        return {
          ...prev,
          [name]: prevValues.filter((item) => item !== value),
        };
      } else {
        return {
          ...prev,
          [name]: [...prevValues, value],
        };
      }
    });
  };

  // Trigger filter query
  const fetchVehicles = () => {
    console.log("Selected Filters: ", selectedFilters);
  };

  return (
    <div className="max-w-[360px] min-w-[320px] w-full bg-white rounded-xl p-6 border border-gray-200 shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Filter Vehicles</h2>
      <button
        type="button"
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium mb-4 hover:bg-blue-700 transition"
        onClick={fetchVehicles}
      >
        Apply Filters
      </button>

      {Object.keys(filters).length > 0 ? (
        Object.keys(filters).map((filterKey) => (
          <div className="w-full mb-6" key={filterKey}>
            <div className="w-full flex items-center mb-2 text-gray-800">
              <span className="mr-2">{icons[filterKey] || null}</span>
              <h3 className="text-lg font-semibold capitalize">{filterKey}</h3>
            </div>
            <div className="w-full grid grid-cols-3 gap-2">
              {filters[filterKey].map((item) => (
                <label
                  className="flex items-center cursor-pointer bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-200 transition"
                  key={item}
                >
                  <input
                    type="checkbox"
                    id={`${filterKey}-${item}`}
                    name={item}
                    value={item}
                    className="mr-2 accent-blue-600"
                    onChange={() => handleFilterSelect(filterKey, item)}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center">
          <h1 className="text-gray-600">No filters available</h1>
        </div>
      )}
    </div>
  );
};

export default Filterbar;
