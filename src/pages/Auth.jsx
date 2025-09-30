import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // <-- add useNavigate

export default function Auth({ defaultMode = "signin" }) {
  const location = useLocation();
  const navigate = useNavigate(); // <-- create navigator

  const initial = location.pathname === "/signup" ? "signup" : defaultMode;
  const [mode, setMode] = useState(initial); // "signin" | "signup"
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const isSignIn = mode === "signin";

  function onSubmit(e) {
    e.preventDefault();
    // OPTIONAL: do real auth here. After success:
    navigate("/home", { replace: true }); // <-- go to HomeFeed
  }

  return (
    <div className="relative h-dvh text-[#2E6247] overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0 -z-10 bg-[#F3F2EE]" />
      <div className="absolute inset-0 -z-10 opacity-90 pointer-events-none
        bg-[radial-gradient(60%_60%_at_10%_10%,#BFE3D1_0%,transparent_60%),radial-gradient(60%_60%_at_90%_20%,#F1E5D6_0%,transparent_60%),radial-gradient(50%_50%_at_50%_100%,#D7EBFF_0%,transparent_55%)]" />

      <div className="mx-auto h-full max-w-[520px] px-5 pt-6 pb-5 grid grid-rows-[auto_1fr_auto] gap-5">
        {/* Top bar */}
        <header className="flex items-center justify-between">
          <Link to="/" className="text-sm text-[#2E6247]/70 hover:underline">← Back</Link>
          <div className="flex items-center gap-2">
            <div className="inline-grid place-items-center rounded-full bg-[#2E6247]/10 p-1.5">
              <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
                <path d="M12 3 3 10h2v10h5v-6h4v6h5V10h2L12 3z" />
              </svg>
            </div>
            <span className="text-[15px] font-semibold tracking-tight">Aus Home</span>
          </div>
          <div className="w-10" />
        </header>

        {/* Glass card */}
        <section className="self-center w-full">
          <div className="p-[1px] rounded-2xl bg-gradient-to-b from-[#2E6247]/40 via-white/60 to-transparent shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
            <div className="rounded-2xl bg-white/70 backdrop-blur-md ring-1 ring-white/60 p-5 sm:p-6">
              {/* Segmented toggle */}
              <div className="bg-[#2E6247]/10 rounded-xl p-1 grid grid-cols-2">
                <button
                  onClick={() => setMode("signin")}
                  className={`py-2 rounded-lg text-sm font-semibold transition ${
                    isSignIn ? "bg-[#2E6247] text-white shadow" : "text-[#2E6247]/80 hover:bg-[#2E6247]/5"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setMode("signup")}
                  className={`py-2 rounded-lg text-sm font-semibold transition ${
                    !isSignIn ? "bg-[#2E6247] text-white shadow" : "text-[#2E6247]/80 hover:bg-[#2E6247]/5"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Social buttons */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border border-black/10 bg-white px-3.5 py-2.5 text-sm font-semibold hover:bg-black/[.03] active:scale-[.98] transition">
                  <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                    <path fill="#EA4335" d="M12 10.2v3.9h5.4c-.2 1.2-1.6 3.6-5.4 3.6-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.8 2.8 14.6 2 12 2 6.5 2 2 6.5 2 12s4.5 10 10 10c5.8 0 9.6-4.1 9.6-9.9 0-.7-.1-1.2-.2-1.9H12z" />
                  </svg>
                  Google
                </button>
                <button type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border border-black/10 bg-white px-3.5 py-2.5 text-sm font-semibold hover:bg-black/[.03] active:scale-[.98] transition">
                  <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" fill="currentColor">
                    <path d="M16.7 2c-.9.1-2 .6-2.6 1.4-.6.7-1.1 1.9-.9 3 .9.1 2-.5 2.6-1.3.6-.7 1.1-1.9.9-3.1zM20.4 21.6c-1.1.4-2 .6-2.7.6-1.3 0-1.6-.4-3-1.5-1.1-1-1.9-1.5-3-1.5s-1.7.5-2.7 1.2c-1 .8-1.6 1.1-2.4 1.1-.8 0-1.7-.3-2.8-.7l.6-2.1c1.1.4 2 .7 2.5.7.7 0 1.3-.3 2.2-1 .9-.7 2-1.5 3.5-1.5 1.4 0 2.5.8 3.5 1.6 1 .8 1.4 1 2.1 1 .6 0 1.5-.3 2.5-.7l.7 2.1zM18.9 12.7c0-2.7 2.2-3.5 2.3-3.6-1.2-1.9-3.1-2.2-3.7-2.2-1.6-.1-3.1.9-3.8.9-.8 0-2-.9-3.3-.9-1.7 0-3.2 1-4.1 2.5-1.7 2.8-.4 6.9 1.2 9.2.8 1.2 1.8 2.6 3.1 2.5 1.3-.1 1.7-.8 3.2-.8s1.8.8 3.2.8c1.3 0 2.2-1.2 3-2.4.9-1.3 1.2-2.6 1.2-2.7-.1 0-2.3-.9-2.3-3.3z" />
                  </svg>
                  Apple
                </button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 my-4">
                <div className="h-px flex-1 bg-black/10" />
                <span className="text-xs text-[#2E6247]/60">or continue with email</span>
                <div className="h-px flex-1 bg-black/10" />
              </div>

              {/* Form */}
              <form onSubmit={onSubmit} className="space-y-4">
                {!isSignIn && (
                  <FloatField label="Full Name">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Adaeze Okafor"
                      className="peer w-full rounded-lg bg-white/80 px-3.5 pt-4 pb-2.5 outline-none ring-1 ring-[#2E6247]/20 focus:ring-2 focus:ring-[#2E6247] placeholder-transparent"
                    />
                  </FloatField>
                )}

                <FloatField label="Email">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className="peer w-full rounded-lg bg-white/80 px-3.5 pt-4 pb-2.5 outline-none ring-1 ring-[#2E6247]/20 focus:ring-2 focus:ring-[#2E6247] placeholder-transparent"
                  />
                </FloatField>

                <FloatField label="Password">
                  <div className="relative">
                    <input
                      type={showPwd ? "text" : "password"}
                      name="password"
                      required
                      placeholder="••••••••"
                      className="peer w-full rounded-lg bg-white/80 px-3.5 pr-11 pt-4 pb-2.5 outline-none ring-1 ring-[#2E6247]/20 focus:ring-2 focus:ring-[#2E6247] placeholder-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2E6247]/70 hover:text-[#2E6247]"
                      aria-label={showPwd ? "Hide password" : "Show password"}
                    >
                      {showPwd ? <EyeOffIcon className="size-5" /> : <EyeIcon className="size-5" />}
                    </button>
                  </div>
                </FloatField>

                {!isSignIn && (
                  <FloatField label="Confirm Password">
                    <div className="relative">
                      <input
                        type={showPwd2 ? "text" : "password"}
                        name="confirm"
                        required
                        placeholder="••••••••"
                        className="peer w-full rounded-lg bg-white/80 px-3.5 pr-11 pt-4 pb-2.5 outline-none ring-1 ring-[#2E6247]/20 focus:ring-2 focus:ring-[#2E6247] placeholder-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPwd2((s) => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2E6247]/70 hover:text-[#2E6247]"
                        aria-label={showPwd2 ? "Hide password" : "Show password"}
                      >
                        {showPwd2 ? <EyeOffIcon className="size-5" /> : <EyeIcon className="size-5" />}
                      </button>
                    </div>
                  </FloatField>
                )}

                <button
                  type="submit"
                  className="w-full rounded-full py-3.5 text-[15px] font-semibold bg-[#2E6247] text-white hover:bg-[#27563E] active:scale-[.99] transition"
                >
                  {isSignIn ? "Sign In" : "Create Account"}
                </button>

           

                <p className="text-center text-sm text-[#2E6247]/70">
                  {isSignIn ? "No account?" : "Already have an account?"}{" "}
                  <button
                    type="button"
                    onClick={() => setMode(isSignIn ? "signup" : "signin")}
                    className="font-semibold underline"
                  >
                    {isSignIn ? "Sign Up" : "Sign In"}
                  </button>
                </p>
              </form>
            </div>
          </div>
        </section>

        <footer className="text-center text-xs text-[#2E6247]/60">
          By continuing, you agree to our Terms & Privacy.
        </footer>
      </div>
    </div>
  );
}

/* ---------- Helpers ---------- */

function FloatField({ label, children }) {
  return (
    <label className="block">
      <div className="relative">
        {children}
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] text-[#2E6247]/60 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-[13px] peer-focus:top-2 peer-focus:text-[11px] bg-white/0 px-1">
          {label}
        </span>
      </div>
    </label>
  );
}

function EyeIcon({ className = "size-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  );
}

function EyeOffIcon({ className = "size-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 3l18 18" />
      <path d="M10.6 6.3A9.8 9.8 0 0 1 12 5c6.5 0 10 7 10 7a19.9 19.9 0 0 1-4.2 4.9M6.3 10.6A19.9 19.9 0 0 0 2 12s3.5 7 10 7a9.8 9.8 0 0 0 1.4-.1" />
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  );
}