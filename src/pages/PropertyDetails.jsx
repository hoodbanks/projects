// src/pages/PropertyDetails.jsx
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";

export default function PropertyDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  // Fallback if user hits URL directly
  const data = useMemo(
    () =>
      state || {
        id,
        title: "Jumeirah Village Triangle Dubai",
        location: "Jumeirah Village Triangle Dubai",
        price: 5000,
        priceSuffix: "/month",
        beds: 3,
        baths: 2,
        rating: 4.9,
        type: "Apartment",
        img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      },
    [state, id]
  );

  // ---- Premium copy generator ----
  const copy = useMemo(() => buildCopy(data), [data]);

  const [saved, setSaved] = useState(false);
  const [more, setMore] = useState(false);

  return (
    <div className="min-h-dvh bg-[#F3F2EE] text-[#2E6247]">
      <div className="mx-auto max-w-[520px] min-h-dvh flex flex-col">

        {/* ===== Big header image ===== */}
        <div className="relative" style={{ paddingTop: "calc(env(safe-area-inset-top,0px) + 10px)" }}>
          <div className="px-3">
            <div className="relative overflow-hidden rounded-[28px]">
              <SmartImg
                src={data.img}
                alt={data.title}
                className="w-full h-[310px] object-cover"
              />

              {/* Top actions */}
              <div className="absolute left-3 top-3 flex items-center gap-2">
                <CircleBtn onClick={() => navigate(-1)}>
                  <ArrowLeftIcon className="size-5" />
                </CircleBtn>
              </div>
              <div className="absolute right-3 top-3 flex items-center gap-2">
                <CircleBtn onClick={() => navigator.share?.({ title: data.title, url: window.location.href })}>
                  <ShareIcon className="size-5" />
                </CircleBtn>
                <CircleBtn onClick={() => setSaved(s => !s)}>
                  {saved ? <HeartSolidIcon className="size-5" /> : <HeartIcon className="size-5" />}
                </CircleBtn>
              </div>

              {/* Chips over image */}
              <div className="absolute left-3 bottom-3 flex items-center gap-2">
                <ChipSolid>
                  <StarIcon className="size-4 mr-1" />
                  {Number(data.rating || 0).toFixed(1)}
                </ChipSolid>
                <ChipSolid>{data.type || "Apartment"}</ChipSolid>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Body ===== */}
        <main className="flex-1 px-5 pt-4 pb-40">
          {/* title + bookmark */}
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-[22px] leading-tight font-extrabold tracking-[-0.01em]">
              {data.title}
            </h1>
            <button
              onClick={() => setSaved(s => !s)}
              className="mt-1 text-[#2E6247]/70 hover:text-[#2E6247]"
              aria-label="Save"
            >
              {saved ? <BookmarkSolidIcon className="size-6" /> : <BookmarkIcon className="size-6" />}
            </button>
          </div>

          {/* location */}
          <div className="mt-1 flex items-center gap-2 text-sm text-[#2E6247]/70">
            <PinIcon className="size-4" />
            <span>{data.location}</span>
          </div>

          {/* description */}
          <section className="mt-5">
            <h2 className="text-[16px] font-semibold">Property Description</h2>
            <p className="mt-2 text-[13.5px] leading-relaxed text-[#2E6247]/80">
              {more ? copy.long : copy.short}
              {!more && <span className="opacity-60">{"  More...."}</span>}
            </p>

            {/* highlights */}
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {copy.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-[13px] text-[#2E6247]/85">
                  <CheckIcon className="mt-0.5 size-4 text-emerald-600" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setMore(m => !m)}
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold"
            >
              {more ? "Show less" : "Show more"} <ArrowRightIcon className="size-4" />
            </button>
          </section>
        </main>

        {/* ===== Sticky booking bar ===== */}
        <div
          className="fixed left-1/2 -translate-x-1/2 bottom-[calc(env(safe-area-inset-bottom,0px)+12px)] w-[min(520px,calc(100%-16px))] z-10"
          role="toolbar"
        >
          <div className="flex items-center gap-2 rounded-[28px] px-2 py-2 bg-black/85 text-white shadow-xl">
            <div className="px-4 py-3 rounded-[22px] bg-black/0 text-[14px] font-semibold">
              ${formatPrice(data.price)}{data.priceSuffix ?? ""}
            </div>
            <div className="flex-1 grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 rounded-[16px] bg-white/10 px-3 py-2.5 text-[13px]">
                <CalendarIcon className="size-4" /> June 23 – 27
              </div>
              <div className="flex items-center gap-2 rounded-[16px] bg-white/10 px-3 py-2.5 text-[13px]">
                <CalendarIcon className="size-4" /> Flexible
              </div>
            </div>
            <button
              className="ml-2 size-12 grid place-items-center rounded-full bg-[#2E6247] hover:bg-[#27563E] active:scale-95 transition"
              aria-label="Continue"
            >
              <ArrowRightIcon className="size-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========= Premium copy generator ========= */
function buildCopy(d) {
  const beds = d.beds ?? 3;
  const baths = d.baths ?? 2;
  const type = d.type || "home";
  const where = d.location || "a sought-after neighborhood";
  const rating = d.rating ? ` Rated ${Number(d.rating).toFixed(1)} by recent guests.` : "";

  // If caller already provided desc, keep it and enrich the long version
  if (d.desc) {
    return {
      short: d.desc,
      long:
        `${d.desc} Thoughtful finishes, generous storage and a calm color palette create a truly move-in-ready space. Enjoy an open-plan living area, oversized windows for natural light, and seamless indoor-outdoor flow to a private terrace.${rating}`,
      highlights: defaultHighlights(d),
    };
  }

  const short = `This ${beds}-bedroom, ${baths}-bath ${type.toLowerCase()} in ${where} combines modern architecture with warm, livable design. An airy open plan, full-height glazing and premium finishes make day-to-day living effortless.`;
  const long =
    `${short} The chef’s kitchen features quality cabinetry and integrated appliances, while the primary suite offers a tranquil retreat with generous wardrobe space. Additional perks include secure entry, climate control and dedicated parking. Outdoor areas invite relaxed entertaining and quiet mornings with coffee.${rating}`;

  return { short, long, highlights: defaultHighlights(d) };
}

function defaultHighlights(d) {
  const list = [
    `${d.beds ?? 3} comfortable bedrooms • ${d.baths ?? 2} stylish baths`,
    "Bright open-plan living with floor-to-ceiling windows",
    "Modern kitchen with premium finishes and breakfast bar",
    "Private balcony / terrace for outdoor dining",
    "Quiet, well-kept community close to shops & parks",
    "Move-in ready; fast internet and smart-home friendly",
  ];
  if (d.type?.toLowerCase().includes("penthouse")) list.unshift("Panoramic skyline views from upper floors");
  if (d.type?.toLowerCase().includes("villa")) list.unshift("Separate lounge + garden perfect for hosting");
  return list.slice(0, 6);
}

/* ========= small UI helpers ========= */
function CircleBtn({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="size-9 grid place-items-center rounded-full bg-white/95 text-[#2E6247] shadow active:scale-95"
    >
      {children}
    </button>
  );
}
function ChipSolid({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-black/50 text-white text-xs font-semibold px-3 py-1 backdrop-blur">
      {children}
    </span>
  );
}

/* ========= image helper (blur-in + fallback) ========= */
function SmartImg({ src, alt, className = "" }) {
  const [loaded, setLoaded] = useState(false);
  const [broken, setBroken] = useState(false);
  const FALLBACK = "https://images.unsplash.com/photo-1493809842364-78817add7ffb";
  const url = (broken ? FALLBACK : src) + "?auto=format&fit=crop&w=1600&q=80";
  return (
    <div className="relative">
      {!loaded && <div className="absolute inset-0 bg-neutral-200 animate-pulse" />}
      <img
        src={url}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (!broken) setBroken(true);
          else setLoaded(true);
        }}
        className={className + (loaded ? "" : " opacity-0")}
        style={{ transition: "opacity .3s ease" }}
      />
    </div>
  );
}

function formatPrice(n) {
  try { return Number(n).toLocaleString(); } catch { return n; }
}

/* ========= inline icons ========= */
function ArrowLeftIcon({ className }) { return (<svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M14 6l-6 6 6 6"/></svg>); }
function ArrowRightIcon({ className }) { return (<svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M10 6l6 6-6 6"/></svg>); }
function ShareIcon({ className }) { return (<svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M14 9V5l7 7-7 7v-4H4V9h10Z"/></svg>); }
function HeartIcon({ className }) { return (<svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M12 21s-6.7-4.6-9.3-7.3A6.6 6.6 0 0 1 12 4a6.6 6.6 0 0 1 9.3 9.7C18.7 16.4 12 21 12 21Z"/></svg>); }
function HeartSolidIcon({ className }) { return (<svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M12 21s-6.7-4.6-9.3-7.3A6.6 6.6 0 0 1 12 4a6.6 6.6 0 0 1 9.3 9.7C18.7 16.4 12 21 12 21Z"/></svg>); }
function StarIcon({ className }) { return (<svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="m12 2 2.9 6 6.6.9-4.8 4.4 1.2 6.5L12 17l-5.9 2.8 1.2-6.5L2.5 8.9l6.6-.9L12 2Z"/></svg>); }
function PinIcon({ className }) { return (<svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"/></svg>); }
function BookmarkIcon({ className }) { return (<svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M6 2h12a1 1 0 0 1 1 1v19l-7-3-7 3V3a1 1 0 0 1 1-1Z"/></svg>); }
function BookmarkSolidIcon({ className }) { return (<svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M6 2h12a1 1 0 0 1 1 1v19l-7-3-7 3V3a1 1 0 0 1 1-1Z"/></svg>); }
function CalendarIcon({ className }) { return (<svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M7 2h2v2h6V2h2v2h3v18H4V4h3V2Zm12 8H5v10h14V10Z"/></svg>); }
function CheckIcon({ className }) { return (<svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="m9.5 16.6-4.2-4.2 1.4-1.4 2.8 2.8 8-8 1.4 1.4-9.4 9.4Z"/></svg>); }