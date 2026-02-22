import React from "react";
import Navbar from "../components/ui/Navbar";
import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <div>
      <Navbar />
      <main className={`min-h-screen`}>
        <Outlet />
      </main>
    </div>
  );
}
