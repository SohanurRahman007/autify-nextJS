// components/NavbarWrapper.jsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar"; // Assuming you have a Navbar component

export default function NavbarWrapper() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard) {
    return null;
  }

  return <Navbar />;
}
