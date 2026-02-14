import React from "react";
import rectangle1 from "../assets/home/rectangle.svg";
import rectangle2 from "../assets/home/right-rectangle.svg";
import person from "../assets/home/person.svg";
import Testimonial from "../components/home/Testimonial";
import MapCoffe from "../components/home/Map";
import ChatFeature from "../components/home/ChatFeature";
import ChatText from "../components/home/ChatText";

export default function Home() {

  return (
    <main>
      <section className="flex h-screen w-full flex-col text-white lg:flex-row">
        {/* LEFT SIDE */}
        <div className="h-full w-full lg:w-1/2">
          <img
            src={rectangle1}
            alt="rectangle"
            className="h-full w-full object-cover"
          />

          {/* content */}
          <div className="absolute inset-0 flex flex-col justify-center px-6 text-center lg:w-1/2 lg:px-20 lg:text-left">
            <p className="text-2xl font-semibold lg:text-4xl">
              Start Your Day with Coffee and Good Meals
            </p>

            <p className="mx-auto mt-4 max-w-lg lg:mx-0">
              We provide high quality beans, good taste, and healthy meals made
              by love just for you. Start your day with us for a bigger smile!
            </p>

            <button className="mx-auto mt-6 w-fit rounded bg-orange-400 px-6 py-3 text-black hover:bg-orange-500 lg:mx-0">
              Get Started
            </button>

            {/* stats */}
            <div className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-4 text-2xl text-orange-400 lg:mx-0 lg:text-4xl">
              <p className="flex flex-col border-r border-white text-center">
                90+
                <span className="text-sm text-white">Staff</span>
              </p>

              <p className="flex flex-col border-r border-white text-center">
                30+
                <span className="text-sm text-white">Stores</span>
              </p>

              <p className="flex flex-col text-center">
                800+
                <span className="text-sm text-white">Customer</span>
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden h-full w-1/2 lg:block">
          <img
            src={rectangle2}
            alt="right-rectangle"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="flex h-screen w-full flex-col lg:flex-row">
        {/* LEFT SIDE */}
        <div className="h-full w-full lg:w-1/2">
          {/* content */}
          <div className="flex items-center bg-white px-6 py-16 lg:px-20">
            <div className="max-w-xl">
              {/* Title */}
              <h1 className="w-[95%] text-4xl font-semibold lg:text-5xl">
                We Provide <span className="text-[#8E6447]">Good Coffee</span>
                <span className="px-2">and</span>
                <span className="text-[#8E6447]">Healthy Meals</span>
              </h1>

              {/* Description */}
              <p className="mt-6 text-gray-600">
                You can explore the menu that we provide with fun and have their
                own taste and make your day better.
              </p>

              {/* Feature List */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-sm text-white">
                    ✓
                  </div>
                  <p>High quality beans</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-sm text-white">
                    ✓
                  </div>
                  <p>Healthy meals, you can request the ingredients</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-sm text-white">
                    ✓
                  </div>
                  <p>
                    Chat with our staff to get better experience for ordering
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-sm text-white">
                    ✓
                  </div>
                  <p>Free member card with a minimum purchase</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden h-full w-1/2 lg:block">
          <img
            src={person}
            alt="person"
            className="h-full w-full object-cover"
          />
        </div>
      </section>
      <section className="mt-8 text-center">
        <h2 className="text-5xl">
          Here is People’s <span className="text-[#8E6447]">Favorite</span>
        </h2>

        <div className="mt-4 flex justify-center">
          <div className="w-20 border-b-8 border-orange-500"></div>
        </div>
      </section>
      {/*  */}
      <MapCoffe />
      {/*  */}
      <Testimonial />
      <ChatFeature />
    </main>
  );
}
