import React from "react";
import Map from "../../assets/home/HugeGlobal.png";

const MapCoffe = () => {
  return (
    <>
      <section className="bg-[#F8F8F8] py-24">
        <div className="flex justify-center px-4">
          <h2 className="pb-4 text-center text-3xl leading-tight font-bold text-[#0B0909] sm:text-4xl md:text-5xl">
            <span className="text-[#8E6447]">Visit Our Store</span> in the Spot
            on the Map Below
          </h2>
        </div>
        <div className="flex justify-center">
          <div className="w-20 border-b-8 border-orange-500"></div>
        </div>
        <p className="mx-auto mt-10 w-full max-w-2xl px-6 text-center text-[#4F5665] opacity-70">
          You can explore the menu that we provide with fun and have their own
          taste and make your day better.
        </p>
        <div className="mt-16 px-4 sm:px-10 lg:px-24">
          <img
            src={Map}
            alt="Map"
            className="w-full cursor-pointer object-contain grayscale filter transition-all duration-700 hover:grayscale-0"
          />
        </div>
      </section>
    </>
  );
};

export default MapCoffe;
