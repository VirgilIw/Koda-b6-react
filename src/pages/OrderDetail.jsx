import { useParams } from "react-router";
import { useSelector } from "react-redux";
import React from "react";
import http from "../lib/http";

export default function OrderDetail() {
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);

  const [order, setOrder] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!token || !id) return;

    (async () => {
      try {
        const res = await http(`/transactions/${id}`, null, {
          method: "GET",
          token,
        });

        if (!res.ok) throw new Error("Failed fetch");

        const data = await res.json();
        console.log(data);
        setOrder(data.result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, token]);

  if (loading) {
    return <p className="mt-20 text-center">Loading...</p>;
  }

  if (!order) {
    return <p className="mt-20 text-center">Order tidak ditemukan</p>;
  }

  return (
    <main className="mx-auto mt-24 max-w-7xl px-20 py-20">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl">
          Order <span className="font-bold">{order.transaction_code}</span>
        </h1>

        <p className="mt-2 text-gray-500">
          {new Date(order.created_at).toLocaleString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* LEFT */}
        <div>
          <h2 className="mb-6 text-xl font-semibold">Order Information</h2>

          <div className="space-y-6 rounded-lg border p-6">
            <InfoRow label="Full Name" value={order.full_name || "-"} />
            <InfoRow label="Address" value={order.address || "-"} />
            <InfoRow label="Phone" value={order.phone || "-"} />
            <InfoRow
              label="Payment Method"
              value={order.payment_method || "-"}
            />
            <InfoRow label="Shipping" value={order.delivery_method || "-"} />

            <div className="flex justify-between pt-4">
              <p className="text-gray-500">Status</p>
              <span className="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-500">
                {order.status}
              </span>
            </div>

            <div className="flex justify-between border-t pt-4 font-semibold">
              <p>Total Transaksi</p>
              <p className="text-orange-500">
                IDR {order.total_price?.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <h2 className="mb-6 text-xl font-semibold">Your Order</h2>

          <div className="space-y-5">
            {order.items?.map((item, index) => (
              <div key={index} className="flex gap-5 rounded-lg border p-4">
                <img
                  src={item.product_image || "/coffee.png"}
                  alt=""
                  className="h-24 w-24 rounded object-cover"
                />

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <span className="rounded-full bg-red-500 px-2 py-1 text-xs text-white">
                      FLASH SALE!
                    </span>

                    <h3 className="mt-2 font-semibold">{item.product?.name}</h3>

                    <p className="text-sm text-gray-500">
                      {item.qty} pcs | {item.size} | {item.temperature} |{" "}
                      {order.delivery_method}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <p className="font-semibold text-orange-500">
                      IDR {item.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* fallback kalau kosong */}
            {order.items?.length === 0 && (
              <p className="text-gray-500">Tidak ada item</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between border-b pb-3">
      <p className="text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
