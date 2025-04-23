import { redirect } from "next/navigation";
import UserSidebar from "@/components/user/user-sidebar";
import { UserProvider } from "@/components/user/user-context";
import { auth } from "@/lib/auth";
import { USER_QUERIES } from "@/lib/db/actions";

export default async function UserLayout({ children }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const userData = await USER_QUERIES.getAllUserInfo(session.user.id);
  if (!userData) {
    redirect("/auth/login");
  }

  console.log("User data:", userData);
  console.log("User session:", userData.reviews);

  return (
    <UserProvider user={userData}>
      <div className="min-h-screen bg-[#F8F8F8]">
        {/* header/banner */}
        <div className="bg-gradient-to-r from-orange-200 to-[#F8F8F8] text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold">Your Dashboard</h1>
            <p className="opacity-90">Manage your profile, orders, reviews…</p>
          </div>
        </div>

        <div className="container mx-auto px-4 -mt-8 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* sidebar */}
            <aside className="lg:col-span-1">
              <UserSidebar />
            </aside>

            {/* content */}
            <section className="lg:col-span-3 space-y-8">{children}</section>
          </div>
        </div>
      </div>
    </UserProvider>
  );
}
