import React from "react";

export default function CardCheckout({ qty, product, size, temperature }) {
  return (
    <>
      <section className="mt-4 grid grid-cols-[30%_50%_20%] h-60 rounded-lg bg-gray-50 p-3">
        <img
          src={product.image}
          alt={product.name}
          className="aspect-square w-55 rounded object-cover"
        />

        <div className="flex flex-col justify-center">
          <p className="px-3 font-semibold">{product.name}</p>

          <div className="flex items-center divide-x text-sm text-gray-500">
            <p className="px-3">{qty} pcs</p>
            <p className="px-3">{size}</p>
            <p className="px-3">{temperature}</p>
            <p className="px-3">Dine in</p>
          </div>
          <div>
            <p>test</p>
            <p>test</p>
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
