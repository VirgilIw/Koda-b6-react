import React from "react";
import reset from "../assets/auth/reset-pass.jpg";
import http from "../lib/http";
import { Link } from "react-router";

export default function ResetPassword() {
  const [email, setEmail] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await http(
        "/auth/reset-password",
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
      console.log(data);
      if (!res.status) {
        throw new Error(data.message || "Email not registered");
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <section className="grid h-screen grid-cols-[30%_70%]">
        {/* Image */}
        <section>
          <img
            src={reset}
            alt="forgot-image"
            className="h-full w-98 object-center"
          />
        </section>

        {/* Form */}
        <section className="flex min-h-screen items-center">
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-4xl flex-col gap-5"
          >
            <h1 className="text-3xl font-semibold">Reset Password</h1>
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 text-lg">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                className="rounded-md border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <Link to="/login" className="hover:text-orange-400">
                Login
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
