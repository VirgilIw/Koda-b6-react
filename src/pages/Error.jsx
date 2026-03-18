import React from "react";
import { useNavigate } from "react-router";

export default function Error() {
  const navigate = useNavigate();
  const [mouse, setMouse] = React.useState({ x: -999, y: -999 });

  React.useEffect(() => {
    const move = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // particles generate once
  const [particles] = React.useState(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 6 + 4,
      delay: `${Math.random() * 4}s`,
      duration: `${Math.random() * 5 + 4}s`,
      opacity: Math.random() * 0.25 + 0.1,
    })),
  );

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0d0906] font-sans">
      {/* GRID BACKGROUND */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,92,26,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,92,26,.07) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%,black,transparent)",
        }}
      />

      {/* BLOBS */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 animate-pulse rounded-full bg-orange-500/10 blur-[80px]" />
      <div className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 animate-pulse rounded-full bg-orange-400/10 blur-[70px]" />

      {/* MOUSE GLOW */}
      <div
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: mouse.x,
          top: mouse.y,
          width: 560,
          height: 560,
          background:
            "radial-gradient(circle,rgba(255,92,26,.14) 0%,transparent 70%)",
          transition: "left .12s ease, top .12s ease",
        }}
      />

      {/* PARTICLES */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="pointer-events-none absolute rounded-full bg-orange-500"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animation: `float ${p.duration} ease-in-out infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-lg px-6 text-center">
        {/* 404 */}
        <h1 className="text-[clamp(110px,20vw,190px)] font-extrabold tracking-tight text-transparent select-none [-webkit-text-stroke:1.5px_rgba(255,92,26,.35)]">
          404
        </h1>

        {/* CARD */}
        <div className="mt-6 rounded-2xl border border-orange-500/20 bg-white/5 p-8 backdrop-blur-xl">
          {/* CHIP */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-orange-500/30 bg-orange-500/10 px-3 py-1">
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-orange-500" />
            <span className="text-xs tracking-widest text-orange-300 uppercase">
              Error 404
            </span>
          </div>

          <h2 className="text-2xl font-semibold text-white/90">
            Page Not Found
          </h2>

          <div className="my-5 h-px bg-linear-to-r from-transparent via-orange-500/30 to-transparent" />

          <p className="text-sm leading-relaxed text-white/40">
            The page you're looking for may have been removed, renamed, or is
            temporarily unavailable.
          </p>

          {/* BUTTONS */}
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="rounded-xl border border-orange-500/40 px-6 py-2 text-sm text-orange-300 transition hover:border-orange-500 hover:bg-orange-500/10 hover:text-white active:scale-95"
            >
              ← Go Back
            </button>

            <button
              onClick={() => navigate("/")}
              className="rounded-xl bg-orange-500 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:-translate-y-0.5 hover:bg-orange-600 active:scale-95"
            >
              Back to Home →
            </button>
          </div>
        </div>

        {/* STATUS */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <span className="h-1.5 w-1.5 animate-ping rounded-full bg-orange-500" />
          <span className="text-xs tracking-widest text-white/20 uppercase">
            All systems operational
          </span>
        </div>
      </div>

      {/* KEYFRAMES */}
      <style>
        {`
          @keyframes float {
            0%,100% { transform: translateY(0); }
            50% { transform: translateY(-25px); }
          }
        `}
      </style>
    </div>
  );
}
