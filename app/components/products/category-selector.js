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
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:border-indigo-600"
            } transition`}
            onClick={() => onSelect(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
