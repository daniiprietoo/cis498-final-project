import { auth } from "@/lib/auth";
import BusinessSidebar from "@/components/business/business-sidebar";
import { BusinessProvider } from "@/components/business/business-context";
import { BUSINESS_QUERIES } from "@/lib/db/actions";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const session = await auth();

  if (!session?.user || session?.user?.role !== "BUSINESS") {
    redirect("/auth/login");
  }
  const businessData = await BUSINESS_QUERIES.getAllBusinessInfo(
    session.user.businessId
  );
  console.log("Business data:", businessData);

  return (
    <BusinessProvider business={businessData}>
      <div className="min-h-screen bg-[#F8F8F8] text-gray-700">
        {/* header/banner */}
        <div className="bg-gradient-to-r from-orange-200 to-[#F8F8F8] text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold">
              {session.user.businessName}Dashboard
            </h1>
            <p className="opacity-90">Manage your profile, orders, reviews…</p>
          </div>
        </div>

        <div className="container mx-auto px-4 -mt-8 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <BusinessSidebar />
            <section className="lg:col-span-3 space-y-8">{children}</section>
          </div>
        </div>
      </div>
    </BusinessProvider>
  );
}
