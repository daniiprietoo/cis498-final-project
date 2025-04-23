import { auth } from "@/lib/auth";
import AdminSidebar from "@/components/admin/admin-sidebar";
import { AdminProvider } from "@/components/admin/admin-context";
import { ADMIN_QUERIES } from "@/lib/db/actions";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const session = await auth();

  if (!session.user || session.user.role !== "ADMIN") {
    redirect("/auth/login");
  }

  const adminData = await ADMIN_QUERIES.getAllAdminInfo();

  console.log("admin data:", adminData);

  const adminWithUser = {
    ...adminData,
    user: session.user
  }

  return (
    <AdminProvider admin={adminWithUser}>
      <div className="min-h-screen bg-[#F8F8F8] text-gray-700">
        {/* header/banner */}
        <div className="bg-orange-200 text-[#ff4500] py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-extrabold">
              {session?.user.name} Dashboard
            </h1>
            <p className="opacity-90 text-black">Manage user and business accounts</p>
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
