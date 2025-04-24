"use client";

export default function CategorySelector({
  categories,
  selectedCategory,
  onSelect,
}) {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-5 py-2 rounded-full ${
              selectedCategory === category.id
                ? "bg-[#FF4500] text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:border-[#ff4500]"
            } transition duration-300 transform hover:scale-105`}
            onClick={() => onSelect(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
