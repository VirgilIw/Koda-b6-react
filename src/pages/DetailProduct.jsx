import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import useFetch from "../hooks/useFetch";
import Star from "../assets/home/Star.svg";

import Pagination from "../components/product/Pagination";
import RightSection from "../components/detail-product/RightSection";

export default function DetailProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const [pcsProduct, setPcsProduct] = React.useState(1);
  const [size, setSize] = React.useState("Regular");
  const [temperature, setTemperature] = React.useState("Ice");

  const data = useFetch("/product.json");

  // WAIT DATA FIRST
  if (!data) return <p className="p-10">Loading...</p>;

  const limit = 3;
  const products = [...data.products];

  // ===== DETAIL PRODUCT =====
  const product = products.find((item) => item.id === Number(id));

  if (!product) return <p>Product not found</p>;

  // ===== RECOMMENDATION PAGINATION =====
  const totalData = products.length;
  const totalPages = Math.ceil(totalData / limit);
  const startIndex = (page - 1) * limit;
  const currentProducts = products.slice(startIndex, startIndex + limit);

  // ===== PARAM HELPER =====
  const updateParams = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  // ===== QTY =====
  const handleIncrement = () => {
    setPcsProduct((prev) => {
      const newQty = prev + 1;
      updateParams("qty", newQty);
      return newQty;
    });
  };

  const handleDecrement = () => {
    setPcsProduct((prev) => {
      const newQty = Math.max(1, prev - 1);
      updateParams("qty", newQty);
      return newQty;
    });
  };

  // ===== FORM =====
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      productId: product.id,
      qty: pcsProduct,
      size,
      temperature,
    };
    navigate(
      `/checkout-product/${id}?qty=${pcsProduct}&size=${size}&temperature=${temperature}`,
    );

    console.log("BUY DATA:", payload);
  };

  const handleChangeSize = (e) => {
    const value = e.target.value;
    setSize(value);
    updateParams("size", value);
  };

  const handleChangeTemperature = (value) => {
    setTemperature(value);
    updateParams("temperature", value);
  };

  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage);
    setSearchParams(newParams);

    window.scrollTo({ top: 800, behavior: "smooth" });
  };

  return (
    <main>
      {/* ===== DETAIL SECTION ===== */}
      <section className="mt-20 grid grid-cols-2 gap-10 p-20">
        {/* LEFT IMAGE */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="aspect-4/3 w-full rounded-lg object-cover"
          />

          <div className="mt-4 grid grid-cols-3 gap-4">
            {[1, 2, 3].map((_, i) => (
              <img
                key={i}
                src={product.image}
                alt={product.name}
                className="aspect-square w-full rounded-md object-cover"
              />
            ))}
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <RightSection
          handleChangeSize={handleChangeSize}
          handleChangeTemperature={handleChangeTemperature}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
          handleSubmit={handleSubmit}
          product={product}
          pcsProduct={pcsProduct}
          size={size}
          temperature={temperature}
        />
      </section>

      {/* ===== RECOMMENDATION ===== */}
      <section className="px-20">
        <div className="flex gap-4">
          {currentProducts.map((item) => (
            <div key={item.id}>
              <img
                src={item.image}
                alt={item.name}
                className="h-96 w-full rounded-lg object-cover"
              />

              <div className="relative z-2 mx-auto -mt-20 w-[90%] rounded-md bg-white p-4 shadow">
                <p className="text-2xl font-semibold">{item.name}</p>
                <p className="line-clamp-2">{item.description}</p>

                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <img key={i} src={Star} alt="star" />
                  ))}
                  <p>{item.rating}</p>
                </div>

                <button className="mt-2 w-full rounded bg-orange-400 py-2">
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-10 flex justify-center pb-10">
            <Pagination
              page={page}
              setPage={handlePageChange}
              totalPages={totalPages}
            />
          </div>
        )}
      </section>
    </main>
  );
}
