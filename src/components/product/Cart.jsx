import React from "react";
import http from "../../lib/http";
import { useSelector, useDispatch } from "react-redux";
import { setCart as setCartRedux } from "../../redux/slice/cart.slice";

export default function Cart({ open, onClose }) {
  const [cart, setCart] = React.useState([]);

  const token = useSelector((state) => state.auth.token);
  const variants = useSelector((state) => state.meta.variants);
  const sizes = useSelector((state) => state.meta.sizes);

  const dispatch = useDispatch();

  const getVariantName = (id) =>
    variants?.find((v) => v.id === id)?.variant_name || "Unknown";

  const getSizeName = (id) =>
    sizes?.find((s) => s.id === id)?.size_name || "Unknown";

  React.useEffect(() => {
    if (!open || !token) return;

    (async () => {
      try {
        const res = await http("/cart", null, {
          method: "GET",
          token,
        });

        const data = await res.json();
        const cartData = data?.result ?? [];

        setCart(cartData); 
        dispatch(setCartRedux(cartData)); 
      } catch (err) {
        console.error("CART ERROR:", err);
      }
    })();
  }, [open, token, dispatch]);

  if (!open) return null;

  return (
    <div className="absolute top-12 right-0 z-50 w-80 rounded-lg bg-white p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-black">Cart</h2>
        <button onClick={onClose}>✖</button>
      </div>

      <div className="mt-4 text-black">
        {cart.length === 0 ? (
          <p>Cart kosong</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="mb-3 flex items-center gap-2 border-b pb-2"
            >
              <img
                src={item.product_image}
                alt={item.product_name}
                className="h-12 w-12 rounded object-cover"
              />

              <div className="flex-1">
                <p className="font-semibold">{item.product_name}</p>

                <p className="text-xs text-gray-500">
                  {getVariantName(item.variant_id)} -{" "}
                  {getSizeName(item.size_id)}
                </p>

                <p className="text-sm text-gray-600">
                  {item.qty} x Rp{item.price.toLocaleString()} = Rp
                  {(item.qty * item.price).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}