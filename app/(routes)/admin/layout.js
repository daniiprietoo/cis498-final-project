import { auth } from "@/lib/auth";
import AdminSidebar from "@/components/admin/admin-sidebar";
import { AdminProvider } from "@/components/admin/admin-context";
import { ADMIN_QUERIES } from "@/lib/db/actions";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const session = await auth();

  if (!session.user || session.user.role !== "admin") {
    redirect("/auth/login");
  }
  const adminData = await ADMIN_QUERIES.getAlladminInfo(
    session.user.adminId
  );
  console.log("admin data:", adminData);

  return (
    <AdminProvider admin={adminData}>
      <div className="min-h-screen bg-[#F8F8F8] text-gray-700">
        {/* header/banner */}
        <div className="bg-gradient-to-r from-orange-200 to-[#F8F8F8] text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold">
              {session.user.adminName}Dashboard
            </h1>
            <p className="opacity-90">Manage Users and Businesses</p>
          </div>
        </div>

        <div className="container mx-auto px-4 -mt-8 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <AdminSidebar />
            <section className="lg:col-span-3 space-y-8">{children}</section>
          </div>
        </div>
      </div> 
    </AdminProvider>
  );
}
