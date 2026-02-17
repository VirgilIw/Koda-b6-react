import React from "react";
import { useSearchParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import Pagination from "./Pagination";

export default function MenuProduct() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Ambil semua params dari URL
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const categories =
    searchParams.get("categories")?.split(",").filter(Boolean) || [];
  const sort = searchParams.get("sort") || "";
  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || 100000;

  const data = useFetch("/product.json");
  const limit = 6;

  if (!data) return <p className="p-4">Loading...</p>;

  // 1. COPY DATA
  let products = [...data.products];

  // 2. FILTER SEARCH
  if (search) {
    products = products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()),
    );
  }

  // 3. FILTER CATEGORY
  if (categories.length > 0) {
    products = products.filter((p) => {
      return categories.some((cat) => {
        if (cat === "favorite-product") {
          return p.rating >= 4.8; // anggap favorite kalau rating >= 4
        } else if (cat === "coffe") {
          return p.categoriy === "coffe";
        } else if (cat === "non-coffe") {
          return p.category === "non-coffe";
        }
        return p.category?.toLowerCase() === cat.toLowerCase();
      });
    });
  }

  // 4. FILTER RANGE PRICE
  products = products.filter((p) => p.price >= minPrice && p.price <= maxPrice);

  // 5. SORT
  if (sort === "cheapest") {
    products = products.sort((a, b) => a.price - b.price);
  } else if (sort === "priciest") {
    products = products.sort((a, b) => b.price - a.price);
  } else if (sort === "latest") {
    products = products.sort((a, b) => b.id - a.id);
  } else if (sort === "recommended") {
    products = products.sort((a, b) => a.id - b.id); // default order
  }

  // 6. PAGINATION (SETELAH FILTER & SORT)
  const totalData = products.length;
  const totalPages = Math.ceil(totalData / limit);
  const startIndex = (page - 1) * limit;
  const currentProducts = products.slice(startIndex, startIndex + limit);

  // 7. UPDATE PAGE PARAM
  const handlePageChange = (newPage) => {
    searchParams.set("page", newPage);
    setSearchParams(searchParams);
    window.scrollTo({ top: 600, behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      {/* INFO FILTER AKTIF */}
      {(search || categories.length > 0 || sort) && (
        <div className="flex items-center flex-wrap gap-2 text-sm text-gray-600">
          {search && (
            <span className="rounded-full bg-orange-100 px-3 py-1 text-orange-700">
              Search: "{search}"
            </span>
          )}
          {categories.map((cat) => (
            <span
              key={cat}
              className="rounded-full bg-orange-100 px-3 py-1 text-orange-700"
            >
              {cat}
            </span>
          ))}
          {sort && (
            <span className="rounded-full bg-orange-100 px-3 py-1 text-orange-700">
              Sort: {sort}
            </span>
          )}
          <span className="text-gray-400">({totalData} products found)</span>
        </div>
      )}

      {/* GRID PRODUCT */}
      {currentProducts.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-gray-400">
          <p className="text-lg font-semibold">No products found</p>
          <p className="text-sm">Try adjusting your filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {currentProducts.map((item) => (
            <div key={item.id}>
              <img
                src={item.image}
                alt={item.name}
                className="h-96 w-full rounded-lg object-cover"
              />
              <p className="mt-2 font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">
                Rp {item.price.toLocaleString("id-ID")}
              </p>
              <p>{item.rating}</p>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center pb-10">
          <Pagination
            page={page}
            setPage={handlePageChange}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
}
