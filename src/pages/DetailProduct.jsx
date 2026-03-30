import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import Star from "../assets/home/Star.svg";

import Pagination from "../components/product/Pagination";
import RightSection from "../components/detail-product/RightSection";
import http from "../lib/http";

export default function DetailProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  // ===== STATE =====
  const [product, setProduct] = React.useState({});
  const [products, setProducts] = React.useState([]);

  const [pcsProduct, setPcsProduct] = React.useState(1);
  const [size, setSize] = React.useState("Regular");
  const [temperature, setTemperature] = React.useState("Hot");

  // ===== FETCH DETAIL =====
  React.useEffect(() => {
    (async () => {
      const res = await http(`/admin/products/${id}`);
      const data = await res.json();
      console.log(data.result);
      setProduct(data.result);
    })();
  }, [id]);

  // ===== FETCH RECOMMENDATION =====
  React.useEffect(() => {
    (async () => {
      const res = await http(`/admin/products?page=${page}`);
      const data = await res.json();
      console.log(data.result)
      setProducts(data.result || []);
    })();
  }, [page]);

  // ===== PAGINATION =====
  const itemsPerPage = 4;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const currentProducts = products.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

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

    navigate(
      `/checkout-product/${id}?qty=${pcsProduct}&size=${size}&temperature=${temperature}`,
    );
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
  const images = product?.images || [];

  React.useEffect(() => {
  const sizeParam = searchParams.get("size");
  const tempParam = searchParams.get("temperature");
  const qtyParam = searchParams.get("qty");

  if (sizeParam) setSize(sizeParam);
  if (tempParam) setTemperature(tempParam);
  if (qtyParam) setPcsProduct(Number(qtyParam));
}, [searchParams]);

  return (
    <main>
      {/* ===== DETAIL ===== */}
      <section className="mt-20 grid grid-cols-2 gap-10 p-20">
        <div>
          <img
            src={images[0]}
            alt={product?.name}
            className="aspect-4/3 w-full rounded-lg object-center"
          />

          <div className="mt-4 grid grid-cols-3 gap-4">
            {images.slice(1, 4).map((img, i) => (
              <img key={i} src={img} alt={product?.name} />
            ))}
          </div>
        </div>

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
        <div className="grid grid-cols-4 gap-6">
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
