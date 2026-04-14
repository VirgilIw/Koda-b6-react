import React from "react";
import cs from "../../assets/navbar/coffe.svg";
import csBrown from "../../assets/navbar/coffe-shop.svg";
import { NavLink, useLocation, useNavigate } from "react-router";
import Cart from "../product/Cart";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slice/auth.slice";

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isAdmin = location.pathname.startsWith("/dashboard/admin");

  const [openCart, setOpenCart] = React.useState(false);

  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <section
        className={`fixed top-0 z-50 w-full backdrop-blur-md transition-colors duration-300 ${
          isAdmin
            ? "bg-white text-black shadow"
            : isHome
              ? "bg-black/40 text-white"
              : "bg-black text-white"
        }`}
      >
        <div className="flex flex-col gap-4 px-4 py-3 lg:grid lg:grid-cols-2 lg:px-20 lg:py-5">
          {/* LEFT SIDE */}
          <div className="flex items-center justify-between gap-6 lg:justify-start">
            {/* Logo */}
            <img
              src={isAdmin ? csBrown : cs}
              alt="coffee shop"
              className="h-8"
            />

            {/* Menu */}
            {!isAdmin && (
              <div className="flex items-center gap-6">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `cursor-pointer px-2 pb-1 ${
                      isActive ? "border-b-2 border-orange-400" : ""
                    }`
                  }
                >
                  Home
                </NavLink>

                <NavLink
                  to="/product"
                  className={({ isActive }) =>
                    `cursor-pointer px-2 pb-1 ${
                      isActive ? "border-b-2 border-orange-400" : ""
                    }`
                  }
                >
                  Product
                </NavLink>
              </div>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="relative flex items-center justify-center gap-4 lg:justify-end">
            {/* CART */}
            {!isAdmin && (
              <div className="relative">
                <button
                  onClick={() => setOpenCart(!openCart)}
                  className="relative flex items-center"
                >
                  <span className="text-xl">🛒</span>

                  <span className="absolute -top-2 -right-2 rounded-full bg-orange-500 px-1 text-xs text-white">
                    2
                  </span>
                </button>

                <Cart open={openCart} onClose={() => setOpenCart(false)} />
              </div>
            )}
            {token ? (
              <div className="group relative">
                {/* PROFILE TRIGGER */}
                <div className="flex cursor-pointer items-center gap-2">
                  {/* Avatar */}
                  <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-orange-400 font-bold text-black">
                    {user?.picture ? (
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}/images/${encodeURIComponent(user.picture)}`}
                        onError={(e) => (e.target.src = "/default-profile.png")}
                        alt="profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span>
                        {user?.email?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    )}
                  </div>

                  {/* Nama */}
                  <span className="hidden font-semibold lg:block">
                    {user?.email || "User"}
                  </span>
                </div>

                {/* DROPDOWN */}
                <div className="invisible absolute top-12 right-0 w-48 translate-y-2 rounded-xl bg-white p-2 text-black opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {/* User Info */}
                  <div className="border-b px-3 py-2">
                    <p className="font-semibold">{user?.name}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>

                  {/* Menu */}
                  <NavLink
                    to="/profile"
                    className="block rounded-md px-3 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </NavLink>

                  <NavLink
                    to="/history-order"
                    className="block rounded-md px-3 py-2 hover:bg-gray-100"
                  >
                    Orders
                  </NavLink>

                  {/* Logout */}
                  <button
                    onClick={handleLogOut}
                    className="w-full rounded-md px-3 py-2 text-left text-red-500 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="rounded-md border border-current px-4 py-2 transition duration-200 hover:scale-105 hover:bg-white hover:text-black"
                >
                  Sign In
                </NavLink>

                <NavLink
                  to="/register"
                  className="rounded-md bg-orange-400 px-4 py-2 text-black transition duration-200 hover:scale-105 hover:bg-orange-500"
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
