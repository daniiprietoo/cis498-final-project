"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiUser,
  FiShoppingBag,
  FiStar,
  FiMessageSquare,
  FiHeart,
} from "react-icons/fi";

export default function UserSidebar() {
  const pathname = usePathname();
  const active = pathname.split("/")[2];

  const tabs = [
    { href: "profile", label: "Profile", icon: FiUser },
    { href: "orders", label: "Orders", icon: FiShoppingBag },
    { href: "reviews", label: "Reviews", icon: FiStar },
    { href: "support", label: "Support", icon: FiMessageSquare },
    { href: "wishlist", label: "Wishlist", icon: FiHeart },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 top-8 space-y-6">
      <nav className="space-y-1">
        {tabs.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={`/user/${href}`}
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
