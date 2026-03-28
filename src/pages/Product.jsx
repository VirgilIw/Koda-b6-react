import React from "react";
// import products from "../../public/product.json";
import BgCoffee from "../assets/product/bg-coffee.jpg";
import ArrowLeft from "../assets/home/arrow-left.png";
import ArrowRight from "../assets/home/arrow-right.png";
import Coupon from "../components/product/Coupon";
import yellowKupon from "../assets/product/yellow-coupon.png";
import FormProduct from "../components/product/FormProduct";
import MenuProduct from "../components/product/MenuProduct";
import Pagination from "../components/product/Pagination";
import { useNavigate } from "react-router";

export default function Product() {
  const navigate = useNavigate();

  const handleBuy = (id) => {
    navigate(`/product/${id}`)
  };

  return (
    <>
      {/* HERO */}
      <section className="relative">
        <img
          src={BgCoffee}
          alt="bg-coffe"
          className="h-75 w-full object-cover lg:h-100"
        />
        <h1 className="absolute inset-0 top-30 flex items-center px-6 text-2xl font-bold text-white lg:top-0 lg:px-20 lg:text-5xl">
          <div>
            We Provide Good Coffee and Healthy
            <span className="block">Meals</span>
          </div>
        </h1>
      </section>

      {/* PROMO TITLE */}
      <section className="mt-10 flex flex-col gap-4 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-20">
        <h2 className="text-3xl font-semibold lg:text-5xl">
          Today <span className="text-[#8E6447]">Promo</span>
        </h2>
        <div className="flex gap-4">
          <button className="group flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-110 hover:bg-orange-400">
            <img
              src={ArrowLeft}
              alt="Arrow Left"
              className="h-4 w-4 group-hover:invert"
            />
          </button>
          <button className="group flex h-12 w-12 items-center justify-center rounded-full bg-orange-400 shadow-lg transition hover:scale-110 hover:bg-white">
            <img src={ArrowRight} alt="Arrow Right" className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* COUPONS */}
      <section className="mt-6 flex flex-col items-stretch gap-4 px-6 lg:flex-row">
        {[1, 2, 3].map((item) => (
          <Coupon key={item} />
        ))}
        <div className="flex w-full items-center rounded-4xl bg-[#F5C361] px-4 lg:w-[25vw]">
          <img
            src={yellowKupon}
            alt="yellow-coupon"
            className="relative top-1 h-[15vh] shrink-0"
          />
          <div className="flex flex-col gap-2 text-sm">
            <p className="font-bold">
              Get a cup of coffee for free on sunday morning
              <span className="block font-light">Only at 7 to 9 AM</span>
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="mt-16 px-6 lg:px-20">
        <div>
          <h2 className="text-5xl font-semibold">
            Our <span className="text-[#8E6447]">Product</span>
          </h2>
        </div>
        <div className="mt-4 grid grid-cols-[30%_70%] gap-4">
          <FormProduct />
          <MenuProduct handleBuy={handleBuy}/>
        </div>
      </section>
    </>
  );
}
