import { useParams } from "react-router";
import { useSelector } from "react-redux";

export default function OrderDetail() {
  const { id } = useParams();
  const { orders } = useSelector((state) => state.order);

  const order = orders?.find((o) => o.orderId === String(id));
  console.log(order);

  if (!order) {
    return <p className="mt-20 text-center">Order tidak ditemukan</p>;
  }

  return (
    <main className="mx-auto mt-24 max-w-7xl px-20 py-20">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl">
          Order <span className="font-bold">#{order.orderId}</span>
        </h1>
        <p className="mt-2 text-gray-500">{order.createdAt}</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div>
          <h2 className="mb-6 text-xl font-semibold">Order Information</h2>

          <div className="space-y-6 rounded-lg border p-6">
            <InfoRow label="Full Name" value={order.dataForm.fullName} />
            <InfoRow label="Address" value={order.dataForm.address} />
            <InfoRow label="Phone" value={"082116304338"} />
            <InfoRow label="Payment Method" value={"cash"} />
            <InfoRow label="Shipping" value={order.dataForm.delivery} />

            <div className="flex justify-between pt-4">
              <p className="text-gray-500">Status</p>
              <span className="rounded-full px-3 py-1 text-sm text-green-600">
                {order.status}
              </span>
            </div>

            <div className="flex justify-between border-t pt-4 font-semibold">
              <p>Total Transaksi</p>
              <p className="text-orange-500">IDR {order.subtotal}</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <h2 className="mb-6 text-xl font-semibold">Your Order</h2>

          <div className="space-y-5">
            {order.items.map((item, index) => (
              <div key={index} className="flex gap-5 rounded-lg border p-4">
                <img
                  src={item.product.image}
                  alt=""
                  className="h-24 w-24 rounded object-cover"
                />

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <span className="rounded-full bg-red-500 px-2 py-1 text-xs text-white">
                      FLASH SALE!
                    </span>

                    <h3 className="mt-2 font-semibold">{item.product.name}</h3>

                    <p className="text-sm text-gray-500">
                      {item.qty}pcs | {item.size} | {item.temperature} | {order.dataForm.delivery}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <p className="font-semibold text-orange-500">
                      IDR {item.product.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
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
