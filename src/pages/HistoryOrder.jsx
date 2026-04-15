import React from "react";
import ChatWindow from "../components/ui/ChatWindow";
import Calendar from "../assets/Order/Calendar.svg";
import Message from "../assets/Order/Message.svg";
import ArrowRight from "../assets/home/arrow-right.png";
import http from "../lib/http";
import { useSelector } from "react-redux";
import { Link } from "react-router";

export default function HistoryOrder() {
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const [transactions, setTransactions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const token = useSelector((state) => state.auth.token);

  React.useEffect(() => {
    if (!token) return;

    (async () => {
      try {
        const res = await http("/transactions", null, {
          method: "GET",
          token: token,
        });

        if (!res.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const data = await res.json();
        console.log(data)
        setTransactions(data.result || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-10 lg:px-16 xl:px-24">
      {/* HEADER */}
      <div>
        <h1 className="mt-24 flex gap-3 text-3xl font-medium md:text-5xl">
          History Order
          <span className="bg-[#E8E8E8] p-3 px-5 text-xl">
            {transactions.length}
          </span>
        </h1>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* LEFT */}
        <div className="lg:col-span-2">
          {/* FILTER */}
          <div className="mb-8 flex flex-col-reverse justify-between gap-5 md:flex-row">
            <div className="flex gap-1 rounded-lg bg-[#E8E8E899] p-1">
              <button className="rounded-md bg-white px-4 py-2 text-sm font-bold">
                On Progress
              </button>
              <button className="px-4 py-2 text-sm text-gray-400">
                Sending Goods
              </button>
              <button className="px-4 py-2 text-sm text-gray-400">
                Finish Order
              </button>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-[#E8E8E899] p-2 px-4">
              <img src={Calendar} alt="Calendar" className="h-4 w-4" />
              <select className="bg-transparent text-sm outline-none">
                <option>April 2026</option>
              </select>
            </div>
          </div>

          {/* LIST */}
          <div className="space-y-4">
            {loading && <p>Loading...</p>}

            {!loading && transactions.length === 0 && (
              <p>No transactions found</p>
            )}

            {transactions.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg bg-[#F8F8F8] p-4 shadow-sm"
              >
                {/* LEFT */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image_path || "/coffee.png"}
                    alt="product"
                    className="h-16 w-16 rounded-md object-cover"
                  />

                  <div className="text-sm">
                    <p className="font-semibold text-gray-600">No. Order</p>
                    <p className="font-bold text-gray-900">
                      {item.transaction_code}
                    </p>

                    <Link to={item.id ? `/detail-order/${item.id}` : "#"}>
                      View Order Detail
                    </Link>
                  </div>
                </div>

                {/* DATE */}
                <div className="text-sm text-gray-600">
                  <p className="font-semibold">Date</p>
                  <p>
                    {new Date(item.created_at).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                {/* TOTAL */}
                <div className="text-sm text-gray-600">
                  <p className="font-semibold">Total</p>
                  <p>Idr {item.total_price?.toLocaleString("id-ID")}</p>
                </div>

                {/* STATUS */}
                <div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      item.status === "on_progress"
                        ? "bg-orange-100 text-orange-500"
                        : item.status === "completed"
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="mt-12 mb-8 flex justify-center gap-3">
            {[1, 2, 3].map((page) => (
              <button key={page} className="h-10 w-10 rounded-full bg-gray-200">
                {page}
              </button>
            ))}
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-400">
              <img src={ArrowRight} alt="Next" className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <div className="sticky top-10 rounded-md border p-8">
            <div className="mb-4 flex items-center gap-3">
              <img src={Message} alt="Message" className="h-8 w-8" />
              <p className="text-xl font-bold">Send Us Message</p>
            </div>

            <p className="mb-6 text-sm">
              If you can't find your order, contact us.
            </p>

            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="w-full rounded-md bg-orange-400 px-6 py-3 text-white"
            >
              Send Message
            </button>

            <ChatWindow
              isOpen={isChatOpen}
              onClose={() => setIsChatOpen(false)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
