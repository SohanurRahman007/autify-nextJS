"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  MdOutlineDashboard,
  MdAdd,
  MdOutlineManageSearch,
  MdMenu,
  MdClose,
} from "react-icons/md";

const user = {
  name: "John Doe",
  image:
    "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
};

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

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
    <>
      {/* Mobile Hamburger */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-800 dark:text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 px-4 py-8 bg-white border-r dark:bg-gray-900 dark:border-gray-700 transform transition-transform duration-300 z-50
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center mb-6">
          <img
            className="w-auto h-10"
            src="https://i.ibb.co.com/9mQSJ8D7/Blue-3-D-Abstract-Letter-S-Logo-1-removebg-preview.png"
            alt="Authify Logo"
          />
        </Link>

        {/* Navigation */}
        <nav className="flex flex-col justify-between h-full">
          <div className="space-y-2">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center px-4 py-2 rounded-md transition-colors duration-300 ${
                  pathname === link.href
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                }`}
                onClick={() => setIsOpen(false)} // close sidebar on mobile link click
              >
                {link.icon && <link.icon className="w-5 h-5" />}
                <span className="mx-4 font-medium">{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Logged-in user */}
          {user && (
            <div className="flex items-center px-4 mt-6 -mx-2">
              <img
                className="object-cover mx-2 rounded-full h-9 w-9"
                src={user.image}
                alt={user.name}
              />
              <span className="mx-2 font-medium text-gray-800 dark:text-gray-200">
                {user.name}
              </span>
            </div>
          )}
        </nav>
      </aside>
    </>
  );
}
