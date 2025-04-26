'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiHeart as Heart } from 'react-icons/fi';

export default function ProductDetails({ product }) {
  const [qty, setQty] = useState(1);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    console.log(`Added ${qty} × ${product.name} to cart`);
    // TODO: call your cart store / API here
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Image */}
      <div className="flex-1">
        <img
          src={product.mainImage ?? '/api/placeholder/600/400'}
          alt={product.name}
          className="w-full h-auto rounded-lg shadow-lg object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1 space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
        <p className="text-[#666666]">{product.description}</p>
        <div className="flex items-center space-x-4">
          <span className="text-3xl font-extrabold text-[#ff4500]">
            ${product.price.toFixed(2)}
          </span>
          <button
            className="text-gray-500 hover:text-red-500 transition"
            title="Add to wishlist"
          >
            <Heart size={24} />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <label htmlFor="quantity" className="font-medium">
            Qty:
          </label>
          <input
            id="quantity"
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(+e.target.value)}
            className="w-20 border rounded px-2 py-1"
          />
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-[#FF4500] text-white px-6 py-3 rounded-lg hover:bg-[#e03f00] transition"
        >
          Add to Cart
        </button>

        <div className="text-sm text-gray-500">
          Sold by{' '}
          <Link href={`/seller/${product.seller.id}`} className="font-medium text-[#ff4500]">
            {product.seller.name}
          </Link>
        </div>
      </div>
    </div>
  );
}
