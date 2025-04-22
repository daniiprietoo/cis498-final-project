'use client';

import { useState } from 'react';
import { FiStar as Star, FiTrash2 as TrashIcon } from 'react-icons/fi';

export default function ReviewSection({ reviews }) {
  const [showAll, setShowAll] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 0,
    comment: '',
  });
  const [submittedReviews, setSubmittedReviews] = useState([]);

  const list = showAll
    ? [...submittedReviews, ...reviews]
    : [...submittedReviews, ...reviews].slice(0, 3);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      reviewer: { name: newReview.name },
      createdAt: new Date().toISOString(),
      rating: newReview.rating,
      comment: newReview.comment,
      isUserSubmitted: true,
    };
    setSubmittedReviews((prev) => [newEntry, ...prev]);
    setNewReview({ name: '', rating: 0, comment: '' });
  };

  const handleDelete = (id) => {
    setSubmittedReviews((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <section className="space-y-6 bg-[#F8F8F8] p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-black">Customer Reviews</h2>

      <div className="space-y-4">
        {list.map((r) => (
          <div key={r.id} className="bg-white p-4 rounded-lg shadow-sm border border-[#CCCCCC] relative group">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-black">{r.reviewer.name}</span>
              <span className="text-sm text-[#666666]">
                {new Date(r.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={i < r.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <p className="text-[#666666]">{r.comment}</p>

            {r.isUserSubmitted && (
              <button
                onClick={() => handleDelete(r.id)}
                className="absolute top-2 right-2 text-[#666666] hover:text-red-500"
                aria-label="Delete Review"
              >
                <TrashIcon />
              </button>
            )}

          </div>
        ))}
      </div>

      {reviews.length + submittedReviews.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-[#FF4500] hover:underline font-medium"
        >
          {showAll ? 'Show Less' : `Show All (${reviews.length + submittedReviews.length})`}
        </button>
      )}

      {/* Add Review Form */}
      <div className="mt-8 p-6 bg-white rounded-lg border border-[#CCCCCC]">
        <h3 className="text-xl font-semibold text-[#333333] mb-4">Leave a Review</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={newReview.name}
            onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
            className="w-full p-2 border border-[#CCCCCC] rounded text-[#666666]"
            required
          />

          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                className={`cursor-pointer ${
                  i < newReview.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>

          <textarea
            placeholder="Your Comment"
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            className="w-full p-2 border border-[#CCCCCC] rounded text-[#666666]"
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
    </section>
  );
}
