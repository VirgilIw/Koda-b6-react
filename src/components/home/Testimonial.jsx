import Star from "../../assets/home/Star.svg";
import ArrowLeft from "../../assets/home/arrow-left.png";
import ArrowRight from "../../assets/home/arrow-right.png";
import Testimoni1 from "../../assets/home/Testimoni1.png";

const Testimonial = () => {
  return (
    <>
      <section className="overflow-hidden bg-[#0B0909] py-20 lg:py-0">
        <div className="flex w-full flex-col items-center lg:flex-row">
          <article className="relative w-full p-6 sm:p-10 lg:w-1/2 lg:p-20">
            <div className="bg-brand-orange/10 absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] lg:blur-[120px]"></div>
            <img
              src={Testimoni1}
              alt="Testimonials"
              className="relative z-10 mx-auto w-[85%] max-w-sm rounded-3xl border-4 border-white/10 object-cover shadow-2xl lg:w-full lg:max-w-full lg:rounded-none lg:border-none"
            />
          </article>

          <article className="w-full px-6 py-12 text-center sm:px-10 md:px-16 lg:w-1/2 lg:px-32 lg:py-24 lg:text-left">
            <div className="mx-auto max-w-xl lg:mx-0">
              <p className="mb-7 text-white">TESTIMONIAL</p>
              <h2 className="border-orange-400 border-l-4 pl-4 text-3xl leading-tight font-bold text-white sm:text-4xl md:text-5xl lg:border-l-8 lg:pl-6">
                Viezh Robert
              </h2>
              <p className="mt-4 text-sm font-semibold tracking-wide text-orange-400 uppercase sm:text-lg">
                Manager Coffee Shop
              </p>
              <p className="mt-8 px-4 text-sm leading-relaxed font-light text-white italic opacity-80 sm:text-lg lg:mt-10 lg:px-0 lg:leading-loose">
                “Wow... I am very happy to spend my whole day here. the Wi-fi is
                good, and the coffee and meals tho. I like it here!! Very
                recommended!”
              </p>

              <div className="mt-6 flex items-center justify-center gap-3 lg:justify-start">
                {[1, 2, 3, 4, 5].map((star) => (
                  <img
                    key={star}
                    src={Star}
                    alt="Star Icon"
                    className="h-3 w-3 sm:h-4 sm:w-4"
                  />
                ))}
                <span className="ml-2 text-xs font-bold text-white sm:text-sm">
                  5.0
                </span>
              </div>

              <div className="mt-7 flex justify-center gap-4 lg:justify-start lg:gap-6">
                <button className="group flex h-12 w-12 transform items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-orange-400 active:scale-95 lg:h-14 lg:w-14">
                  <img
                    src={ArrowLeft}
                    alt="Arrow Icon"
                    className="h-4 w-4 group-hover:brightness-0 group-hover:invert lg:h-5 lg:w-5"
                  />
                </button>
                <button className="group flex h-12 w-12 transform items-center justify-center rounded-full bg-orange-400 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white active:scale-95 lg:h-14 lg:w-14">
                  <img
                    src={ArrowRight}
                    alt="Arrow Icon"
                    className="group-hover:filter-orange h-4 w-4 lg:h-5 lg:w-5"
                  />
                </button>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 lg:justify-start lg:gap-3">
                <span className="h-1.5 w-8 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(255,137,6,0.5)] lg:h-2 lg:w-12"></span>
                <span className="h-2 w-2 cursor-pointer rounded-full bg-white opacity-20 transition-all duration-300 hover:opacity-100 lg:h-2.5 lg:w-2.5"></span>
                <span className="h-2 w-2 cursor-pointer rounded-full bg-white opacity-20 transition-all duration-300 hover:opacity-100 lg:h-2.5 lg:w-2.5"></span>
                <span className="h-2 w-2 cursor-pointer rounded-full bg-white opacity-20 transition-all duration-300 hover:opacity-100 lg:h-2.5 lg:w-2.5"></span>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default Testimonial;
