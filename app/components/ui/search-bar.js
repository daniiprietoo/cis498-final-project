"use client";

import { FiSearch as Search } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const param = searchParams.get("search") ?? "";

  const [searchTerm, setSearchTerm] = useState(param);

  useEffect(() => {
    setSearchTerm(param);
  }, [param]);

  const handleSearch = () => {
    if (searchTerm) {
      router.push(`/products?search=${searchTerm}`);
    }
  };

  return (
    <div className="container mx-auto px-4 -mt-6">
      <div className="bg-white rounded-lg shadow-lg p-4 flex">
        <div className="flex-grow flex items-center border rounded-l-lg px-4 bg-[#F8F8F8]">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            onFocus={() => setSearchTerm("")}
            placeholder="Search for developer tools..."
            className="w-full p-2 bg-transparent focus:outline-none text-gray-700"
          />
        </div>
        <button className="bg-[#FF4500] text-white px-6 py-2 rounded-r-lg hover:bg-[#e03f00] transition">
          Search
        </button>
      </div>
    </div>
  );
}
