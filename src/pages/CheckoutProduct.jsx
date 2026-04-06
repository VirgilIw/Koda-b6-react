import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import CardCheckout from "../components/checkout-product/CardCheckout";
import PaymentType from "../components/checkout-product/PaymentType";
import PaymentInfoDelivery from "../components/checkout-product/PaymentInfoDelivery";
import AddNewProduct from "../components/checkout-product/AddNewProduct";
import http from "../lib/http";

export default function CheckoutProduct() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [product, setProduct] = React.useState(null);
  const [show, setShow] = React.useState(false);

  const [formData, setFormData] = React.useState({
    email: "",
    fullName: "",
    address: "",
    delivery: "dinein",
  });

  // query params
  const qty = Number(searchParams.get("qty")) || 1;
  const size = searchParams.get("size") || "Regular";
  const temperature = searchParams.get("temperature") || "Hot";

  // fetch product
  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await http(`/admin/products/${id}`);
        const data = await res.json();
        setProduct(data.result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p className="p-20">Loading...</p>;
  }

  // harga dari API
  const sizePrice =
    product.sizes?.find((item) => item.name === size)?.price || 0;

  const variantPrice =
    product.variants?.find((item) => item.name === temperature)?.price || 0;

  const basePrice = product.price;
  const finalPrice = basePrice + sizePrice + variantPrice;

  //  delivery mapping (clean)
  const deliveryMap = {
    dinein: 0,
    pickup: 0,
    "door delivery": 10000,
  };

  const deliveryPrice = deliveryMap[formData.delivery] || 0;

  // kalkulasi
  const tax = 4000;
  const order = qty * finalPrice;
  const subtotal = order + tax + deliveryPrice;

  const handleCheckout = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        email: formData.email,
        full_name: formData.fullName,
        address: formData.address,

        delivery_method: formData.delivery,
        delivery_fee: deliveryPrice,

        payment_method: "cash", 

        tax: tax,
        subtotal_price: order,
        total_price: subtotal,

        items: [
          {
            product_id: product.id,
            qty,
            size,
            variant: temperature,
            price: finalPrice,
          },
        ],
      };

      const res = await http("/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer token`,
        
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "checkout failed");
      }

      navigate("/history-order");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <main className="mt-20">
      <h1 className="px-20 pt-20 pb-5 text-5xl font-semibold">
        Payment Details
      </h1>

      <form onSubmit={handleCheckout}>
        <section className="mt-10 grid grid-cols-[2fr_1fr] gap-8 px-18">
          {/* LEFT */}
          <div>
            <div className="flex items-center justify-between">
              <p className="text-xl font-semibold">Your Order</p>

              <button
                type="button"
                className="rounded bg-orange-400 px-3 py-2 text-sm hover:bg-orange-500 hover:text-white"
                onClick={() => setShow(true)}
              >
                + Add Menu
              </button>

              {show && <AddNewProduct onClose={() => setShow(false)} />}
            </div>

            <CardCheckout
              qty={qty}
              product={product}
              size={size}
              temperature={temperature}
              delivery={formData.delivery}
              finalPrice={finalPrice}
            />

            <div className="mt-8">
              <PaymentInfoDelivery
                formData={formData}
                setFormData={setFormData}
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="sticky top-20">
            <p className="p-1 text-xl font-semibold">Total</p>

            <div className="mt-4 rounded-lg bg-gray-50 p-4">
              <div className="flex justify-between py-1">
                <p>Order</p>
                <p className="font-bold">
                  Idr. {order.toLocaleString("id-ID")}
                </p>
              </div>

              <div className="flex justify-between py-1">
                <p>Delivery</p>
                <p className="font-bold">
                  Idr. {deliveryPrice.toLocaleString("id-ID")}
                </p>
              </div>

              <div className="flex justify-between py-1">
                <p>Tax</p>
                <p className="font-bold">Idr. {tax.toLocaleString("id-ID")}</p>
              </div>

              <div className="my-3 h-px bg-gray-200" />

              <div className="flex justify-between">
                <p>Subtotal</p>
                <p className="font-bold">
                  Idr. {subtotal.toLocaleString("id-ID")}
                </p>
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-lg bg-orange-500 py-3 font-semibold text-white"
              >
                Checkout
              </button>
              <div className="py-4 font-light">
                <PaymentType />
              </div>
            </div>
          </div>
        </section>
      </form>
    </main>
  );
}
