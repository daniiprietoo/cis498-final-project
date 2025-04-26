export const revalidate = 60;

import ProductFilters from "@/components/products/product-filters";
import ProductCard from "@/components/products/product-card";
import SearchBar from "@/components/ui/search-bar";
import { PRODUCT_QUERIES } from "@/lib/db/actions";

export default async function ProductsPage({ searchParams }) {
  const { category, search } = await searchParams;
  const selectedCategory = category ?? "all";
  const searchTerm = search ?? "";
  const searchTermLower = searchTerm.toLowerCase();

  const categories = [
    { id: "all", name: "All Tools" },
    { id: "plugins", name: "Plugins" },
    { id: "themes", name: "Themes" },
    { id: "extensions", name: "Extensions" },
    { id: "libraries", name: "Libraries" },
  ];

  // 3) fetch products, include reviews + seller for metrics
  const productsData = await PRODUCT_QUERIES.getAllProductsWithReviews(
    selectedCategory,
    searchTermLower
  );

  const products = productsData.map((p) => {
    const count = p.reviews.length;
    const avg = count
      ? p.reviews.reduce((sum, r) => sum + r.rating, 0) / count
      : 0;
    return {
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price.toString(),
      category: p.category,
      url: p.url,
      mainImage: p.mainImage,
      avgRating: avg.toFixed(2),
      reviewsCount: count,
      seller: p.seller.name,
    };
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8F8]">
      <section className="container mx-auto px-4 py-8">

        <div className="mb-4 mt-12">
          <SearchBar />
        </div>
        <ProductFilters
          categories={categories}
          selectedCategory={selectedCategory}
        />

        {/* product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {products.map((tool) => (
            <ProductCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>
    </div>
  );
}
