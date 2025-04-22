// components/dashboard/reviews-tab.js
'use client';

import { useState } from 'react';
import { FiStar, FiEdit } from 'react-icons/fi';

export default function ReviewsTab({ reviews }) {
  const [newReview, setNewReview] = useState({
    product: '',
    rating: 0,
    comment: '',
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderStars = (rating, onClick) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <FiStar
          key={i}
          onClick={onClick ? () => onClick(i + 1) : undefined}
          className={`cursor-pointer text-2xl ${
            i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }`}
        />
      ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Review submitted:', newReview);
    setNewReview({ product: '', rating: 0, comment: '' });
  };

  return (
    <div className="space-y-6 bg-[#F8F8F8] p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-[#000000]">Your Reviews</h2>

      {(!reviews || reviews.length === 0) && (
        <div className="text-center py-8">
          <p className="text-[#666666]">You haven't reviewed any products yet.</p>
        </div>
      )}

      {reviews && reviews.map((review) => (
        <div
          key={review.id}
          className="border-b border-[#CCCCCC] pb-6 bg-white p-4 rounded-lg"
        >
          <div className="flex justify-between mb-2">
            <div>
              <h3 className="font-semibold text-[#333333]">
                <a
                  href={`/products/${review.product.id}`}
                  className="text-[#FF4500] hover:underline"
                >
                  {review.product.name}
                </a>
              </h3>
              <div className="flex items-center text-sm space-x-1 mt-1">
                {renderStars(review.rating)}
                <span className="ml-2 text-[#666666]">
                  {formatDate(review.createdAt)}
                </span>
              </div>
            </div>
            <a
              href={`/products/${review.product.id}/edit-review`}
              className="text-[#FF4500] hover:underline"
            >
              <FiEdit className="inline-block" />
            </a>
          </div>
          <p className="text-[#666666] mt-2">{review.comment}</p>
        </div>
      ))}

      <div className="mt-8 p-6 bg-white rounded-lg border border-[#CCCCCC]">
        <h3 className="text-xl font-semibold text-[#333333] mb-4">Leave a Review</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            value={newReview.product}
            onChange={(e) => setNewReview({ ...newReview, product: e.target.value })}
            className="w-full p-2 border border-[#CCCCCC] rounded"
            required
          />
          <div className="flex items-center space-x-1">
            {renderStars(newReview.rating, (rating) => setNewReview({ ...newReview, rating }))}
          </div>
          <textarea
            placeholder="Your Comment"
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            className="w-full p-2 border border-[#CCCCCC] rounded"
            rows="3"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-[#FF4500] text-white px-4 py-2 rounded hover:bg-[#E63E00]"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
