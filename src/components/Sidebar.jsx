// src/components/Sidebar.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdOutlineDashboard,
  MdAdd,
  MdOutlineManageSearch,
  MdArrowBack,
} from "react-icons/md"; // Import the icons

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/dashboard", icon: MdOutlineDashboard },
    { name: "Add Product", href: "/dashboard/add-product", icon: MdAdd },
    {
      name: "Manage Products",
      href: "/dashboard/manage-products",
      icon: MdOutlineManageSearch,
    },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg p-6 flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-violet-600">Admin Panel</h2>
      <nav className="w-full">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  pathname === link.href
                    ? "bg-violet-600 text-white"
                    : "hover:bg-gray-200 text-gray-800"
                }`}
              >
                {link.icon && <link.icon size={20} />}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* "Go Home" button at the bottom of the sidebar */}
      <div className="mt-auto w-full">
        <Link
          href="/"
          className="flex items-center space-x-3 p-3 rounded-lg transition-colors hover:bg-gray-200 text-gray-800"
        >
          <MdArrowBack size={20} />
          <span>Go Home</span>
        </Link>
      </div>
    </aside>
  );
}
