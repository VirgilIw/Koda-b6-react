import React from "react";
import { useSearchParams } from "react-router";

const CATEGORIES = [
  "favorite-product",
  "coffee",
  "non-coffee",
  "foods",
  "add-on",
];
const SORT_OPTIONS = ["priciest", "cheapest", "recommended", "latest"];

export default function FormProduct() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = React.useState(false);

  // State dari URL params
  const [search, setSearch] = React.useState(searchParams.get("search") || "");
  const [selectedCategories, setSelectedCategories] = React.useState(
    searchParams.get("categories")?.split(",") || [],
  );
  const [selectedSort, setSelectedSort] = React.useState(
    searchParams.get("sort") || "",
  );
  const [range, setRange] = React.useState({
    min: Number(searchParams.get("minPrice")) || 2000,
    max: Number(searchParams.get("maxPrice")) || 100000,
  });

  // Handle category toggle
  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  // Handle sort toggle
  const toggleSort = (sort) => {
    setSelectedSort((prev) => (prev === sort ? "" : sort));
  };

  // Handle range
  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    setRange((prev) => ({ ...prev, min: Math.min(value, prev.max - 1000) }));
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    setRange((prev) => ({ ...prev, max: Math.max(value, prev.min + 1000) }));
  };

  // Apply filter → set ke URL params
  const handleApply = (e) => {
    e.preventDefault();

    const params = {};
    if (search) params.search = search;
    if (selectedCategories.length > 0)
      params.categories = selectedCategories.join(",");
    if (selectedSort) params.sort = selectedSort;
    if (range.min !== 2000) params.minPrice = range.min;
    if (range.max !== 100000) params.maxPrice = range.max;

    setSearchParams(params);
  };

  // Reset filter → hapus semua params
  const handleReset = () => {
    setSearch("");
    setSelectedCategories([]);
    setSelectedSort("");
    setRange({ min: 2000, max: 100000 });
    setSearchParams({});
  };

  return (
    <>
      {/* TOGGLE BUTTON - hanya muncul di mobile */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-400 px-5 py-3 font-semibold text-black shadow-md transition hover:bg-orange-500 md:hidden"
      >
        {isOpen ? "Hide Filter" : "Show Filter"}
      </button>

      {/* ASIDE */}
      <aside
        className={`h-[105vh] rounded-2xl bg-black p-6 text-white md:block ${isOpen ? "block" : "hidden"}`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filter</h2>
          <button
            type="button"
            onClick={handleReset}
            className="text-sm transition-colors hover:text-orange-400"
          >
            Reset Filter
          </button>
        </div>

        <form className="space-y-6 pt-4" onSubmit={handleApply}>
          {/* SEARCH */}
          <div className="flex flex-col gap-1">
            <label htmlFor="search" className="text-sm font-medium">
              Search
            </label>
            <input
              type="text"
              id="search"
              autoComplete="off"
              placeholder="Search Your Product"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded bg-white px-4 py-3 text-black focus:outline-none"
            />
          </div>

          {/* CATEGORY */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-bold tracking-widest uppercase opacity-60">
              Category
            </p>
            {CATEGORIES.map((cat) => (
              <label
                key={cat}
                className="group flex cursor-pointer items-center gap-3"
              >
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    className="peer h-5 w-5 appearance-none rounded-md border-2 border-white/20 shadow-sm transition-all checked:border-orange-400 checked:bg-orange-400 focus:ring-1 focus:ring-orange-400"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                  />
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    ✓
                  </div>
                </div>
                <span className="text-sm font-medium opacity-80 transition-opacity group-hover:opacity-100">
                  {cat}
                </span>
              </label>
            ))}
          </div>

          {/* SORT BY */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-bold tracking-widest uppercase opacity-60">
              Sort By
            </p>
            {SORT_OPTIONS.map((sort) => (
              <label
                key={sort}
                className="group flex cursor-pointer items-center gap-3"
              >
                <div className="relative flex items-center">
                  <input
                    type="radio"
                    name="sortBy"
                    className="peer h-5 w-5 appearance-none rounded-md border-2 border-white/20 shadow-sm transition-all checked:border-orange-400 checked:bg-orange-400 focus:ring-1 focus:ring-orange-400"
                    checked={selectedSort === sort}
                    onClick={() => toggleSort(sort)}
                    onChange={() => {}}
                  />
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="4"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <span className="text-sm font-medium opacity-80 transition-opacity group-hover:opacity-100">
                  {sort}
                </span>
              </label>
            ))}
          </div>

          {/* RANGE PRICE */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold tracking-widest uppercase opacity-60">
              Range Price
            </h3>
            <div className="relative h-6">
              <div className="absolute top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-white" />
              <div
                className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-orange-400"
                style={{
                  left: `${(range.min / 100000) * 100}%`,
                  right: `${100 - (range.max / 100000) * 100}%`,
                }}
              />
              <input
                type="range"
                min="0"
                max="100000"
                step="1000"
                value={range.min}
                onChange={handleMinChange}
                className="pointer-events-none absolute w-full appearance-none bg-transparent [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow"
              />
              <input
                type="range"
                min="0"
                max="100000"
                step="1000"
                value={range.max}
                onChange={handleMaxChange}
                className="pointer-events-none absolute w-full appearance-none bg-transparent [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow"
              />
            </div>
            <div className="flex justify-between text-sm">
              <p>Rp {range.min.toLocaleString("id-ID")}</p>
              <p>Rp {range.max.toLocaleString("id-ID")}</p>
            </div>
          </div>

          {/* APPLY BUTTON */}
          <button
            type="submit"
            className="w-full rounded-xl bg-orange-400 py-4 font-extrabold text-black shadow-lg transition-all duration-300 hover:bg-orange-500 hover:text-white"
          >
            Apply Filter
          </button>
        </form>
      </aside>
    </>
  );
}
