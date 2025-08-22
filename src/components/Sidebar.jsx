// src/components/Sidebar.jsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Add Product", href: "/dashboard/add-product" },
    { name: "Manage Products", href: "/dashboard/manage-products" }, // Example for a future page
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
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  pathname === link.href
                    ? "bg-violet-600 text-white"
                    : "hover:bg-gray-200 text-gray-800"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
