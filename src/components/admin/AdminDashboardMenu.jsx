import React from "react";
import { useNavigate, useLocation } from "react-router";

import DashboardIcon from "../../assets/adminDashboard/DashboardIcon.svg";
import ProductIcon from "../../assets/adminDashboard/ProductIcon.svg";
import OrderIcon from "../../assets/adminDashboard/Bag.svg";
import UserIcon from "../../assets/adminDashboard/UserIcon.svg";
import LogoutIcon from "../../assets/adminDashboard/LogoutIcon.svg";
import Menu from "../../assets/adminDashboard/utensils-crossed.svg";
import { Link } from "react-router";

function AdminDashboardMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (item) => {
    if (item.path) {
      navigate(item.path);
    }
  };

  const menu = [
    { id: 1, name: "Dashboard", icon: DashboardIcon, path: "/dashboard/admin" },
    {
      id: 2,
      name: "Product",
      icon: ProductIcon,
      path: "/dashboard/admin/product-list",
    },
    { id: 3, name: "Menu", icon: Menu, path: "/dashboard/admin/menu-list" },
    {
      id: 4,
      name: "Order",
      icon: OrderIcon,
      path: "/dashboard/admin/order-list",
    },
    {
      id: 5,
      name: "User",
      icon: UserIcon,
      path: "/dashboard/admin/users-list",
    },
    { id: 6, name: "Keluar", icon: LogoutIcon, path: "/login" },
  ];
  return (
    <div className="hidden h-screen border-r-2 border-[#E8E8E8] md:block md:p-5">
      <div className="hidden h-screen w-64 border-[#E8E8E8] md:block md:p-5">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => handleMenuClick(item)}
            className={`${location.pathname === item.path ? "bg-brand-orange" : "bg-white"} flex w-full cursor-pointer items-center gap-3 rounded-lg border-0 p-2 transition-colors hover:bg-[#ffad4e]`}
          >
            <div>
              <img src={item.icon} alt={`${item.name}-icon`} />
            </div>
            <div>
              <p>{item.name}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboardMenu;
