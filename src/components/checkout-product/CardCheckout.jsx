import React from "react";

export default function CardCheckout({
  qty,
  product,
  size,
  temperature,
  delivery,
}) {
  return (
    <>
      <section className="mt-4 grid h-60 grid-cols-[30%_50%_20%] rounded-lg bg-gray-50 p-3">
        <img
          src={product.image}
          alt={product.name}
          className="aspect-square w-55 rounded object-cover"
        />

        <div className="flex flex-col justify-center">
          <p className="px-3 text-2xl font-semibold">{product.name}</p>

          <div className="flex items-center divide-x py-2 text-sm text-gray-500">
            <p className="px-3">{qty} pcs</p>
            <p className="px-3">{size}</p>
            <p className="px-3">{temperature}</p>
            <p className="px-3">{delivery}</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2">
            <p className="text-red-400 line-through">
              {product.price >= 25000 ? "IDR 30000" : "IDR 25000"}
            </p>
            <p className="text-2xl text-orange-400">IDR. {product.price}</p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <button className="ml-20 flex h-6 w-6 items-center justify-center rounded-full border-2 border-red-400 text-xs leading-none font-bold text-red-400 hover:bg-red-400 hover:text-white">
            ×
          </button>
        </div>
      </section>
    </>
  );
}
