import React, { useContext } from "react";
import { Link } from "react-router";

import logo from "../assets/auth/register.svg";
import cs from "../assets/auth/coffe-shop.svg";
import EyeClose from "../components/auth/EyeClose";
import EyeOpen from "../components/auth/EyeOpen";
import Mail from "../assets/auth/mail.svg";
import profile from "../assets/auth/profile.svg";
import Password from "../assets/auth/password.svg";
import MediaAuth from "../components/auth/MediaAuth";
import { registerContext } from "../contexts/register/registerContext";

export default function Register() {
  const [openEye, setOpenEye] = React.useState({
    password: false,
    confirmPassword: false,
  });

  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMsg, setSuccessMsg] = React.useState("");

  const { dispatch } = useContext(registerContext);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
    setErrorMessage("");
  };

  const handleEyePassword = () => {
    setOpenEye((prev) => ({
      ...prev,
      password: !prev.password,
    }));
  };

  const handleEyeConfirm = () => {
    setOpenEye((prev) => ({
      ...prev,
      confirmPassword: !prev.confirmPassword,
    }));
  };
  //

  // console.log(data)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDATION
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setErrorMessage("All fields are required");
      return;
    }

    if (form.password.length < 8) {
      setErrorMessage("Password must be at least 8 characters");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrorMessage("Password and Confirm Password must match");
      return;
    }

    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
    };

    try {
      // ambil data lama
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // cek email sudah ada atau belum
      const isEmailExist = users.some((user) => user.email === form.email);

      if (isEmailExist) {
        setErrorMessage("Email already registered");
        return;
      }

      // simpan user baru
      users.push(payload);
      localStorage.setItem("users", JSON.stringify(users));

      // update context
      dispatch({ type: "REGISTER", payload });

      // reset form
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setErrorMessage("");
    } catch (error) {
      console.log(error);
      setErrorMessage("Something went wrong");
    }
  };

  const isFormValid =
    form.name && form.email && form.password && form.confirmPassword;

  return (
    <div className="lg:grid lg:grid-cols-[25%_75%]">
      {/* LEFT */}
      <section>
        <img
          src={logo}
          alt="Register"
          className="hidden lg:block lg:h-screen lg:w-full lg:object-cover"
        />
      </section>

      {/* RIGHT */}
      <section className="flex min-h-screen items-center justify-center px-6 pt-10 lg:mx-20">
        <div className="w-full space-y-4 px-2 lg:max-w-lvh lg:min-w-full">
          {/* Header */}
          <div>
            <img src={cs} alt="Coffee shop" className="mt-10 lg:mt-0" />
            <h1 className="mb-2 text-2xl font-semibold text-[#8E6447] lg:mt-5">
              Register
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Fill out the form correctly
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="my-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <div className="relative mt-2">
                <img
                  src={profile}
                  alt="profile"
                  className="absolute top-1/2 left-3 w-5 -translate-y-1/2 opacity-60"
                />
                <input
                  id="name"
                  type="text"
                  placeholder="Enter Your Full Name"
                  autoComplete="off"
                  className="w-full rounded-lg border border-gray-300 bg-slate-50 py-1 pr-3 pl-10"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
            </div>

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
                  className="w-full rounded-lg border border-gray-300 bg-slate-50 py-1 pr-3 pl-10"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password */}
            <div className="my-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative mt-2">
                <img
                  src={Password}
                  alt="password"
                  className="absolute top-1/2 left-3 w-5 -translate-y-1/2 opacity-60"
                />
                <input
                  id="password"
                  type={openEye.password ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-gray-300 bg-slate-50 py-1 pr-10 pl-10"
                  value={form.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 -translate-y-1/2"
                  onClick={handleEyePassword}
                >
                  {openEye.password ? <EyeOpen /> : <EyeClose />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="my-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </label>
              <div className="relative mt-2">
                <img
                  src={Password}
                  alt="password"
                  className="absolute top-1/2 left-3 w-5 -translate-y-1/2 opacity-60"
                />
                <input
                  id="confirmPassword"
                  type={openEye.confirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="w-full rounded-lg border border-gray-300 bg-slate-50 py-1 pr-10 pl-10"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 -translate-y-1/2"
                  onClick={handleEyeConfirm}
                >
                  {openEye.confirmPassword ? <EyeOpen /> : <EyeClose />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
            )}
            {/* Submit */}
            <button
              type="submit"
              disabled={!isFormValid}
              className={`mt-4 w-full rounded-lg py-2 font-semibold text-white ${
                isFormValid
                  ? "bg-orange-400 hover:bg-orange-500"
                  : "cursor-not-allowed bg-gray-300"
              }`}
            >
              Register
            </button>

            {/* Login Link */}
            <p className="flex items-center justify-center gap-1 pt-4 text-sm">
              Have an account?
              <Link to="/login" className="font-medium text-orange-400">
                Login
              </Link>
            </p>
          </form>

          <MediaAuth />
        </div>
        {successMsg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-[90%] max-w-sm rounded-xl bg-white p-6 shadow-xl">
              <h2 className="mb-2 text-lg font-semibold text-green-600">
                Success
              </h2>

              <p className="text-sm text-gray-600">{successMsg}</p>

              <button
                onClick={() => setSuccessMsg("")}
                className="mt-5 w-full rounded-lg bg-orange-500 py-2 text-white hover:bg-green-600"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
