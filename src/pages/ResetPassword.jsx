import React from "react";
import reset from "../assets/auth/reset-pass.jpg";
import http from "../lib/http";
import { Link, useNavigate } from "react-router";
import EyeOpen from "../components/auth/EyeOpen";
import EyeClose from "../components/auth/EyeClose";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [form, setForm] = React.useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.email || !form.otp || !form.password || !form.confirmPassword) {
      return setError("Semua field wajib diisi");
    }

    if (form.password !== form.confirmPassword) {
      return setError("Password tidak sama");
    }

    if (form.password.length < 6) {
      return setError("Password minimal 6 karakter");
    }

    try {
      setLoading(true);

      const res = await http(
        "/auth/reset-password",
        JSON.stringify({
          email: form.email,
          code_otp: Number(form.otp),
          new_password: form.password,
        }),
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await res.json();
      console.log(data)

      if (!res.ok) {
        throw new Error(data.message || "Gagal reset password");
      }

      setSuccess("Password berhasil direset! Redirect ke login...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="grid h-screen grid-cols-[30%_70%]">
        {/* Image */}
        <section className="hidden md:block">
          <img src={reset} alt="reset" className="h-full w-full object-cover" />
        </section>

        {/* Form */}
        <section className="flex items-center justify-center px-12">
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-4xl flex-col gap-4"
          >
            <h1 className="text-3xl font-bold">Reset Password</h1>

            {/* Error */}
            {error && (
              <div className="rounded-md bg-red-100 p-2 text-red-600">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="rounded-md bg-green-100 p-2 text-green-600">
                {success}
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col">
              <label className="mb-1" htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full rounded-md border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* OTP */}
            <div className="flex flex-col">
              <label className="mb-1" htmlFor="otp">OTP Code</label>
              <input
                type="text"
                name="otp"
                id="otp"
                value={form.otp}
                onChange={handleChange}
                placeholder="Enter OTP"
                className="w-full rounded-md border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="mb-1" htmlFor="new-password">New Password</label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="new-password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="New password"
                  className="w-full rounded-md border px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-black"
                >
                  {showPassword ? <EyeClose /> : <EyeOpen />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col">
              <label className="mb-1" htmlFor="confirm-password">Confirm Password</label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirm-password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="w-full rounded-md border px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-black"
                >
                  {showConfirmPassword ? <EyeClose /> : <EyeOpen />}
                </button>
              </div>
            </div>

            <div className="flex justify-end text-sm">
              <Link to="/login" className="hover:text-orange-400">
                Back to Login
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-orange-400 py-3 text-white transition hover:bg-orange-500 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Reset Password"}
            </button>
          </form>
        </section>
      </section>
    </main>
  );
}
