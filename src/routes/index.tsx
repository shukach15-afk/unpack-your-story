import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

/* -------------------------------------------------------------------------- */
/*  Reveal-on-scroll hook                                                     */
/* -------------------------------------------------------------------------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal, .bloom");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */
const projects = [
  {
    title: "Braille Bridge",
    kind: "AI · Accessibility",
    year: "2025",
    body: "A tactile learning companion that translates textbook diagrams into refreshable-braille descriptions using a small on-device VLM. Piloted with two schools in Dehradun.",
    note: "co-designed with blind students",
  },
  {
    title: "Root Cause",
    kind: "AI · Sustainability",
    year: "2024",
    body: "Satellite + soil-sensor pipeline that predicts crop stress 11 days earlier than existing NDVI baselines. Open dataset released with 42k labelled plots.",
    note: "IEEE undergrad research",
  },
  {
    title: "Quiet Hours",
    kind: "Product · Accessibility",
    year: "2024",
    body: "A macOS focus companion for neurodivergent students. Ambient background scenes, breath-paced typing, no streaks, no shame.",
    note: "500+ students, still growing",
  },
];

const achievements = [
  { label: "Smith College Grace Hopper Scholar", year: "2025" },
  { label: "Winner · Google Solution Challenge, APAC", year: "2024" },
  { label: "Published · ACM CHI Late-Breaking Work", year: "2024" },
  { label: "Fellow · Mozilla Responsible AI Cohort", year: "2023" },
];

const values = [
  { name: "Accessibility", note: "Design for the edges. The middle takes care of itself." },
  { name: "Curiosity", note: "Follow the question longer than feels comfortable." },
  { name: "Impact", note: "Ship the small useful thing before the big impressive one." },
];

const polaroids = [
  { caption: "hackathon, 3am", place: "Bangalore · 2024", tilt: -6 },
  { caption: "field research", place: "Uttarakhand · 2024", tilt: 4 },
  { caption: "first paper accepted", place: "Delhi · 2024", tilt: -2 },
  { caption: "campus, in between", place: "Manipal · 2023", tilt: 5 },
  { caption: "trail, alone", place: "Kasol · 2023", tilt: -4 },
];

/* -------------------------------------------------------------------------- */
/*  Illustrated objects (inline SVG for tactile control)                      */
/* -------------------------------------------------------------------------- */

function Meadow() {
  // Layered horizon: sky wash, distant hills, meadow, tall grass.
  return (
    <svg
      viewBox="0 0 1440 700"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="oklch(0.94 0.02 90)" />
          <stop offset="0.7" stopColor="oklch(0.96 0.025 85)" />
          <stop offset="1" stopColor="oklch(0.9 0.04 110)" />
        </linearGradient>
        <linearGradient id="meadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="oklch(0.82 0.06 125)" />
          <stop offset="1" stopColor="oklch(0.68 0.07 135)" />
        </linearGradient>
      </defs>
      <rect width="1440" height="700" fill="url(#sky)" />
      {/* soft sun */}
      <circle cx="1120" cy="180" r="90" fill="oklch(0.95 0.05 90 / 0.5)" />
      <circle cx="1120" cy="180" r="55" fill="oklch(0.97 0.04 85 / 0.6)" />
      {/* far hills */}
      <path
        d="M0 470 Q 240 400 480 440 T 960 430 T 1440 450 L1440 700 L0 700 Z"
        fill="oklch(0.72 0.05 140 / 0.9)"
      />
      <path
        d="M0 520 Q 300 470 620 500 T 1200 495 T 1440 510 L1440 700 L0 700 Z"
        fill="url(#meadow)"
      />
      {/* grass tufts */}
      {Array.from({ length: 40 }).map((_, i) => {
        const x = (i * 37) % 1440;
        const y = 560 + ((i * 13) % 90);
        return (
          <g key={i} className="anim-sway" style={{ animationDelay: `${(i % 7) * 0.3}s`, transformOrigin: `${x}px ${y + 12}px` }}>
            <path
              d={`M${x} ${y + 14} q -3 -10 0 -18 M${x} ${y + 14} q 3 -8 6 -16 M${x} ${y + 14} q -3 -6 -6 -13`}
              stroke="oklch(0.5 0.08 140)"
              strokeWidth="1.2"
              fill="none"
            />
          </g>
        );
      })}
      {/* birds */}
      <g className="anim-bird" style={{ animationDelay: "3s" }}>
        <path d="M60 150 q 6 -6 12 0 q 6 -6 12 0" stroke="oklch(0.35 0.02 60)" strokeWidth="1.5" fill="none" />
      </g>
      <g className="anim-bird" style={{ animationDelay: "12s" }}>
        <path d="M60 190 q 5 -5 10 0 q 5 -5 10 0" stroke="oklch(0.35 0.02 60)" strokeWidth="1.2" fill="none" />
      </g>
    </svg>
  );
}

function Basket({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 320 260" className="h-64 w-80 md:h-80 md:w-96" aria-hidden>
      <defs>
        <pattern id="weave" width="14" height="10" patternUnits="userSpaceOnUse">
          <path d="M0 5 Q 3.5 0 7 5 T 14 5" stroke="oklch(0.45 0.07 50)" strokeWidth="1.2" fill="none" />
          <path d="M0 5 Q 3.5 10 7 5 T 14 5" stroke="oklch(0.35 0.06 45)" strokeWidth="1" fill="none" />
        </pattern>
      </defs>
      {/* shadow */}
      <ellipse cx="160" cy="238" rx="130" ry="12" fill="oklch(0.3 0.04 60 / 0.25)" />
      {/* body */}
      <path
        d="M40 130 L60 232 Q 160 250 260 232 L280 130 Z"
        fill="url(#weave)"
        stroke="oklch(0.35 0.06 45)"
        strokeWidth="2"
      />
      {/* rim */}
      <ellipse cx="160" cy="130" rx="120" ry="16" fill="oklch(0.55 0.08 55)" stroke="oklch(0.35 0.06 45)" strokeWidth="2" />
      <ellipse cx="160" cy="130" rx="120" ry="16" fill="url(#weave)" opacity="0.5" />
      {/* handle */}
      <path
        d="M60 130 Q 160 20 260 130"
        fill="none"
        stroke="oklch(0.42 0.07 50)"
        strokeWidth="10"
        strokeLinecap="round"
        style={{
          transform: open ? "translateY(-4px) rotate(-2deg)" : "none",
          transformOrigin: "160px 130px",
          transition: "transform 1.2s cubic-bezier(0.2,0.7,0.2,1)",
        }}
      />
      {/* lid (opens) */}
      <g
        style={{
          transform: open ? "rotate(-42deg) translate(-6px,-4px)" : "rotate(0)",
          transformOrigin: "60px 130px",
          transition: "transform 1.6s cubic-bezier(0.2,0.7,0.2,1)",
        }}
      >
        <ellipse cx="160" cy="128" rx="122" ry="14" fill="oklch(0.6 0.075 55)" stroke="oklch(0.35 0.06 45)" strokeWidth="2" />
        <ellipse cx="160" cy="128" rx="122" ry="14" fill="url(#weave)" opacity="0.7" />
      </g>
      {/* card peeking */}
      {open && (
        <g className="reveal in" style={{ animationDelay: "0.6s" }}>
          <rect x="118" y="90" width="120" height="70" rx="2" fill="oklch(0.97 0.015 85)" stroke="oklch(0.7 0.03 70)" transform="rotate(-4 178 125)" />
        </g>
      )}
    </svg>
  );
}

function Notebook({ pageIndex, onPrev, onNext }: { pageIndex: number; onPrev: () => void; onNext: () => void }) {
  const p = projects[pageIndex];
  return (
    <div className="relative mx-auto w-full max-w-4xl">
      {/* Notebook body */}
      <div className="relative grid grid-cols-2 rounded-md paper-card overflow-hidden" style={{ aspectRatio: "16/10" }}>
        {/* binding */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-full w-6 -translate-x-1/2 z-10"
             style={{ background: "linear-gradient(90deg, oklch(0.3 0.05 60 / 0.18), transparent 30%, transparent 70%, oklch(0.3 0.05 60 / 0.18))" }} />
        {/* left page */}
        <div className="tex-paper relative p-8 md:p-12">
          <div className="tex-grain absolute inset-0" />
          <div key={`l-${pageIndex}`} className="relative reveal in">
            <div className="font-mono text-[10px] tracking-widest uppercase text-[color:var(--ink-soft)]">
              Project · {String(pageIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </div>
            <h3 className="mt-4 font-serif text-4xl md:text-5xl leading-[1.05] text-[color:var(--ink)]">
              {p.title}
            </h3>
            <div className="mt-3 font-mono text-xs text-[color:var(--wood-dark)]">{p.kind} — {p.year}</div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[color:var(--ink-soft)]">{p.body}</p>
          </div>
        </div>
        {/* right page */}
        <div className="tex-paper relative p-8 md:p-12">
          <div className="tex-grain absolute inset-0" />
          <div key={`r-${pageIndex}`} className="relative reveal in flex h-full flex-col">
            {/* sketch */}
            <svg viewBox="0 0 300 200" className="w-full flex-1">
              <rect x="12" y="12" width="276" height="176" fill="none" stroke="oklch(0.5 0.05 60 / 0.4)" strokeDasharray="4 4" />
              <path d="M40 150 Q 100 60 160 110 T 260 80" fill="none" stroke="oklch(0.42 0.11 25)" strokeWidth="2" />
              <circle cx="160" cy="110" r="4" fill="oklch(0.42 0.11 25)" />
              <circle cx="260" cy="80" r="4" fill="oklch(0.42 0.11 25)" />
              <text x="46" y="176" fontFamily="JetBrains Mono" fontSize="9" fill="oklch(0.48 0.025 60)">fig. 1 — signal ↗ over 11 days</text>
            </svg>
            <p className="mt-4 font-hand text-2xl text-[color:var(--burgundy)]">— {p.note}</p>
          </div>
          <div className="curl-corner" />
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-[color:var(--ink-soft)]">
        <button
          onClick={onPrev}
          className="rounded-full border border-[color:var(--border)] px-4 py-2 hover:bg-[color:var(--cream-deep)] transition"
          aria-label="Previous project page"
        >
          ← turn back
        </button>
        <span>{pageIndex + 1} / {projects.length}</span>
        <button
          onClick={onNext}
          className="rounded-full border border-[color:var(--border)] px-4 py-2 hover:bg-[color:var(--cream-deep)] transition"
          aria-label="Next project page"
        >
          turn page →
        </button>
      </div>
    </div>
  );
}

function BreadSlice({ a, i }: { a: (typeof achievements)[number]; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={a.label}
        className="group block w-full text-left"
      >
        <svg viewBox="0 0 260 160" className="w-full transition-transform duration-500 group-hover:-translate-y-1.5 group-focus-visible:-translate-y-1.5">
          <defs>
            <radialGradient id={`crust-${i}`} cx="0.5" cy="0.4" r="0.7">
              <stop offset="0" stopColor="oklch(0.78 0.09 65)" />
              <stop offset="0.7" stopColor="oklch(0.62 0.11 55)" />
              <stop offset="1" stopColor="oklch(0.42 0.08 45)" />
            </radialGradient>
          </defs>
          <ellipse cx="130" cy="150" rx="110" ry="8" fill="oklch(0.3 0.04 60 / 0.22)" />
          <path
            d="M30 90 Q 40 30 130 25 Q 220 30 230 90 Q 235 130 200 140 Q 130 152 60 140 Q 25 130 30 90 Z"
            fill={`url(#crust-${i})`}
            stroke="oklch(0.35 0.07 40)"
            strokeWidth="1.5"
          />
          {/* crumb texture */}
          {Array.from({ length: 14 }).map((_, k) => (
            <circle key={k} cx={60 + ((k * 41) % 150)} cy={70 + ((k * 23) % 50)} r="2.2" fill="oklch(0.85 0.05 75 / 0.6)" />
          ))}
          {/* scoring */}
          <path d="M70 60 L 100 45 M 120 55 L 150 40 M 170 60 L 195 48" stroke="oklch(0.35 0.07 40)" strokeWidth="1.2" fill="none" />
        </svg>
        <div className="mt-3 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-widest text-[color:var(--ink-soft)]">
          <span>slice · {String(i + 1).padStart(2, "0")}</span>
          <span>{a.year}</span>
        </div>
      </button>
      {open && (
        <div
          role="region"
          aria-label={`${a.label} details`}
          className="reveal in mt-3 rounded-md bg-[color:var(--cream-deep)] p-4 font-serif text-lg leading-snug text-[color:var(--ink)]"
        >
          {a.label}
        </div>
      )}
      {!open && (
        <div className="mt-3 font-serif text-lg leading-snug text-[color:var(--ink)] line-clamp-2">
          {a.label}
        </div>
      )}
    </div>
  );
}

function Teacup() {
  return (
    <div className="relative">
      {/* steam */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2">
        {[0, 1, 2].map((k) => (
          <span
            key={k}
            className="anim-drift absolute block h-16 w-1 rounded-full bg-[color:var(--ink-soft)]/25"
            style={{ left: `${(k - 1) * 14}px`, animationDelay: `${k * 1.2}s` }}
          />
        ))}
      </div>
      <svg viewBox="0 0 260 200" className="mt-16 h-auto w-64">
        <ellipse cx="130" cy="188" rx="100" ry="7" fill="oklch(0.3 0.04 60 / 0.22)" />
        {/* saucer */}
        <ellipse cx="130" cy="178" rx="110" ry="10" fill="oklch(0.94 0.02 85)" stroke="oklch(0.6 0.03 70)" />
        {/* cup */}
        <path d="M60 100 Q 60 170 130 172 Q 200 170 200 100 Z" fill="oklch(0.96 0.015 85)" stroke="oklch(0.6 0.03 70)" strokeWidth="1.5" />
        {/* tea */}
        <ellipse cx="130" cy="102" rx="68" ry="8" fill="oklch(0.55 0.09 55)" />
        <ellipse cx="130" cy="102" rx="60" ry="5" fill="oklch(0.42 0.08 45)" />
        {/* handle */}
        <path d="M200 115 q 30 0 30 25 q 0 20 -28 20" fill="none" stroke="oklch(0.6 0.03 70)" strokeWidth="4" />
        {/* ring detail */}
        <path d="M70 130 Q 130 138 190 130" fill="none" stroke="oklch(0.72 0.055 145)" strokeWidth="1.2" />
      </svg>
    </div>
  );
}

function Envelope() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group block w-full"
        aria-label={open ? "Close resume" : "Open resume"}
      >
        <svg viewBox="0 0 320 210" className="w-full">
          <defs>
            <linearGradient id="env" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="oklch(0.93 0.025 78)" />
              <stop offset="1" stopColor="oklch(0.86 0.035 72)" />
            </linearGradient>
          </defs>
          {/* body */}
          <rect x="20" y="40" width="280" height="150" rx="3" fill="url(#env)" stroke="oklch(0.6 0.04 65)" />
          {/* flap */}
          <path
            d="M20 40 L 160 130 L 300 40"
            fill="oklch(0.9 0.03 75)"
            stroke="oklch(0.6 0.04 65)"
            style={{
              transformOrigin: "160px 40px",
              transform: open ? "rotateX(170deg)" : "rotateX(0)",
              transition: "transform 900ms cubic-bezier(0.2,0.7,0.2,1)",
            }}
          />
          {/* wax seal */}
          <g style={{ opacity: open ? 0 : 1, transition: "opacity 300ms" }}>
            <circle cx="160" cy="118" r="22" fill="oklch(0.42 0.11 25)" />
            <circle cx="160" cy="118" r="22" fill="oklch(0.35 0.09 25 / 0.5)" />
            <text x="160" y="124" textAnchor="middle" fontFamily="Instrument Serif" fontStyle="italic" fontSize="22" fill="oklch(0.94 0.02 85)">A</text>
          </g>
        </svg>
      </button>
      {open && (
        <div className="reveal in mt-6 paper-card rounded-md p-8 tex-paper relative">
          <div className="tex-grain absolute inset-0" />
          <div className="relative">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--ink-soft)]">curriculum vitae</div>
            <h4 className="mt-2 font-serif text-3xl text-[color:var(--ink)]">Anushka Chathli</h4>
            <div className="mt-1 text-xs text-[color:var(--ink-soft)]">B.Tech Computer Science · 2022 — 2026</div>
            <ul className="mt-6 space-y-3 text-sm text-[color:var(--ink)]">
              <li className="flex justify-between gap-6"><span>Research Intern, Microsoft Research India</span><span className="font-mono text-[11px] text-[color:var(--ink-soft)]">Summer 2025</span></li>
              <li className="flex justify-between gap-6"><span>SDE Intern, Razorpay</span><span className="font-mono text-[11px] text-[color:var(--ink-soft)]">2024</span></li>
              <li className="flex justify-between gap-6"><span>Undergrad Researcher, HCI Lab</span><span className="font-mono text-[11px] text-[color:var(--ink-soft)]">2023 — now</span></li>
            </ul>
            <a
              href="#"
              className="mt-8 inline-block font-mono text-[11px] uppercase tracking-widest text-[color:var(--burgundy)] underline underline-offset-4"
            >
              download full pdf ↗
            </a>
          </div>
          <div className="curl-corner" />
        </div>
      )}
    </div>
  );
}

function Flower({ label, note, color, delay }: { label: string; note: string; color: string; delay: number }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bloom" style={{ animationDelay: `${delay}s` }}>
        <svg viewBox="0 0 160 200" className="h-48 w-32">
          {/* stem */}
          <path d="M80 200 Q 78 140 82 90" stroke="oklch(0.52 0.06 145)" strokeWidth="3" fill="none" />
          <path d="M82 150 q 20 -6 30 -22" stroke="oklch(0.52 0.06 145)" strokeWidth="2" fill="none" />
          <ellipse cx="112" cy="128" rx="10" ry="4" fill="oklch(0.62 0.08 140)" transform="rotate(-30 112 128)" />
          {/* petals */}
          {Array.from({ length: 6 }).map((_, i) => {
            const rot = i * 60;
            return (
              <ellipse
                key={i}
                cx="80" cy="60" rx="14" ry="26"
                fill={color}
                transform={`rotate(${rot} 80 82)`}
                opacity="0.92"
              />
            );
          })}
          <circle cx="80" cy="82" r="10" fill="oklch(0.76 0.14 82)" />
        </svg>
      </div>
      <div className="mt-2 font-serif italic text-2xl text-[color:var(--ink)]">{label}</div>
      <p className="mt-1 max-w-[14rem] text-sm leading-snug text-[color:var(--ink-soft)]">{note}</p>
    </div>
  );
}

function Polaroid({ p, i }: { p: (typeof polaroids)[number]; i: number }) {
  const hue = 60 + ((i * 27) % 40);
  return (
    <figure
      className="paper-card reveal relative w-56 rounded-sm p-3 pb-14"
      style={{ transform: `rotate(${p.tilt}deg)` }}
    >
      <div
        className="h-56 w-full"
        style={{
          background: `linear-gradient(135deg, oklch(0.7 0.05 ${hue}), oklch(0.5 0.06 ${hue + 20}))`,
        }}
        aria-hidden
      >
        {/* subtle grain overlay */}
        <div className="tex-grain h-full w-full relative" />
      </div>
      <figcaption className="absolute bottom-3 left-4 right-4">
        <div className="font-hand text-xl leading-none text-[color:var(--ink)]">{p.caption}</div>
        <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[color:var(--ink-soft)]">{p.place}</div>
      </figcaption>
    </figure>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sections                                                                  */
/* -------------------------------------------------------------------------- */

function SectionLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="mb-10 flex items-baseline gap-4">
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--wood-dark)]">
        {n}
      </span>
      <span className="h-px flex-1 bg-[color:var(--border)]" />
      <h2 className="font-serif italic text-3xl md:text-4xl text-[color:var(--ink)]">{children}</h2>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

function Portfolio() {
  useReveal();
  const [basketOpen, setBasketOpen] = useState(false);
  const [page, setPage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setBasketOpen(true), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative overflow-x-clip">
      {/* -------------------- 1. Meadow / basket intro -------------------- */}
      <section className="relative flex min-h-[100svh] items-end justify-center overflow-hidden">
        <Meadow />
        <div className="relative z-10 flex flex-col items-center pb-24">
          <button
            onClick={() => {
              setBasketOpen(true);
              scrollRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            aria-label="Open the basket and begin"
            className="group relative"
          >
            <Basket open={basketOpen} />
          </button>

          <div className="mt-4 text-center reveal in" style={{ animationDelay: "1.6s" }}>
            <h1 className="font-serif text-5xl md:text-7xl leading-none text-[color:var(--ink)]">
              Anushka Chathli
            </h1>
            <p className="mt-4 font-hand text-2xl md:text-3xl text-[color:var(--burgundy)]">
              Everything I Bring to the Table.
            </p>
            <div className="mt-8 flex flex-col items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-[color:var(--ink-soft)]">
              <span>↓ unpack the basket</span>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------- The blanket (one continuous canvas) -------------------- */}
      <div ref={scrollRef} className="relative tex-blanket">
        {/* red gingham border strip */}
        <div className="h-6 w-full" style={{
          background: "repeating-linear-gradient(90deg, oklch(0.55 0.14 25) 0 24px, oklch(0.42 0.11 25) 24px 48px)"
        }} />

        <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32 space-y-40">

          {/* Intro card on the blanket */}
          <section className="reveal grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center">
            <div className="paper-card tex-paper relative rounded-md p-8">
              <div className="tex-grain absolute inset-0 rounded-md" />
              <div className="relative">
                <div className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--ink-soft)]">a note before we begin</div>
                <p className="mt-4 font-serif text-2xl leading-snug text-[color:var(--ink)]">
                  I spread the blanket first. Then, slowly, everything I&rsquo;ve packed comes out — the projects, the small proofs, the values that keep me pointed the right way.
                </p>
                <p className="mt-4 font-hand text-xl text-[color:var(--burgundy)]">
                  take your time.
                </p>
              </div>
              <div className="curl-corner" />
            </div>

            <div className="relative">
              <Teacup />
              <div className="mt-6 max-w-md">
                <div className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--wood-dark)]">01 · about</div>
                <h2 className="mt-2 font-serif italic text-3xl text-[color:var(--ink)]">Steam and a short introduction</h2>
                <p className="mt-4 text-sm leading-relaxed text-[color:var(--ink-soft)]">
                  I&rsquo;m a computer science engineer who spends most of her time at the intersection of AI, sustainability, and accessibility. I build small, careful things — usually with people who&rsquo;ll actually use them.
                </p>
              </div>
            </div>
          </section>

          {/* Projects — notebook */}
          <section className="reveal">
            <SectionLabel n="02 · projects">The notebook</SectionLabel>
            <Notebook
              pageIndex={page}
              onPrev={() => setPage((p) => (p - 1 + projects.length) % projects.length)}
              onNext={() => setPage((p) => (p + 1) % projects.length)}
            />
          </section>

          {/* Achievements — bread */}
          <section className="reveal">
            <SectionLabel n="03 · achievements">Bread, sliced</SectionLabel>
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              {achievements.map((a, i) => (
                <BreadSlice key={a.label} a={a} i={i} />
              ))}
            </div>
          </section>

          {/* Values — flowers */}
          <section className="reveal">
            <SectionLabel n="04 · values">Three things blooming</SectionLabel>
            <div className="grid gap-10 md:grid-cols-3">
              {values.map((v, i) => (
                <Flower
                  key={v.name}
                  label={v.name}
                  note={v.note}
                  color={[ "oklch(0.72 0.055 145)", "oklch(0.76 0.14 82)", "oklch(0.55 0.13 25)" ][i]}
                  delay={i * 0.35}
                />
              ))}
            </div>
          </section>

          {/* Resume — envelope */}
          <section className="reveal grid gap-10 md:grid-cols-[1fr_1fr] md:items-start">
            <div>
              <SectionLabel n="05 · resume">A wax-sealed envelope</SectionLabel>
              <p className="max-w-md text-sm leading-relaxed text-[color:var(--ink-soft)]">
                For the parts of me that fit on a page. Open it if you&rsquo;d like the tidy version — everything else lives on the blanket.
              </p>
            </div>
            <Envelope />
          </section>

          {/* Gallery — polaroids */}
          <section className="reveal">
            <SectionLabel n="06 · gallery">A few moments, casually placed</SectionLabel>
            <div className="flex flex-wrap items-start justify-center gap-10 pt-4">
              {polaroids.map((p, i) => (
                <Polaroid key={p.caption} p={p} i={i} />
              ))}
            </div>
          </section>

          {/* Close */}
          <section className="reveal text-center">
            <div className="mx-auto max-w-2xl">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--wood-dark)]">07 · afterward</div>
              <h2 className="mt-4 font-serif italic text-4xl md:text-5xl leading-tight text-[color:var(--ink)]">
                Let&rsquo;s build something worth packing.
              </h2>
              <p className="mt-6 font-hand text-2xl text-[color:var(--burgundy)]">
                — anushka
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6 font-mono text-xs uppercase tracking-widest text-[color:var(--ink)]">
                <a href="mailto:hello@anushka.dev" className="underline underline-offset-8 decoration-[color:var(--wood)] hover:text-[color:var(--burgundy)]">write a letter</a>
                <span aria-hidden className="text-[color:var(--ink-soft)]">·</span>
                <a href="#" className="underline underline-offset-8 decoration-[color:var(--wood)] hover:text-[color:var(--burgundy)]">github</a>
                <span aria-hidden className="text-[color:var(--ink-soft)]">·</span>
                <a href="#" className="underline underline-offset-8 decoration-[color:var(--wood)] hover:text-[color:var(--burgundy)]">linkedin</a>
                <span aria-hidden className="text-[color:var(--ink-soft)]">·</span>
                <a href="#" className="underline underline-offset-8 decoration-[color:var(--wood)] hover:text-[color:var(--burgundy)]">read.cv</a>
              </div>
            </div>
          </section>
        </div>

        <div className="h-6 w-full" style={{
          background: "repeating-linear-gradient(90deg, oklch(0.55 0.14 25) 0 24px, oklch(0.42 0.11 25) 24px 48px)"
        }} />
      </div>

      <footer className="bg-[color:var(--cream)] py-10 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--ink-soft)]">
        packed with care · 2026
      </footer>
    </main>
  );
}
