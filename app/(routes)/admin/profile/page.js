'use client';

import { useAdmin } from "@/components/admin/admin-context";
import { useRouter } from "next/navigation";
import AdminProfile from "@/components/admin/admin-profile";
import { useEffect } from "react";


export default function AdminIndex() {
  const { admin } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!admin) {
      console.log("Admin data not found, redirecting to login.");
      router.push("/auth/login");
    }
  }, [admin, router]);
  
  return <AdminProfile user={admin.user} />;
}


