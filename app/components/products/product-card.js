"use client";

import { FiStar as Star, FiShoppingCart } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/components/cart/cart-context";

export default function ProductCard({ tool }) {
  const router = useRouter();
  const { addItem } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem(tool, 1);
    console.log(`${tool.name} added to cart`);
  }

  return (
    <div
      onClick={() => router.push(`/products/${tool.id}`)}
      className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 cursor-pointer"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={tool.mainImage ?? "/api/placeholder/400/300"}
          alt={tool.name}
          fill
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute top-2 left-2 bg-[#FF4500] text-white text-xs font-semibold px-2 py-1 rounded">
          {tool.category}
        </span>
      </div>

      <div className="p-4 flex flex-col h-[180px]">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{tool.name}</h3>
        <p className="text-gray-500 text-sm line-clamp-2 flex-1">{tool.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span>{tool.avgRating}</span>
            <span className="mx-2">•</span>
            <span>{tool.reviewsCount}</span>
          </div>
          <span className="text-lg font-bold text-gray-900 transform transition-transform duration-200 group-hover:-translate-x-10">${tool.price}</span>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className="absolute bottom-3 right-3 bg-[#FF4500] text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 transform duration-200"
      >
        <FiShoppingCart className="h-5 w-5" />
      </button>
    </div>
  );
}
