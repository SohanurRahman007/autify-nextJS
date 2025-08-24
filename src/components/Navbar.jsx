"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { FaUsers, FaHome, FaProductHunt, FaSlack } from "react-icons/fa";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  const currentTheme = theme === "system" ? systemTheme : theme;

  if (!mounted) {
    return null;
  }

  // Active vs default link classes
  const activeLinkClass =
    "px-3 py-2 mx-3 mt-2 font-bold text-blue-500 transition-colors duration-300 transform rounded-md lg:mt-0 hover:bg-gray-100/20 dark:hover:bg-gray-700/20 flex items-center";
  const defaultLinkClass =
    "px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100/20 dark:hover:bg-gray-700/20 flex items-center";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md border-b border-white/10">
      <div className="container px-6  mx-auto">
        <div className="lg:flex lg:items-center lg:justify-between">
          {/* Logo */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center p-2 rounded-lg transition-colors duration-300 transform hover:bg-gray-100/20 dark:hover:bg-gray-700/20"
            >
              <img
                className="w-auto h-10"
                src="https://i.ibb.co.com/9mQSJ8D7/Blue-3-D-Abstract-Letter-S-Logo-1-removebg-preview.png"
                alt="Authify Logo"
              />
            </Link>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                onClick={toggleMobileMenu}
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none"
                aria-label="toggle menu"
              >
                {isOpen ? (
                  <FiX className="w-6 h-6" />
                ) : (
                  <FiMenu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Menu */}
          <div
            className={`absolute inset-x-0 z-20 w-full px-6 py-4 duration-300 ease-in-out bg-transparent backdrop-blur-md lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${
              isOpen
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            }`}
          >
            {/* Navigation Links */}
            <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
              <Link
                href="/"
                className={
                  pathname === "/" ? activeLinkClass : defaultLinkClass
                }
                onClick={toggleMobileMenu}
              >
                <FaHome className="mr-2" /> Home
              </Link>
              <Link
                href="/products"
                className={
                  pathname === "/products" ? activeLinkClass : defaultLinkClass
                }
                onClick={toggleMobileMenu}
              >
                <FaProductHunt className="mr-2" /> Products
              </Link>
              {session && (
                <Link
                  href="/dashboard"
                  className={
                    pathname === "/dashboard"
                      ? activeLinkClass
                      : defaultLinkClass
                  }
                  onClick={toggleMobileMenu}
                >
                  <FaUsers className="mr-2" /> Dashboard
                </Link>
              )}
              <Link
                href="#"
                className={defaultLinkClass}
                onClick={toggleMobileMenu}
              >
                <FaSlack className="mr-2" /> Join Slack
              </Link>
            </div>

            {/* Authentication + Theme Toggle */}
            <div className="flex items-center justify-center mt-4 lg:mt-0">
              {session ? (
                <div className="flex items-center -mx-3">
                  {session.user?.image && (
                    <div className="w-14 h-8 overflow-hidden border-2 border-gray-400 rounded-full mx-2">
                      <img
                        src={session.user.image}
                        className="object-cover w-full h-full"
                        alt="User avatar"
                      />
                    </div>
                  )}
                  <button
                    onClick={() => {
                      signOut();
                      toggleMobileMenu();
                    }}
                    className="block w-full px-2 py-2 mx-3 mt-2 font-semibold text-center text-gray-700 dark:text-gray-200 lg:mt-0 hover:bg-gray-100/20 dark:hover:bg-gray-700/20 rounded-md"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/login" onClick={toggleMobileMenu}>
                  <button className="block w-full px-2 py-2 mx-3 mt-2 font-semibold text-center text-gray-700 dark:text-gray-200 lg:mt-0 hover:bg-gray-100/20 dark:hover:bg-gray-700/20 rounded-md">
                    Log in
                  </button>
                </Link>
              )}

              {/* Theme Toggle */}
              <button
                onClick={() => {
                  setTheme(currentTheme === "dark" ? "light" : "dark");
                  toggleMobileMenu();
                }}
                className="flex items-center w-full p-2 text-gray-700 dark:text-gray-200 lg:w-auto hover:bg-gray-100/20 dark:hover:bg-gray-700/20 rounded-md"
              >
                {currentTheme === "dark" ? (
                  <FiSun className="w-5 h-5 mr-2" />
                ) : (
                  <FiMoon className="w-5 h-5 mr-2" />
                )}
                <span className="lg:hidden">
                  {currentTheme === "dark" ? "Light Mode" : "Dark Mode"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
