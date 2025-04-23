'use client';

import BusinessOrdersTab from "@/components/business/business-orders";
import { useBusiness } from "@/components/business/business-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OrdersPage() {
  const { business } = useBusiness()
  const router = useRouter();

  useEffect(() => {
    if (!business) {
      console.log("Business not found, redirecting to login.");
      router.push("/auth/login");
    }
  }
  , [business, router]);

  console.log("Orders for business:", business.orders);
  return <BusinessOrdersTab orders={business.orders} />;
}
