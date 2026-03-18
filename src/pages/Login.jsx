import logo from "../assets/auth/login-img.svg";
import cs from "../assets/auth/coffe-shop.svg";
import EyeClose from "../components/auth/EyeClose";
import EyeOpen from "../components/auth/EyeOpen";
import Mail from "../assets/auth/mail.svg";
import Password from "../assets/auth/password.svg";
import {
  Link,
  useNavigate
} from "react-router";
import React from "react";
import MediaAuth from "../components/auth/MediaAuth";
import http from "../lib/http";

export const Login = () => {
  const [openEye, setOpenEye] = React.useState(false);
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = React.useState("");
  const navigate = useNavigate();

  const handleEye = () => {
    setOpenEye(!openEye);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.email === "" || form.password === "") {
    setErrorMessage("Email and password cannot be empty");
    return;
  }

  try {
    const res = await http(
      "/auth/login",
      JSON.stringify({
        email: form.email,
        password: form.password,
      }),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      setErrorMessage(data.message || "Login failed");
      return;
    }

    setErrorMessage("");
    navigate("/");
  } catch (error) {
    console.log(error);
    setErrorMessage("Something went wrong");
  }
};

  React.useEffect(() => {
    localStorage.getItem("users");
  }, []);
  return (
    <div className="lg:grid lg:grid-cols-[25%_75%]">
      {/* LEFT */}
      <section>
        <img
          src={logo}
          alt="Login illustration"
          className="hidden lg:block lg:h-screen lg:w-full lg:object-cover"
        />
      </section>

      {/* RIGHT */}
      <section className="flex min-h-screen items-center justify-center px-6 lg:mx-20 lg:flex lg:items-center lg:justify-center">
        <div className="w-full space-y-4 px-2 lg:max-w-lvh lg:min-w-full lg:space-y-4">
          {/* Header */}
          <div>
            <img src={cs} alt="Coffee shop" className="mt-10 h-12 w-36" />
            <h1 className="mb-2 text-2xl font-semibold text-[#8E6447] lg:mt-5 lg:text-xl lg:font-bold">
              Login
            </h1>
            <p className="mt-8 text-sm text-gray-500 lg:mt-1">
              Fill out the form correctly
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="my-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>

              <div className="relative mt-2">
                <img
                  src={Mail}
                  alt="mail"
                  className="absolute top-1/2 left-3 w-5 -translate-y-1/2 opacity-60"
                />

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="off"
                  className="w-full rounded-lg border border-gray-300 bg-slate-50 py-3 pr-3 pl-10 text-base lg:w-full lg:rounded-lg lg:border lg:border-gray-300 lg:bg-slate-50 lg:py-2 lg:pr-3 lg:pl-10"
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="my-2">
              <label
                htmlFor="password"
                className="text-sm font-medium lg:mt-2 lg:mb-10 lg:text-sm lg:font-medium"
              >
                Password
              </label>

              <div className="relative mt-2 lg:relative lg:my-2">
                <img
                  src={Password}
                  alt="password"
                  className="absolute top-1/2 left-3 w-5 -translate-y-1/2 opacity-60"
                />

                <input
                  id="password"
                  type={openEye ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-gray-300 bg-slate-50 px-3 py-3 pr-10 pl-10 text-base lg:w-full lg:rounded-lg lg:border lg:border-gray-300 lg:bg-slate-50 lg:px-3 lg:py-2 lg:pr-10 lg:pl-10"
                  value={form.password}
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                  }}
                />

                <button
                  type="button"
                  className="absolute top-1/2 right-3 -translate-y-1/2 lg:absolute lg:top-1/2 lg:right-2 lg:-translate-y-1/2"
                  onClick={handleEye}
                >
                  {openEye ? <EyeOpen /> : <EyeClose />}
                </button>
              </div>
            </div>

            {/* Forgot */}
            <div className="my-4 flex items-center justify-between lg:my-6 lg:flex lg:justify-end">
              {errorMessage ? (
                <p className="text-sm text-red-500">{errorMessage}</p>
              ) : (
                <div />
              )}
              <Link to="/forgot-password" className="text-sm text-orange-400">
                Lupa Password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-lg bg-orange-400 py-3 font-semibold text-white lg:w-full lg:rounded lg:bg-orange-400 lg:p-2 lg:font-semibold lg:text-white lg:hover:bg-orange-500"
            >
              Login
            </button>

            {/* Register */}
            <p className="flex items-center justify-center gap-1 pt-4 text-sm lg:flex lg:items-center lg:justify-center lg:gap-1 lg:pt-4 lg:text-sm">
              Not Have An Account?
              <Link to="/register" className="font-medium text-orange-400">
                Register
              </Link>
            </p>
          </form>

          <MediaAuth />
        </div>
      </section>
    </div>
  );
};
