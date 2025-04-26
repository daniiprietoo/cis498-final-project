'use client';

import { useBusiness } from "@/components/business/business-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import BusinessInfo from "@/components/business/business-info";

export default function ProfilePage() {
  const { business } = useBusiness();
  const router = useRouter();

  useEffect(() => {
    if (!business) {
      console.log("Business not found, redirecting to login.");
      router.replace("/auth/login");
    }
  }, [business, router]);

  return <BusinessInfo user={business} />;
}