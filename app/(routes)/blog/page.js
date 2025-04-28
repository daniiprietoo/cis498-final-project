'use client';
import React, { useState } from "react";

export default function BlogPage() {
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ name: "", comment: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setComments([...comments, { ...form, id: Date.now() }]);
    setForm({ name: "", comment: "" });
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8] text-gray-800">
      <section className="container mx-auto px-4 py-12 space-y-6">
        <h1 className="text-3xl text-[#ff4500] font-bold mb-4">Blog</h1>

        <p>
          Welcome to the Developer Tools Platform blog, your go‑to source for product news,
          deep dives, and community spotlights. Here we share insights on new features,
          upcoming releases, and the thinking behind our roadmap.
        </p>

        <p>
          In our latest posts, you’ll discover in‑depth tutorials on building custom plugins,
          extending themes, and automating workflows. Whether you’re just getting started or
          looking to optimize complex projects, our step‑by‑step guides and code samples
          will help you move faster.
        </p>

        <p>
          We also spotlight real‑world use cases from our community. Learn how companies of
          all sizes integrate our APIs to boost performance, streamline development, and
          deliver better tools to their users.
        </p>

        <p>
          Beyond hands‑on tutorials, this blog is where we discuss best practices for
          security, scalability, and maintainability. Get pro tips on versioning, caching
          strategies, and monitoring to ensure your applications remain robust under load.
        </p>

        <p>
          Finally, stay informed with our release announcements and changelogs. We document
          every major update, deprecation, and performance improvement so you never miss a
          beat. Subscribe to our RSS feed or follow us on Twitter for real‑time alerts.
        </p>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Share Your Thoughts with <span className= 'text-[#ff4500] font-extrabold'>DevTools</span></h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                Comment
              </label>
              <textarea
                id="comment"
                name="comment"
                rows="4"
                value={form.comment}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <button
              type="submit"
              className="bg-[#ff4500] text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="mt-8 space-y-6">
          <h2 className="text-2xl font-semibold">Comments</h2>
          {comments.length === 0 ? (
            <p className="text-gray-600">No comments yet. Be the first to comment!</p>
          ) : (
            comments.map(c => (
              <div key={c.id} className="border-t border-gray-300 pt-4">
                <p className="font-semibold">{c.name}</p>
                <p className="mt-1 text-gray-700">{c.comment}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}