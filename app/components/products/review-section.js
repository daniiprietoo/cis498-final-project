"use client";

import { useState } from "react";
import { FiStar as Star, FiTrash2 as TrashIcon } from "react-icons/fi";
import { useSession } from "next-auth/react";

export default function ReviewSection({ reviews: initialReviews, productId }) {
  const { data: session } = useSession();

  const [allReviews, setAllReviews] = useState(initialReviews);
  const [showAll, setShowAll] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });

  const list = showAll ? allReviews : allReviews.slice(0, 3);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session) {
      alert("You must be logged in to leave a review.");
      return;
    }

    if (newReview.rating < 1 || newReview.rating > 5) {
      alert("Please select a rating between 1 and 5.");
      return;
    }
    if (!newReview.comment) {
      alert("Please enter a comment.");
      return;
    }
    
    const fd = new FormData(e.target);
    fd.append("reviewerId", session.user.id);
    fd.append("productId", productId);
    fd.append("createdAt", new Date().toISOString());

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        body: fd,
      });

      const { review: created } = await res.json();

      setAllReviews((prev) => [created, ...prev]);
      setNewReview({ rating: 0, comment: "" });
    } catch (err) {
      console.error(err);
      return;
    }
    return;
  };

  const handleDelete = (id) => {
    setSubmittedReviews((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <section className="space-y-6 bg-[#F8F8F8] p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-black">Customer Reviews</h2>

      <div className="space-y-4">
        {list.map((r) => (
          <div
            key={r.id}
            className="bg-white p-4 rounded-lg shadow-sm border border-[#CCCCCC] relative group"
          >
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
                  className={
                    i < r.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }
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

      {allReviews.length > 3 && (
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : `Show All (${allReviews.length})`}
        </button>
      )}

      {/* Add Review Form */}
      <div className="mt-8 p-6 bg-white rounded-lg border border-[#CCCCCC]">
        <h3 className="text-xl font-semibold text-[#333333] mb-4">
          Leave a Review
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="productId" value={productId} />

          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                className={`cursor-pointer ${
                  i < newReview.rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <input type="hidden" name="rating" value={newReview.rating} />
          </div>

          <textarea
            placeholder="Your Comment"
            name="comment"
            value={newReview.comment}
            onChange={(e) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
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
