// src/App.jsx
import { Routes, Route, Link } from "react-router-dom";
import Auth from "./pages/Auth.jsx";
import HomeFeed from "./pages/HomeFeed.jsx"; // <-- add this
import PropertyDetails from "./pages/PropertyDetails.jsx";
function Home() {
  return (
    <div className="min-h-dvh bg-[#F3F2EE] text-[#2E6247] overflow-hidden">
      <main className="mx-auto min-h-dvh max-w-[480px] grid grid-rows-[auto_auto_1fr_auto] px-5 pt-4 pb-4">
        {/* Brand */}
        <header className="flex items-center gap-2">
          <div className="inline-grid place-items-center rounded-full bg-[#2E6247]/10 p-1.5">
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
              <path d="M12 3 3 10h2v10h5v-6h4v6h5V10h2L12 3z" />
            </svg>
          </div>
          <span className="text-[15px] font-semibold tracking-tight">Aus Home</span>
        </header>

        {/* Hero image */}
        <div className="mt-3 overflow-hidden rounded-xl h-[290px]">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1800&auto=format&fit=crop"
            alt="Modern residence"
          />
        </div>

        {/* Copy */}
        <section className="mt-5 min-h-0">
          <h1 className="text-[34px] leading-[1.05] font-extrabold tracking-[-0.02em]">
            Discover Your
            <br /> Dream Home
          </h1>
          <p className="mt-3 text-[13px] leading-[1.45] text-[#6F726F]">
            Find the perfect property with ease. Explore, compare, and connect
            with trusted agents all in one app.
          </p>
        </section>

        {/* CTA -> /auth */}
        <Link
          to="/auth"
          className="mt-4 block w-full text-center rounded-full py-3.5 text-[15px] font-semibold bg-[#2E6247] text-white hover:bg-[#27563E] active:scale-[.99] transition"
        >
          Get Started
        </Link>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth defaultMode="signin" />} />
      <Route path="/signin" element={<Auth defaultMode="signin" />} />
      <Route path="/signup" element={<Auth defaultMode="signup" />} />
      <Route path="/home" element={<HomeFeed />} />    {/* <-- feed page */}
      <Route path="*" element={<Home />} />            {/* fallback */}
      <Route path="/property/:id" element={<PropertyDetails />} />
    </Routes>
  );
}