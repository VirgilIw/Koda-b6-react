import React from "react";
import forgot from "../assets/auth/forgot-password.svg";
import Mail from "../assets/auth/mail.svg";
import http from "../lib/http";
import { Link } from "react-router";

export default function ForgotPassword() {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await http(
        "/auth/forgot-password",
        JSON.stringify({
          email: email,
        }),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Email not registered");
      }

      console.log(data);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <main>
      <section className="grid h-screen grid-cols-[30%_70%]">
        {/* Image */}
        <section>
          <img
            src={forgot}
            alt="forgot-image"
            className="h-screen w-full object-contain object-left"
          />
        </section>

        {/* Form */}
        <section className="flex min-h-screen items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-4xl flex-col gap-5"
          >
            <h1 className="text-3xl font-semibold text-[#8E6447]">
              Fill out the form correctly
            </h1>
            <p className="text-[#4F5665]">
              We will send new password to your email
            </p>
            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 text-lg">
                Email
              </label>

              <div className="relative">
                <img
                  src={Mail}
                  alt="mail"
                  className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 opacity-60"
                />

                <input
                  type="email"
                  id="email"
                  value={email}
                  className="w-full rounded-md border py-3 pr-4 pl-10 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Link to="/reset-password" className="hover:text-orange-400">
                Reset Password
              </Link>
            </div>
            <button
              type="submit"
              className="rounded-md bg-orange-400 py-3 text-white transition hover:bg-orange-500"
            >
              Submit
            </button>
          </form>
        </section>
      </section>
    </main>
  );
}
