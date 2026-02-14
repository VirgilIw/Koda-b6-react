import React from "react";
import Navbar from "../components/ui/Navbar";
import { Outlet, useLocation } from "react-router";
import Footer from "../components/ui/Footer";

export default function HomeLayout() {
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <div className={isHome ? "bg-gray-100" : "bg-black text-white min-h-screen"}>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
