import ProductCard from "@/components/products/product-card";

export default function BusinessProductsTab({ products }) {
  const formatProducts = (products) => {
    return products.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price.toString(),
      mainImage: p.mainImage,
      category: p.category,
      url: p.url,
      avgRating: p.avgRating,
      reviewsCount: p.reviewsCount,
      seller: p.seller,
    }));
  };

  const formattedProducts = formatProducts(products);

  return (
    <div className="space-y-6 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold">Your Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {formattedProducts ? (formattedProducts.map((p) => (
          <ProductCard key={p.id} tool={p} />
        ))) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
}
