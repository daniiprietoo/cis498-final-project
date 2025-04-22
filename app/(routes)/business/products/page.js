'use client';

import BusinessProductsTab from "@/components/business/business-products";
import { useBusiness } from "@/components/business/business-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProductsPage() {
  const { business } = useBusiness();
  const router = useRouter();

  useEffect(() => {
    if (!business) {
      console.log("Business not found, redirecting to login.");
      router.replace("/auth/login");
    }
  }, [business, router]);

  console.log("Products for business:", business.products);

  // Compute average rating and number of reviews

  const productsWithRatings = business.products.map((product) => {
    const totalRating = product.reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = totalRating / product.reviews.length || 0;
    return {
      ...product,
      avgRating: averageRating.toFixed(1),
      reviewsCount: product.reviews.length,
    };
  }
  );

  return <BusinessProductsTab products={productsWithRatings} />;
}
