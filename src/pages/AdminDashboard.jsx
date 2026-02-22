import React from "react";
import AdminDashboardMenu from "../components/admin/AdminDashboardMenu";
import ProductChart from "../components/admin/ProductChart";

export default function AdminDashboard() {
  return (
    <main className="px-5 md:grid md:grid-cols-[300px_670px] lg:grid-cols-[20%_80%] mt-24">
      <AdminDashboardMenu />
      <ProductChart />
    </main>
  );
}
