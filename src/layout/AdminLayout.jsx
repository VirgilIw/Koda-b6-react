import React from "react";
import Navbar from "../components/ui/Navbar";
import { Outlet } from "react-router";
import AdminDashboardMenu from "../components/admin/AdminDashboardMenu";

export default function AdminLayout() {
  return (
    <div>
      <Navbar />
      <main className="mt-15 flex min-h-screen">
          <AdminDashboardMenu />

        <div className="w-screen">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
