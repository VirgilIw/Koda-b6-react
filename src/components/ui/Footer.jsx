import { Link } from "react-router";
import CoffeeIcon from "../../assets/auth/coffe-shop.svg";
import Facebook from "../../assets/auth/fb.svg";
import Twitter from "../../assets/footer/Tweet.svg";
import Instagram from "../../assets/footer/Instagram.svg";

export default function Footer() {
  return (
    <>
      <section className="flex flex-col justify-between gap-12 border-t border-gray-100 bg-white px-8 py-16 sm:px-12 md:flex-row md:gap-0 md:px-16 lg:px-24 lg:py-20">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <Link to="/">
            <img
              src={CoffeeIcon}
              alt="Coffee Icon"
              className="h-10 cursor-pointer md:h-12"
            />
          </Link>
          <p className="mt-6 w-full max-w-sm text-sm leading-relaxed text-[#4F5665] opacity-80 sm:text-base">
            Coffee Shop is a store that sells some good meals, and especially
            coffee. We provide high quality beans
          </p>
          <div className="hidden md:block">
            <p className="mt-12 font-medium text-[#AFB5C0]">
              &copy; 2026 Koda Coffee.
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-12 text-center sm:flex-row sm:items-start sm:gap-20 sm:text-left md:grid md:w-auto md:grid-cols-3 md:gap-10">
          <div className="flex w-full flex-col gap-6 sm:w-auto">
            <p className="font-bold text-[#0B0909]">Product</p>
            <ul className="flex flex-col gap-3 text-sm text-[#4F5665] opacity-80 sm:text-base">
              <li>
                <Link
                  to="/product"
                  className="hover:text-brand-orange cursor-pointer transition-all"
                >
                  Our Product
                </Link>
              </li>
              <li className="hover:text-brand-orange cursor-pointer transition-all">
                Pricing
              </li>
              <li className="hover:text-brand-orange cursor-pointer transition-all">
                Locations
              </li>
              <li className="hover:text-brand-orange cursor-pointer transition-all">
                Countries
              </li>
              <li className="hover:text-brand-orange cursor-pointer transition-all">
                Blog
              </li>
            </ul>
          </div>
          <div className="flex w-full flex-col gap-6 sm:w-auto">
            <p className="font-bold text-[#0B0909]">Engage</p>
            <ul className="flex flex-col gap-3 text-sm text-[#4F5665] opacity-80 sm:text-base">
              <li className="hover:text-brand-orange cursor-pointer transition-all">
                Partner
              </li>
              <li className="hover:text-brand-orange cursor-pointer transition-all">
                FAQ
              </li>
              <li className="hover:text-brand-orange cursor-pointer transition-all">
                About Us
              </li>
              <li className="hover:text-brand-orange cursor-pointer transition-all">
                Privacy Policy
              </li>
            </ul>
          </div>
          <div className="flex w-full flex-col items-center gap-6 sm:w-auto sm:items-start">
            <p className="font-bold text-[#0B0909]">Social Media</p>
            <ul className="flex justify-center gap-4 md:justify-start">
              <li className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-orange-400 shadow-md transition-all hover:scale-110">
                <img
                  src={Facebook}
                  alt="Facebook Icon"
                  className="h-5 w-5 brightness-0 invert transition-transform group-hover:scale-110"
                />
              </li>
              <li className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-orange-400 shadow-md transition-all hover:scale-110">
                <img
                  src={Twitter}
                  alt="Twitter Icon"
                  className="h-5 w-5 brightness-0 invert transition-transform group-hover:scale-110"
                />
              </li>
              <li className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-orange-400 shadow-md transition-all hover:scale-110">
                <img
                  src={Instagram}
                  alt="Instagram Icon"
                  className="h-5 w-5 brightness-0 invert transition-transform group-hover:scale-110"
                />
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full border-t border-gray-50 pt-8 text-center md:hidden">
          <p className="text-sm text-[#AFB5C0]">&copy; 2026 Solid Coffee.</p>
        </div>
      </section>
    </>
  );
}
