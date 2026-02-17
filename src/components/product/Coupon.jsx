import React from "react";
import greenKupon from "../../assets/product/green-coupon.png";

export default function Coupon() {
  return (
    <div className="flex w-full items-center rounded-4xl bg-[#88B788] px-4 lg:w-[25vw]">
      <img
        src={greenKupon}
        alt="green-coupon"
        className="relative top-1 h-[15vh] shrink-0"
      />
      <div className="flex flex-col gap-2 text-sm">
        <p className="font-semibold">
          HAPPY MOTHER'S DAY!
          <span className="block font-medium">Get one of our favorite menu</span>
        </p>
        <p>for free !</p>
        <button className="flex justify-start text-white hover:text-orange-400">Klaim Kupon</button>
      </div>
    </div>
  );
}