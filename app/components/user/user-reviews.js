// components/dashboard/reviews-tab.js
"use client";

import { useState } from "react";
import { FiStar, FiEdit, FiCheck, FiX } from "react-icons/fi";
import { useUser } from "@/components/user/user-context";

export default function ReviewsTab({ reviews }) {
  const { user, setUser } = useUser();

  const [newReview, setNewReview] = useState({
    product: "",
    rating: 0,
    comment: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ rating: 0, comment: "" });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
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
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ));
  };

  const startEdit = (review) => {
    setEditingId(review.id);
    setForm({ rating: review.rating, comment: review.comment });
  };

  const cancelEdit = () => setEditingId(null);

  const saveEdit = async (reviewId) => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const updatedReview = await res.json();

    // 1) update the context user.reviews array
    const newReviews = user.reviews.map((r) =>
      r.id === reviewId
        ? { ...r, rating: updatedReview.updated.rating, comment: updatedReview.updated.comment }
        : r
    );
    setUser({ ...user, reviews: newReviews });

    // 2) reset editing state
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Review submitted:", newReview);
    setNewReview({ product: "", rating: 0, comment: "" });
  };

  return (
    <div className="space-y-6 bg-[#F8F8F8] p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-[#000000]">Your Reviews</h2>

      {(!reviews || reviews.length === 0) && (
        <div className="text-center py-8">
          <p className="text-[#666666]">
            You haven't reviewed any products yet.
          </p>
        </div>
      )}

      {reviews.map((review) => (
        <div
          key={review.id}
          className="border-b border-[#CCC] pb-6 bg-white p-4 rounded-lg"
        >
          {editingId === review.id ? (
            // EDIT FORM
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveEdit(review.id);
              }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-1">
                {renderStars(form.rating, (r) =>
                  setForm((f) => ({ ...f, rating: r }))
                )}
              </div>
              <textarea
                value={form.comment}
                onChange={(e) =>
                  setForm((f) => ({ ...f, comment: e.target.value }))
                }
                rows={3}
                className="w-full p-2 border border-[#CCC] rounded"
                required
              />
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="flex items-center bg-green-500 text-white px-3 py-1 rounded"
                >
                  <FiCheck className="mr-1" /> Save
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="flex items-center bg-red-500 text-white px-3 py-1 rounded"
                >
                  <FiX className="mr-1" /> Cancel
                </button>
              </div>
            </form>
          ) : (
            // STATIC VIEW
            <>
              <div className="flex justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-[#333]">
                    <a
                      href={`/products/${review.product.id}`}
                      className="text-[#FF4500] hover:underline"
                    >
                      {review.product.name}
                    </a>
                  </h3>
                  <div className="flex items-center text-sm space-x-1 mt-1">
                    {renderStars(review.rating)}
                    <span className="ml-2 text-[#666]">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                </div>
                <button onClick={() => startEdit(review)}>
                  <FiEdit className="text-[#FF4500] hover:text-[#E63E00]" />
                </button>
              </div>
              <p className="text-[#666] mt-2">{review.comment}</p>
            </>
          )}
        </div>
      ))}

      <div className="mt-8 p-6 bg-white rounded-lg border border-[#CCCCCC]">
        <h3 className="text-xl font-semibold text-[#333333] mb-4">
          Leave a Review
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            value={newReview.product}
            onChange={(e) =>
              setNewReview({ ...newReview, product: e.target.value })
            }
            className="w-full p-2 border border-[#CCCCCC] rounded"
            required
          />
          <div className="flex items-center space-x-1">
            {renderStars(newReview.rating, (rating) =>
              setNewReview({ ...newReview, rating })
            )}
          </div>
          <textarea
            placeholder="Your Comment"
            value={newReview.comment}
            onChange={(e) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
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
