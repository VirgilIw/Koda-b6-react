import React, { useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

import { format, startOfWeek, endOfWeek, addWeeks } from "date-fns";

import CupIcon from "../../assets/adminDashboard/CircleWithCup.svg";
import TruckIcon from "../../assets/adminDashboard/TruckWithCup.svg";
import UserIcon from "../../assets/adminDashboard/CircleWithUserIcon.svg";
import ArrowRise from "../../assets/adminDashboard/Arrow-rise.svg";
import Calendar from "../../assets/adminDashboard/Calendar.svg";
import CustomToolTip from "./CustomToolTip";

function ProductChart() {
  const [selectedRange, setSelectedRange] = useState("");

  const handleChangeSales = (event) => {
    const newValue = event.target.value;
    setSelectedRange(newValue);
    updateUrlQueryParam("sales-range", "");
    updateUrlQueryParam("sales-range", newValue);
  };

  const handleChangeProduct = (event) => {
    const newValue = event.target.value;
    setSelectedRange(newValue);
    updateUrlQueryParam("product-range", "");
    updateUrlQueryParam("product-range", newValue);
  };

  const updateUrlQueryParam = (key, value) => {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);

    if (window.history.replaceState) {
      window.history.replaceState({ path: url.href }, "", url.href);
    }
  };

  const dataPenjualanHarian = [
    { tanggal: "16 Jan", penjualan: 120 },
    { tanggal: "17 Jan", penjualan: 200 },
    { tanggal: "18 Jan", penjualan: 180 },
    { tanggal: "19 Jan", penjualan: 240 },
    { tanggal: "20 Jan", penjualan: 160 },
    { tanggal: "21 Jan", penjualan: 220 },
    { tanggal: "22 Jan", penjualan: 280 },
    { tanggal: "23 Jan", penjualan: 190 },
  ];

  const produkTerlaris = [
    { no: 1, nama: "Caramel Machiatto", terjual: 300, keuntungan: 9000000 },
    { no: 2, nama: "Hazelnut Latte", terjual: 200, keuntungan: 8000000 },
    { no: 3, nama: "Kopi Susu", terjual: 100, keuntungan: 7000000 },
    { no: 4, nama: "Espresso Supreme", terjual: 90, keuntungan: 6000000 },
    { no: 5, nama: "Caramel Velvet Latte", terjual: 80, keuntungan: 5000000 },
    { no: 6, nama: "Hazelnut Dream Brew", terjual: 70, keuntungan: 4000000 },
    { no: 7, nama: "Vanilla Silk Mocha", terjual: 60, keuntungan: 3000000 },
    { no: 8, nama: "Dark Roast Delight", terjual: 50, keuntungan: 2000000 },
    {
      no: 9,
      nama: "Ethiopian Yirgacheffe Euphoria",
      terjual: 40,
      keuntungan: 1000000,
    },
    {
      no: 10,
      nama: "Indonesian Sumatra Reserve",
      terjual: 30,
      keuntungan: 500000,
    },
  ];

  const formatRupiah = (angka) => {
    return `IDR ${angka.toLocaleString("id-ID")}`;
  };

  const formatCup = (angka) => {
    return `${angka}c`;
  };

  const totalPenjualan = dataPenjualanHarian.reduce(
    (total, item) => total + item.penjualan,
    0,
  );

  const generateWeeklyRanges = () => {
    const ranges = [];
    const today = new Date();
    let currentWeekStart = startOfWeek(today, { weekStartsOn: 0 });

    for (let i = 0; i < 4; i++) {
      const weekStart = addWeeks(currentWeekStart, -i);
      const weekEnd = endOfWeek(weekStart, { weekStartsOn: 0 });

      const startFormat = "dd MMM";
      const endFormat =
        weekStart.getMonth() === weekEnd.getMonth() ? "dd" : "dd MMM";

      const label = `${format(weekStart, startFormat)} - ${format(weekEnd, endFormat)}`;
      const value = `${format(weekStart, "yyyy-MM-dd")} to ${format(weekEnd, "yyyy-MM-dd")}`;

      ranges.unshift({ label, value });
    }
    return ranges;
  };

  const weeklyRanges = generateWeeklyRanges();

  return (
    <div className="min-w-150 p-5">
      <div className="grid grid-cols-3 gap-4 overflow-x-scroll whitespace-nowrap text-white">
        <div className="flex flex-col justify-center gap-2 rounded-lg border-0 bg-green-700 p-4">
          <div className="flex items-center gap-2">
            <div>
              <img src={CupIcon} alt="cup-icon" />
            </div>
            <div>
              <p>Order On Progress</p>
            </div>
          </div>
          <div>
            <p>
              200
              <span>
                +11.01%
                <img
                  className="inline w-fit"
                  src={ArrowRise}
                  alt="arrow-rise"
                />
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-2 rounded-lg border-0 bg-blue-800 p-4">
          <div className="flex items-center gap-2">
            <div>
              <img src={TruckIcon} alt="truck-icon" />
            </div>
            <div>
              <p>Order Shipping</p>
            </div>
          </div>
          <div>
            <p>
              100
              <span>
                +4.01%
                <img
                  className="inline w-fit"
                  src={ArrowRise}
                  alt="arrow-rise"
                />
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-2 rounded-lg border-0 bg-violet-800 p-4">
          <div className="flex items-center gap-2">
            <div>
              <img src={UserIcon} alt="user-icon" />
            </div>
            <div>
              <p>Order Done</p>
            </div>
          </div>
          <div>
            <p>
              50
              <span>
                +2.01%
                <img
                  className="inline w-fit"
                  src={ArrowRise}
                  alt="arrow-rise"
                />
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="mx-auto max-w-7xl">
          {/* Bagian Grafik Penjualan */}
          <div className="mb-8 rounded-xl bg-white p-6 shadow-md">
            <div className="mb-6 flex flex-col items-start justify-between md:flex-row md:items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Total Penjualan
                </h2>
                <p className="text-gray-600">
                  {totalPenjualan} Cup ({selectedRange})
                </p>
              </div>
              <div className="flex flex-col">
                <div className="mx-auto mt-1 flex w-full max-w-sm items-center gap-3 rounded-md border-gray-300 p-4 py-2 pr-10 pl-3 text-base shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm">
                  <div>
                    <img src={Calendar} alt="calendar-icon" />
                  </div>
                  <select
                    id="dateRange"
                    name="dateRange"
                    value={selectedRange}
                    onChange={handleChangeSales}
                    className="mt-1 block w-full sm:text-sm"
                  >
                    <option value="">-- Select a range --</option>
                    {weeklyRanges.map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-2 md:mt-0">
                  <div className="rounded-lg bg-green-50 px-4 py-2 font-medium text-green-700">
                    Total:
                    <span className="font-bold">{totalPenjualan} Cup</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-72 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={dataPenjualanHarian}
                  margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
                >
                  <defs>
                    {/* Gradien untuk area di bawah garis */}
                    <linearGradient
                      id="colorPenjualan"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                    {/* Gradien untuk background abu-abu */}
                    <linearGradient
                      id="colorGreyArea"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#F3F4F6" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#F3F4F6"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5E7EB"
                    vertical={false}
                    horizontal={true}
                  />
                  <XAxis
                    dataKey="tanggal"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6B7280", fontSize: 14 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6B7280", fontSize: 14 }}
                    ticks={[50, 100, 150, 200, 250, 300]}
                    tickFormatter={formatCup}
                    domain={[0, 300]}
                  />
                  <Tooltip content={<CustomToolTip />} />

                  {/* Area dengan gradasi abu-abu di bawah */}
                  <Area
                    type="monotone"
                    dataKey="penjualan"
                    stroke="none"
                    fill="url(#colorGreyArea)"
                    fillOpacity={1}
                  />

                  {/* Line chart utama dengan gradasi hijau di bawahnya */}
                  <Area
                    type="monotone"
                    dataKey="penjualan"
                    stroke="#10B981"
                    strokeWidth={3}
                    fill="url(#colorPenjualan)"
                    fillOpacity={0.8}
                    dot={{
                      r: 4,
                      fill: "#10B981",
                      strokeWidth: 2,
                      stroke: "#fff",
                    }}
                    activeDot={{
                      r: 6,
                      fill: "#10B981",
                      strokeWidth: 2,
                      stroke: "#fff",
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bagian Tabel Produk Terlaris */}
          <div className="rounded-xl bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex h-20 w-full flex-1 items-center justify-start p-3">
                <h2 className="text-center text-xl font-bold text-gray-800">
                  Produk Terlaris
                </h2>
              </div>
              <div className="flex w-fit items-end justify-end gap-3 rounded-md border-gray-300 p-3 text-base shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm">
                <div>
                  <img src={Calendar} alt="calendar-icon" />
                </div>
                <select
                  id="dateRange"
                  name="dateRange"
                  value={selectedRange}
                  onChange={handleChangeProduct}
                  className="mt-1 block w-fit sm:text-sm"
                >
                  <option value="">-- Select a range --</option>
                  {weeklyRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      No
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Nama Produk
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Terjual
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Keuntungan
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {produkTerlaris.map((produk) => (
                    <tr key={produk.no} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap text-gray-800">
                        {produk.no}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800">
                        {produk.nama}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap text-gray-800">
                        {produk.terjual} Cup
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap text-gray-800">
                        {formatRupiah(produk.keuntungan)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductChart;
