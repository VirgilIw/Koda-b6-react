import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import { Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <div
      className={
        isHome ? "min-h-screen bg-gray-100" : "min-h-screen bg-black text-white"
      }
    >
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
