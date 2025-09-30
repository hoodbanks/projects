// src/pages/HomeFeed.jsx
import { useMemo, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

/* ===================== Hook: drag-to-scroll (works touch & mouse) ===================== */
function useSwipeScroll(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onDown = (e) => {
      isDown = true;
      startX = (e.touches ? e.touches[0].pageX : e.pageX);
      scrollLeft = el.scrollLeft;
      el.classList.add("cursor-grabbing");
    };
    const onMove = (e) => {
      if (!isDown) return;
      const x = (e.touches ? e.touches[0].pageX : e.pageX);
      const walk = x - startX;
      el.scrollLeft = scrollLeft - walk;
    };
    const onUp = () => {
      isDown = false;
      el.classList.remove("cursor-grabbing");
    };

    el.addEventListener("mousedown", onDown);
    el.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    el.addEventListener("touchstart", onDown, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: true });
    el.addEventListener("touchend", onUp);

    return () => {
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      el.removeEventListener("touchstart", onDown);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onUp);
    };
  }, [ref]);
}

/* ===================== Page ===================== */
export default function HomeFeed() {
  const [chip, setChip] = useState("Buy");
  const [savedIds, setSavedIds] = useState(new Set());

  // ---- Demo data (same as before, with type field used by details page) ----
  const properties = useMemo(
    () => [
      // BUY
      { id: 1, title: "Green Field Island, Western Byepass", location: "Off sixway roundabout, byepass", distance: "5.1KM", beds: 3, baths: 2, price: 250000, img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6", badge: "Active", rating: 4.5, category: "Buy", verified: true, type: "Apartment" },
      { id: 2, title: "Palm Vista, Ocean Drive", location: "Bayfront, Ocean View Estate", distance: "1.2KM", beds: 4, baths: 3, price: 420000, img: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c3f5", badge: "Luxury", rating: 4.8, category: "Buy", verified: true, type: "Villa" },
      { id: 3, title: "Maplewood Family Home", location: "Maplewood Crescent", distance: "3.8KM", beds: 3, baths: 2, price: 320000, img: "https://images.unsplash.com/photo-1505691723518-36a5ac3b2d95", badge: "Trending", rating: 4.6, category: "Buy", verified: true, type: "House" },
      { id: 4, title: "Garden Court Residences", location: "Rose Avenue", distance: "2.4KM", beds: 5, baths: 4, price: 690000, img: "https://images.unsplash.com/photo-1501183638710-841dd1904471", badge: "Active", rating: 4.9, category: "Buy", verified: true, type: "Estate" },
      // RENT
      { id: 5, title: "City Loft Downtown", location: "Central Business District", distance: "850m", beds: 2, baths: 1, price: 1800, priceSuffix: "/mo", img: "https://images.unsplash.com/photo-1448630360428-65456885c650", badge: "New", rating: 4.2, category: "Rent", verified: false, type: "Loft" },
      { id: 6, title: "Riverside Studio", location: "Eastbank Promenade", distance: "600m", beds: 1, baths: 1, price: 1200, priceSuffix: "/mo", img: "https://images.unsplash.com/photo-1494526585095-c41746248156", badge: "New", rating: 4.1, category: "Rent", verified: false, type: "Studio" },
      { id: 7, title: "Skyline Penthouse", location: "High Street Tower", distance: "1.1KM", beds: 2, baths: 2, price: 3500, priceSuffix: "/mo", img: "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1", badge: "Luxury", rating: 4.7, category: "Rent", verified: true, type: "Penthouse" },
      // LUXURY
      { id: 8, title: "Azure Pool Retreat", location: "Palm Grove Estate", distance: "4.5KM", beds: 6, baths: 5, price: 1200000, img: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae", badge: "Luxury", rating: 4.9, category: "Luxury", verified: true, type: "Resort Home" },
      { id: 9, title: "Clifftop Villa", location: "Ocean Crest", distance: "7.2KM", beds: 5, baths: 4, price: 980000, img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb", badge: "Trending", rating: 4.8, category: "Luxury", verified: true, type: "Villa" },
      // TRENDING
      { id: 10, title: "A-Frame Mountain Cabin", location: "Pine Ridge", distance: "12KM", beds: 3, baths: 2, price: 540000, img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb", badge: "Trending", rating: 4.7, category: "Trending", verified: true, type: "Cabin" },
      { id: 11, title: "Minimal White Villa", location: "Snowy Oaks", distance: "9.4KM", beds: 4, baths: 3, price: 760000, img: "https://images.unsplash.com/photo-1599427303058-f04f1a9d1f96", badge: "Trending", rating: 4.6, category: "Trending", verified: true, type: "Villa" },
      { id: 12, title: "Glasshouse Retreat", location: "Cedar Lake", distance: "6.3KM", beds: 4, baths: 3, price: 880000, img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85", badge: "Trending", rating: 4.8, category: "Trending", verified: true, type: "Retreat" },
      // NEW
      { id: 13, title: "Scandi Courtyard Home", location: "Birch Lane", distance: "2.1KM", beds: 3, baths: 2, price: 410000, img: "https://images.unsplash.com/photo-1523217582562-09d0def993a6", badge: "New", rating: 4.4, category: "New", verified: false, type: "House" },
      { id: 14, title: "Cityline Apartments", location: "Downtown Core", distance: "1.9KM", beds: 2, baths: 2, price: 2300, priceSuffix: "/mo", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267", badge: "New", rating: 4.3, category: "New", verified: false, type: "Apartment" },
      // MORE
      { id: 15, title: "Oakridge Bungalow", location: "Oakridge Drive", distance: "4.0KM", beds: 3, baths: 2, price: 290000, img: "https://images.unsplash.com/photo-1484154218962-a197022b5858", badge: "Active", rating: 4.2, category: "Buy", verified: false, type: "Bungalow" },
      { id: 16, title: "Modern Chef Kitchen Loft", location: "Market District", distance: "2.8KM", beds: 1, baths: 1, price: 2100, priceSuffix: "/mo", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85", badge: "New", rating: 4.5, category: "Rent", verified: false, type: "Loft" },
      { id: 17, title: "Sunset Ridge House", location: "Sunset Blvd", distance: "6.9KM", beds: 4, baths: 3, price: 520000, img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb", badge: "Trending", rating: 4.6, category: "Buy", verified: true, type: "House" },
      { id: 18, title: "Penthouse Terrace", location: "City Heights", distance: "1.4KM", beds: 3, baths: 3, price: 5200, priceSuffix: "/mo", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750", badge: "Luxury", rating: 4.7, category: "Rent", verified: true, type: "Penthouse" },
    ],
    []
  );

  const visibleProps = properties.filter((p) =>
    chip === "All" ? true : p.category === chip || p.badge === chip
  );

  function toggleSave(id) {
    setSavedIds((s) => {
      const ns = new Set(s);
      ns.has(id) ? ns.delete(id) : ns.add(id);
      return ns;
    });
  }

  // Pick some featured slides (first 6 or trending first)
  const featured = useMemo(
    () =>
      [...properties]
        .sort((a, b) => (a.badge === "Trending" ? -1 : 1))
        .slice(0, 6),
    [properties]
  );

  // swipe/drag on the chips row
  const chipsRef = useRef(null);
  useSwipeScroll(chipsRef);

  return (
    <div className="min-h-dvh bg-[#F3F2EE] text-[#2E6247]">
      <div className="mx-auto max-w-[520px] min-h-dvh flex flex-col">
        {/* ===== Premium Top Header ===== */}
        <header
          className="relative text-white px-5 pb-5 rounded-b-[28px]"
          style={{
            paddingTop: "calc(env(safe-area-inset-top,0px) + 16px)",
            background:
              "radial-gradient(110% 80% at -10% -10%, #3a7a5b 0%, rgba(58,122,91,0) 60%), linear-gradient(180deg,#2E6247 0%,#24523B 70%)",
          }}
        >
          <div className="flex items-center justify-between">
            <button className="inline-grid place-items-center rounded-full bg-white/15 p-2 active:scale-95 transition">
              <HomeIcon className="size-5" />
            </button>

            <div className="text-center">
              <div className="text-[11px] text-white/80">Current location</div>
              <div className="flex items-center gap-1 text-[13px] font-medium">
                <PinIcon className="size-4" />
                <span>24, michael, US</span>
                <ChevronIcon className="size-4" />
              </div>
            </div>

            <button className="relative inline-grid place-items-center rounded-full bg-white/15 p-2 active:scale-95 transition">
              <BellIcon className="size-5" />
              <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-rose-400 ring-2 ring-[#24523B]" />
            </button>
          </div>

          {/* search + filter */}
          <div className="mt-3 flex items-center gap-3">
            <label className="flex-1 relative">
              <input
                type="text"
                placeholder="Search properties, cities…"
                className="w-full h-11 rounded-full bg-white/95 text-[#2E6247] pl-10 pr-4 outline-none placeholder:text-[#2E6247]/50 shadow-sm"
              />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#2E6247]/60" />
            </label>
            <button className="inline-grid place-items-center h-11 w-11 rounded-full bg-white/95 text-[#2E6247] shadow-sm active:scale-95 transition">
              <FilterIcon className="size-5" />
            </button>
          </div>

          {/* chips (now swipe/drag friendly) */}
          <div
            ref={chipsRef}
            className="mt-3 flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory cursor-grab"
            style={{
              WebkitOverflowScrolling: "touch",
              touchAction: "pan-x pinch-zoom",
              scrollSnapType: "x mandatory",
            }}
          >
            {["Buy", "Rent", "New", "Trending", "Luxury", "All"].map((c) => (
              <Chip key={c} active={chip === c} onClick={() => setChip(c)}>
                {c}
              </Chip>
            ))}
          </div>
        </header>

        {/* ===== Featured swipeable carousel ===== */}
        <FeaturedCarousel items={featured} />

        {/* ===== Content ===== */}
        <main className="flex-1 px-5 pb-28">
          {/* header row */}
          <div className="mt-2 flex items-center justify-between">
            <h2 className="text-[17px] font-semibold text-[#2E6247]">
              Recommended for you
            </h2>
            <button className="flex items-center gap-1 text-sm text-[#2E6247]/70">
              By default <ChevronIcon className="size-4" />
            </button>
          </div>

          {/* cards list */}
          <div className="mt-3 space-y-4">
            {visibleProps.map((p) => (
              <PropertyCard
                key={p.id}
                data={p}
                saved={savedIds.has(p.id)}
                onToggleSave={() => toggleSave(p.id)}
              />
            ))}
          </div>
        </main>

        {/* ===== Floating bottom nav (glass) ===== */}
        <nav
          className="fixed left-1/2 -translate-x-1/2 bottom-[calc(env(safe-area-inset-bottom,0px)+16px)] z-10"
          aria-label="Primary"
        >
          <div className="flex items-center gap-3 rounded-full bg-white/70 backdrop-blur-xl ring-1 ring-black/5 shadow-lg px-3 py-2">
            <button className="size-10 grid place-items-center rounded-full bg-[#2E6247] text-white active:scale-95">
              <HomeIcon className="size-5" />
            </button>
            <button className="size-10 grid place-items-center rounded-full bg-[#2E6247]/10 text-[#2E6247] active:scale-95">
              <ChatIcon className="size-5" />
            </button>
            <button className="size-10 grid place-items-center rounded-full bg-[#2E6247]/10 text-[#2E6247] active:scale-95">
              <BookmarkIcon className="size-5" />
            </button>
            <button className="size-10 grid place-items-center rounded-full bg-[#2E6247]/10 text-[#2E6247] active:scale-95">
              <UserIcon className="size-5" />
            </button>
            <button className="size-10 grid place-items-center rounded-full bg-[#2E6247]/10 text-[#2E6247] active:scale-95">
              <LinkIcon className="size-5" />
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

/* ================= Featured Carousel ================= */
function FeaturedCarousel({ items }) {
  const scrollerRef = useRef(null);
  useSwipeScroll(scrollerRef);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const w = el.clientWidth;
      const i = Math.round(el.scrollLeft / (w * 0.9)); // because slides are ~90% width
      setIdx(i);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="px-5 -mt-3 mb-2">
      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory cursor-grab"
        style={{
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-x pinch-zoom",
          scrollSnapType: "x mandatory",
        }}
      >
        {items.map((p, i) => (
          <Link
            key={p.id}
            to={`/property/${p.id}`}
            state={p}
            className="min-w-[90%] snap-start relative rounded-2xl overflow-hidden ring-1 ring-black/5 bg-white"
          >
            <div className="relative aspect-[20/11]">
              <SmartImg
                src={p.img}
                alt={p.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0" />
              <div className="absolute left-3 bottom-3 right-3 text-white">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs ring-1 ring-white/25">
                  <StarIcon className="size-4" />
                  {p.rating.toFixed(1)} • {p.type}
                </div>
                <div className="mt-2 text-[16px] font-semibold leading-tight drop-shadow">
                  {p.title}
                </div>
                <div className="mt-1 text-[13px] text-white/90">
                  ${formatPrice(p.price)}
                  {p.priceSuffix || ""}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* dots */}
      <div className="flex justify-center gap-1.5">
        {items.map((_, i) => (
          <span
            key={i}
            className={
              "h-1.5 rounded-full transition-all " +
              (idx === i ? "w-5 bg-[#2E6247]" : "w-2 bg-[#2E6247]/30")
            }
          />
        ))}
      </div>
    </section>
  );
}

/* ================= Components ================= */
function PropertyCard({ data, saved, onToggleSave }) {
  const {
    title,
    location,
    distance,
    beds,
    baths,
    price,
    priceSuffix,
    img,
    badge,
    rating,
    verified,
    id,
  } = data;

  const fullStars = Math.floor(rating ?? 0);
  const half = (rating ?? 0) - fullStars >= 0.5;

  return (
    <article className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden group">
      {/* image */}
      <div className="relative aspect-[16/9]">
        <SmartImg
          src={img}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        {badge && (
          <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-emerald-500 text-white text-xs font-semibold px-3 py-1 shadow">
            {badge}
          </span>
        )}
        <div className="absolute right-3 top-3 flex gap-2">
          <IconPill><EditIcon className="size-4" /></IconPill>
          <IconPill><LinkIcon className="size-4" /></IconPill>
        </div>
        <div className="absolute left-3 bottom-3 flex items-center gap-1 rounded-full bg-black/60 text-white px-3 py-1.5 text-sm font-semibold">
          <DollarIcon className="size-4" /> {formatPrice(price)}
          {priceSuffix && <span className="ml-0.5 opacity-90">{priceSuffix}</span>}
        </div>
        <button
          onClick={onToggleSave}
          className="absolute right-3 bottom-3 size-9 grid place-items-center rounded-full bg-white/90 text-[#2E6247] shadow active:scale-95"
          aria-label="Save"
        >
          {saved ? <BookmarkSolidIcon className="size-5" /> : <BookmarkIcon className="size-5" />}
        </button>
      </div>

      {/* content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[16px] font-semibold text-[#2E6247] leading-snug">
            {title}
          </h3>
          {verified && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2.5 py-1 ring-1 ring-emerald-200">
              <ShieldIcon className="size-3.5" /> Verified
            </span>
          )}
        </div>

        <div className="mt-1 flex items-center gap-2 text-sm text-[#2E6247]/70">
          <PinIcon className="size-4" />
          <span>
            {location} ({distance})
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-[#2E6247]/80">
            <span className="inline-flex items-center gap-1">
              <BedIcon className="size-4" /> {beds} bedrooms
            </span>
            <span className="inline-flex items-center gap-1">
              <BathIcon className="size-4" /> {baths} baths
            </span>
          </div>
          <div className="inline-flex items-center gap-0.5 text-amber-500">
            {Array.from({ length: fullStars }).map((_, i) => (
              <StarIcon key={i} className="size-4" />
            ))}
            {half && <StarHalfIcon className="size-4" />}
          </div>
        </div>

        {/* View details -> navigate, pass state */}
        <Link
          to={`/property/${id}`}
          state={data}
          className="mt-4 w-full inline-flex justify-center rounded-xl py-2.5 text-sm font-semibold text-white bg-[#2E6247] hover:bg-[#27563E] active:scale-[.99] transition"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}

function Chip({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={
        "px-3.5 py-2 rounded-full text-sm font-semibold transition snap-start " +
        (active
          ? "bg-white text-[#2E6247] shadow ring-1 ring-black/5"
          : "bg-white/20 text-white/90 ring-1 ring-white/25 hover:bg-white/30")
      }
    >
      {children}
    </button>
  );
}

function IconPill({ children }) {
  return (
    <button className="size-9 grid place-items-center rounded-full bg-white/90 backdrop-blur text-[#2E6247] shadow active:scale-95">
      {children}
    </button>
  );
}

/* ================= Helpers ================= */
function formatPrice(n) {
  try {
    return n.toLocaleString();
  } catch {
    return n;
  }
}
function paramUrl(url, params) {
  const hasQ = url.includes("?");
  return url + (hasQ ? "&" : "?") + params;
}

/* Image with blur-in + safe fallback */
function SmartImg({ src, alt, className = "" }) {
  const [loaded, setLoaded] = useState(false);
  const [broken, setBroken] = useState(false);
  const FALLBACK = "https://images.unsplash.com/photo-1493809842364-78817add7ffb";
  const primary = paramUrl(src, "auto=format&fit=crop&w=1600&q=80");
  const fallback = paramUrl(FALLBACK, "auto=format&fit=crop&w=1600&q=80");

  return (
    <div className={"relative " + (className.includes("h-full") ? "" : "h-full")}>
      {!loaded && <div className="absolute inset-0 bg-neutral-200 animate-pulse" />}
      <img
        src={broken ? fallback : primary}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (!broken) {
            setBroken(true);
            setLoaded(false);
          } else {
            setLoaded(true);
          }
        }}
        className={className + (loaded ? "" : " opacity-0")}
        style={{ transition: "opacity .3s ease" }}
        srcSet={[
          (broken ? fallback : primary).replace("w=1600", "w=800") + " 800w",
          (broken ? fallback : primary).replace("w=1600", "w=1200") + " 1200w",
          (broken ? fallback : primary) + " 1600w",
        ].join(", ")}
        sizes="(max-width: 520px) 100vw, 520px"
      />
    </div>
  );
}

/* ================= Inline Icons ================= */
function PinIcon({ className }) { return (<svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"/></svg>); }
function ChevronIcon({ className }) { return (<svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M8.5 10l3.5 3.5L15.5 10"/></svg>); }
function BellIcon({ className }) { return (<svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2Zm6-6V11a6 6 0 1 0-12 0v5l-2 2v1h18v-1l-2-2Z"/></svg>); }
function SearchIcon({ className }) { return (<svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M10 2a8 8 0 1 0 5 14.3l4.6 4.6 1.4-1.4-4.6-4.6A8 8 0 0 0 10 2Zm0 2a6 6 0 1 1 0 12A6 6 0 0 1 10 4Z"/></svg>); }
function FilterIcon({ className }) { return (<svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M3 5h18v2H3V5Zm4 6h10v2H7v-2Zm3 6h4v2h-4v-2Z"/></svg>); }
function HouseIcon({ className }) { return (<svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M12 3 3 10h2v10h5v-6h4v6h5V10h2L12 3z"/></svg>); }
function EditIcon({ className }) { return (<svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M3 17.2V21h3.8l11-11-3.8-3.8-11 11Zm17.7-10.9a1 1 0 0 0 0-1.4l-1.6-1.6a1 1 0 0 0-1.4 0L15.6 4.4l3.8 3.8 1.3-1.9Z"/></svg>); }
function LinkIcon({ className }) { return (<svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M8.5 12a3.5 3.5 0 0 1 3.5-3.5h3V6h-3A6 6 0 1 0 18 12a6 6 0 0 0-.7-2.8l-1.8.9c.3.6.5 1.2.5 1.9a3.5 3.5 0 1 1-3.5-3.5h3V6h-3A6 6 0 0 0 8.5 12Z"/></svg>); }
function BookmarkIcon({ className }) { return (<svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M6 2h12a1 1 0 0 1 1 1v19l-7-3-7 3V3a1 1 0 0 1 1-1Z"/></svg>); }
function BookmarkSolidIcon({ className }) { return (<svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M6 2h12a1 1 0 0 1 1 1v19l-7-3-7 3V3a1 1 0 0 1 1-1Z"/></svg>); }
function BedIcon({ className }) { return (<svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M4 10V6h16v4h-6V8H4v2Zm18 2H2v6h2v-2h16v2h2v-6Z"/></svg>); }
function BathIcon({ className }) { return (<svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M7 3a3 3 0 0 1 3 3v2h10v6H4v-6h4V6a1 1 0 0 0-2 0v1H4V6a3 3 0 0 1 3-3Zm-3 12h16v2H4v-2Zm-1 3h18v2H3v-2Z"/></svg>); }
function HomeIcon({ className }) { return (<svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M12 3 3 10h2v10h5v-6h4v6h5V10h2L12 3Z"/></svg>); }
function ChatIcon({ className }) { return (<svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M20 2H4a2 2 0 0 0-2 2v16l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"/></svg>); }
function UserIcon({ className }) { return (<svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5Z"/></svg>); }
function DollarIcon({ className }) { return (<svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M12 2a1 1 0 0 1 1 1v1.1c1.8.2 3.3 1.2 3.3 3 0 2.2-2 3-4.2 3.6s-3.8 1-3.8 2.3 1.3 2 3 2.1V18a1 1 0 0 1-2 0v-.8c-2-.2-3.6-1.3-3.6-3.2 0-2.3 2-3.2 4.3-3.8 2-.6 3.7-1 3.7-2.1 0-.7-.6-1.2-1.6-1.3V4a1 1 0 0 1 1-1Z"/></svg>); }
function StarIcon({ className }) { return (<svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="m12 2 2.9 6 6.6.9-4.8 4.4 1.2 6.5L12 17l-5.9 2.8 1.2-6.5L2.5 8.9l6.6-.9L12 2Z"/></svg>); }
function StarHalfIcon({ className }) { return (<svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="m12 2 2.9 6 6.6.9-4.8 4.4 1.2 6.5L12 17l-5.9 2.8 1.2-6.5L2.5 8.9l6.6-.9L12 2Z"/><path d="M12 2v15l-5.9 2.8 1.2-6.5L2.5 8.9l6.6-.9L12 2Z" fill="white" opacity=".55"/></svg>); }
function ShieldIcon({ className }) { return (<svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M12 2 4 5v7c0 5 3.7 8.6 8 10 4.3-1.4 8-5 8-10V5l-8-3Z"/></svg>); }