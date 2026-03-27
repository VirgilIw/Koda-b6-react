import React from "react";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import { Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import http from "../lib/http";
import { setCart } from "../redux/slice/cart.slice";
import { setVariants, setSizes } from "../redux/slice/meta.slice";

export default function MainLayout() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const variants = useSelector((state) => state.meta.variants || []);
  const cart = useSelector((state) => state.cart.cart || []);

  // 1. FETCH META (variants + sizes)
  React.useEffect(() => {
    if (!token || variants.length > 0) return;

    (async () => {
      try {
        const [variantRes, sizeRes] = await Promise.all([
          http("/admin/variants", null, { token }),
          http("/admin/sizes", null, { token }),
        ]);

        const variantData = await variantRes.json();
        const sizeData = await sizeRes.json();

        dispatch(setVariants(variantData?.result ?? []));
        dispatch(setSizes(sizeData?.result ?? []));
      } catch (err) {
        console.error("META ERROR:", err);
      }
    })();
  }, [token, variants.length, dispatch]);

  React.useEffect(() => {
    if (!token || cart.length > 0) return;

    (async () => {
      try {
        const res = await http("/cart", null, { token });
        const data = await res.json();

        dispatch(setCart(data?.result ?? []));
      } catch (err) {
        console.error("CART ERROR:", err);
      }
    })();
  }, [token, cart.length, dispatch]);

  return (
    <div>
      <Navbar />

      <main className="min-h-screen">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}