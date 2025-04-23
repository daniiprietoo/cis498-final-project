'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAdmin } from "@/components/admin/admin-context";
import AdminUsers from "@/components/admin/admin-users";

export default function AdminIndex() {
  const { admin } = useAdmin()
  const router = useRouter();

  useEffect(() => {
    if (!admin) {
      console.log("Admin data not found, redirecting to login.");
      router.push("/auth/login");
    }
  }
  , [admin, router]);
  return <AdminUsers users={admin.users} />;
}
