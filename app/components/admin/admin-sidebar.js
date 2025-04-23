"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiUser, FiUsers } from "react-icons/fi";

export default function AdminSidebar() {
  const pathname = usePathname();
  const active = pathname.split("/")[2];

  const tabs = [
    { href: "profile", label: "Profile", icon: FiUser },
    { href: "users", label: "Users", icon: FiUsers },
    { href: "business", label: "Business", icon: FiUsers },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 top-8 space-y-6">
      <nav className="space-y-1">
        {tabs.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={`/admin/${href}`} 
            className={
              `flex items-center p-3 rounded-md transition ` +
              (active === href
                ? "bg-orange-100 text-[#ff4500]"
                : "text-gray-700 hover:bg-orange-100 hover:text-[#e03f00]")
            }
          >
            <Icon className="mr-3" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}