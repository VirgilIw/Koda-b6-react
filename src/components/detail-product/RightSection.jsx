import React from "react";
import thumb from "../../assets/detail-product/ThumbsUp.svg";
import Star from "../../assets/home/Star.svg";

export default function RightSection({
  handleChangeSize,
  handleChangeTemperature,
  handleDecrement,
  handleIncrement,
  handleSubmit,
  product,
  pcsProduct,
  size,
  temperature,
}) {
  // 🔥 SAFE DATA
  const sizes = product?.sizes || [];
  const sizePrices = product?.size_prices || [];
  const variantPrices = product?.variant_prices || [];

  // 🔥 GET INDEX SIZE
  const sizeIndex = sizes.findIndex((s) => s === size);

  // 🔥 GET INDEX VARIANT
  const variantIndex =
    temperature === "Ice"
      ? 1
      : temperature === "Hot"
      ? 0
      : 0;

  // 🔥 PRICE CALCULATION
  const basePrice = Number(product?.price || 0);
  const sizePrice = sizePrices[sizeIndex] || 0;
  const variantPrice = variantPrices[variantIndex] || 0;

  const finalPrice = basePrice + sizePrice + variantPrice;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-md bg-white px-6 py-6"
    >
      {/* TITLE */}
      <p className="text-3xl font-semibold">
        {product?.name || "Product"}
      </p>

      {/* PRICE */}
      <div className="flex items-center gap-2">
        <p className="text-red-400 line-through">
          IDR {basePrice.toLocaleString("id-ID")}
        </p>

        <p className="text-lg font-semibold text-orange-500">
          IDR {finalPrice.toLocaleString("id-ID")}
        </p>
      </div>

      {/* RATING */}
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <img key={i} src={Star} alt="star" className="h-4 w-4" />
        ))}
        <p>{product?.rating || 0}</p>
      </div>

      {/* REVIEW */}
      <div className="flex">
        <p className="pr-3 text-gray-600">
          {product?.totalReviews || 0}+ Review
        </p>

        {(product?.totalReviews || 0) > 280 && (
          <p className="flex items-center">
            <span className="px-4">|</span> Recommendation
            <img src={thumb} alt="thumb" className="pl-2" />
          </p>
        )}
      </div>

      {/* DESCRIPTION */}
      <p className="text-gray-600">
        {product?.description || "-"}
      </p>

      {/* QUANTITY */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleDecrement}
          className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-orange-400 bg-white text-xl"
        >
          -
        </button>

        <input
          value={pcsProduct}
          readOnly
          className="w-10 text-center text-xl font-semibold outline-none"
        />

        <button
          type="button"
          onClick={handleIncrement}
          className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500 text-xl text-white"
        >
          +
        </button>
      </div>

      {/* SIZE */}
      <div>
        <p className="mb-2 font-semibold">Choose Size</p>
        <div className="grid grid-cols-3 gap-4">
          {sizes.map((item) => (
            <label key={item} className="cursor-pointer">
              <input
                type="radio"
                name="size"
                value={item}
                checked={size === item}
                onChange={handleChangeSize}
                className="peer hidden"
              />
              <div className="rounded-md border border-gray-300 py-3 text-center peer-checked:border-orange-500 peer-checked:bg-orange-50">
                {item}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* HOT / ICE */}
      <div>
        <p className="mb-2 font-semibold">Hot / Ice?</p>
        <div className="grid grid-cols-2 gap-4">
          {["Hot", "Ice"].map((item) => (
            <label key={item} className="cursor-pointer">
              <input
                type="radio"
                name="temperature"
                value={item}
                checked={temperature === item}
                onChange={(e) =>
                  handleChangeTemperature(e.target.value)
                }
                className="peer hidden"
              />
              <div className="rounded-md border border-gray-300 py-3 text-center peer-checked:border-orange-500 peer-checked:bg-orange-50">
                {item}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* BUTTON */}
      <div className="grid grid-cols-2 gap-4 pt-4">
        <button
          type="submit"
          className="rounded bg-orange-500 py-3 font-semibold text-white"
        >
          Buy
        </button>

        <button
          type="button"
          className="rounded border border-orange-500 py-3 text-orange-500"
        >
          Add to Cart
        </button>
      </div>
    </form>
  );
}