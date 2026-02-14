import fb from "../../assets/auth/fb.svg";
import google from "../../assets/auth/google.svg";

const MediaAuth = () => {
  return (
    <>
      <section className="flex justify-center items-center gap-10 lg:gap-20">
        <div className="h-[0.2px] w-1/2 bg-gray-200" />
        <p className="text-gray-400">Or</p>
        <div className="h-[0.2px] w-1/2 bg-gray-200" />
      </section>
      <section className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-1 rounded-xl p-2 shadow-md">
          <img src={fb} alt="facebook" />
          <span>Facebook</span>
        </button>
        <button className="flex items-center justify-center gap-1 rounded-xl p-2 shadow-md">
          <img src={google} alt="google" />
          <span>Google</span>
        </button>
      </section>
    </>
  );
};
export default MediaAuth;