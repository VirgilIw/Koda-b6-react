import React from "react";
import { useSearchParams } from "react-router";
import Pagination from "./Pagination";
import Star from "../../assets/home/Star.svg";
import http from "../../lib/http";
import Cart from "./Cart";

export default function MenuProduct({ handleBuy }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [data, setData] = React.useState([]);
  const [totalPages, setTotalPages] = React.useState(1);
  const [loading, setLoading] = React.useState(true);

  // GET PARAMS
  const page = Number(searchParams.get("page")) || 1;

  // SET PAGE (update URL)
  function setPage(newPage) {
    if (newPage < 1 || newPage > totalPages) return;
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    setSearchParams(params);
  }

  // FETCH DATA
  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const res = await http(
          `/admin/products/search?${searchParams.toString()}`,
        );

        const json = await res.json();
        setData(json.result || []);
        setTotalPages(json.total_pages || 1);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [searchParams]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!data.length) return <p className="p-4">Produk tidak ditemukan.</p>;

  return (
    <section
      aria-label="Product List"
      className="grid grid-cols-2 gap-x-2 gap-y-3"
    >
      {data.map((item) => (
        <article key={item.id} className="relative rounded">
          {/* Badge */}
          {item.is_flash_sale && (
            <span className="absolute top-2 left-2 m-2 rounded-full bg-red-500 px-2 py-1 text-xs text-white">
              Flash Sale !
            </span>
          )}

          {/* Image */}
          <figure>
            <img
              src={item.images?.[0]}
              alt={`Image of ${item.name}`}
              className="h-68 w-full rounded object-cover"
            />
            <figcaption className="sr-only">{item.name}</figcaption>
          </figure>

          {/* Content */}
          <div className="relative bottom-10 left-5 flex w-11/12 flex-col gap-3 rounded bg-white p-4 shadow">
            <header>
              <h2 className="font-semibold">{item.name}</h2>
              <p className="line-clamp-1 text-sm text-gray-500">
                {item.description}
              </p>
            </header>

            {/* Rating */}
            <section className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <img
                  key={star}
                  src={Star}
                  alt="star"
                  className={`h-3 w-3 ${star > Math.round(item.rating ?? 0) ? "opacity-30" : ""}`}
                />
              ))}
              <p className="text-sm">{(item.rating ?? 0).toFixed(1)}</p>
            </section>

            {/* Price */}
            <footer className="flex items-center gap-2">
              {item.is_flash_sale && (
                <p className="text-red-400 line-through">
                  IDR {item.price.toLocaleString("id-ID")}
                </p>
              )}
              <p className="font-semibold text-orange-400">
                IDR {item.final_price.toLocaleString("id-ID")}
              </p>
            </footer>

            {/* Actions */}
            <div className="grid grid-cols-[1fr_auto] gap-2">
              <button
                className="rounded bg-orange-400 text-white hover:bg-orange-500"
                onClick={()=>handleBuy(item.id)}
              >
                Buy
              </button>
              <Cart />
            </div>
          </div>
        </article>
      ))}

      {/* Pagination */}
      <div className="col-span-2">
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </section>
  );
}
