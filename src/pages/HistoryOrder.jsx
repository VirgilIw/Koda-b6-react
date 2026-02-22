import React from "react";
import ChatWindow from "../components/ui/ChatWindow";
import Calendar from "../assets/Order/Calendar.svg";
import Calendar2 from "../assets/Order/Calendar2.svg";
import Glass from "../assets/Order/glass-tea.svg";
import Repeat from "../assets/Order/Repeat.svg";
import Process from "../assets/Order/process.svg";
import Message from "../assets/Order/Message.svg";
import ArrowRight from "../assets/home/arrow-right.png";
import FoodImage1 from "../assets/home/Food-1.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function HistoryOrder() {
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const { orders } = useSelector((state) => state.order);
  console.log(orders);
  const navigate = useNavigate();

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-10 lg:px-16 xl:px-24">
      <div>
        <h1 className="mt-24 flex gap-3 text-3xl font-medium md:text-5xl">
          History Order
          <span className="bg-[#E8E8E8] p-3 pr-5 pl-5 text-xl">2</span>
        </h1>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Left Column: Orders List */}
        <div className="lg:col-span-2">
          <div className="font-jakarta mb-8 flex flex-col-reverse justify-between gap-5 md:flex-row">
            <div className="flex flex-wrap items-center justify-between gap-1 rounded-lg bg-[#E8E8E899] p-1 sm:justify-start">
              <button className="grow rounded-md bg-white px-4 py-2 text-sm font-bold text-[#3E3E3E] shadow-sm sm:grow-0 sm:px-6 sm:text-base">
                On Progress
              </button>
              <button className="grow px-4 py-2 text-sm font-medium text-[#9F9F9F] transition hover:text-[#3E3E3E] sm:grow-0 sm:px-6 sm:text-base">
                Sending Goods
              </button>
              <button className="grow px-4 py-2 text-sm font-medium text-[#9F9F9F] transition hover:text-[#3E3E3E] sm:grow-0 sm:px-6 sm:text-base">
                Finish Order
              </button>
            </div>
            <div className="flex w-fit cursor-pointer items-center gap-3 rounded-lg bg-[#E8E8E899] p-2 px-4">
              <img
                src={Calendar}
                alt="Calendar Icon"
                className="h-4 w-4 opacity-60"
              />
              <select
                name="Date"
                id="Date"
                className="cursor-pointer bg-transparent text-sm font-medium text-[#3E3E3E] outline-none"
              >
                <option>January 2026</option>
                <option>February 2026</option>
                <option>March 2026</option>
                <option>April 2026</option>
              </select>
            </div>
          </div>

          <div className="space-y-6">
            {orders.map((order, index) => (
              <div
                key={index}
                className="flex flex-col items-start gap-5 rounded-md bg-[#E8E8E84D] p-5 md:flex-row md:items-center"
              >
                <div className="hidden shrink-0 md:block">
                  {order.items.map((item, id) => {
                    return (
                      <div key={id}>
                        <img
                          src={item.product.image}
                          alt="image-history"
                          className="w-25"
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="grid w-full min-w-0 grow grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="flex flex-col">
                    <p className="flex gap-2 text-sm text-[#4F5665]">
                      <img src={Glass} alt="Icon" className="h-4 w-4" /> No.
                      Order
                    </p>
                    <p className="mt-1 text-base font-bold">{order.id}</p>
                    <button
                      className="text-brand-orange mt-1 hidden text-left text-sm font-medium underline hover:text-[#ffad4e] md:block"
                      onClick={() => navigate(`/detail-order/${order.orderId}`)}
                    >
                      View Order Detail
                    </button>
                  </div>
                  <div className="flex flex-col">
                    <p className="flex gap-2 text-sm text-[#4F5665]">
                      <img src={Calendar2} alt="Icon" className="h-4 w-4" />
                      Date
                    </p>
                    <p className="mt-1 text-base font-bold">{order.date}</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="flex gap-2 text-sm text-[#4F5665]">
                      <img src={Repeat} alt="Icon" className="h-4 w-4" /> Total
                    </p>
                    <p className="mt-1 text-base font-bold">{order.total}</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="flex gap-2 text-sm text-[#4F5665]">
                      <img src={Process} alt="Icon" className="h-4 w-4" />
                      Status
                    </p>
                    <p className="text-brand-orange mt-1 w-fit rounded-full bg-[#FF890633] px-3 py-1 text-xs font-semibold">
                      {order.status}
                    </p>
                  </div>
                </div>
                <button
                  className="text-brand-orange mt-1 block text-left text-sm font-medium hover:underline md:hidden"
                  onClick={() => navigate(`/detail-order/${index + 1}`)}
                >
                  View Order Detail
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 mb-8 flex items-center justify-center gap-3">
            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold shadow-sm transition-all sm:h-12 sm:w-12 sm:text-base ${
                  page === 1
                    ? "bg-brand-orange shadow-brand-orange/20 text-white"
                    : "bg-[#E8E8E8] text-[#4F5665] hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            ))}
            <button className="bg-brand-orange shadow-brand-orange/20 flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-all hover:scale-110 sm:h-12 sm:w-12">
              <img src={ArrowRight} alt="Next" className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Send Message */}
        <div className="lg:col-span-1">
          <div className="sticky top-10 flex h-fit flex-col rounded-md border border-[#E8E8E8] p-8">
            <div className="mb-4 flex items-center gap-3">
              <img src={Message} alt="Message Icon" className="h-8 w-8" />
              <p className="text-xl font-bold text-[#4F5665]">
                Send Us Message
              </p>
            </div>

            <p className="mb-6 text-sm leading-6 text-[#4F5665]">
              if your unable to find answer or find your product quickly, please
              describe your problem and tell us. we will give you solution.
            </p>
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="w-full rounded-md bg-orange-400 px-6 py-3 font-medium text-white transition hover:bg-[#ffad4e]"
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
