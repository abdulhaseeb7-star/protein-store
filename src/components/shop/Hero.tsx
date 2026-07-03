import Image from "next/image";
import Link from "next/link";
import { Check, Trophy, Truck, ArrowRight } from "lucide-react";

const trustItems = [
  { icon: Check, label: "100% Authentic" },
  { icon: Trophy, label: "Best Prices" },
  { icon: Truck, label: "Fast Delivery" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--bg)] px-12 py-24">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 78% 45%, rgba(242,169,59,0.16), transparent 55%)",
        }}
      />
      <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-[var(--gold-bright)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--ember)]" />
            100% AUTHENTIC · TOP GLOBAL BRANDS
          </div>

          <h1 className="font-[var(--font-display)] text-[64px] uppercase leading-[0.95] tracking-wide sm:text-[76px]">
            Fuel Your
            <br />
            <span className="bg-gradient-to-r from-[var(--gold-bright)] to-[var(--ember)] bg-clip-text text-transparent">
              Greatness
            </span>
          </h1>

          <p className="my-6 max-w-md text-[16px] leading-relaxed text-[var(--muted)]">
            Premium, lab-verified protein supplements sourced directly from
            the world&apos;s top brands — built for serious results.
          </p>

          <div className="mb-9 flex gap-7">
            {trustItems.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-[12.5px] font-semibold">
                <span className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-2)] text-[var(--gold-bright)]">
                  <Icon className="h-4 w-4" />
                </span>
                {label}
              </div>
            ))}
          </div>

          <div className="flex gap-3.5">
            <Link
              href="/products"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--gold-bright)] to-[var(--gold)] px-7 py-4 text-[13px] font-extrabold text-[#1A1300]"
            >
              Shop Now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/brands"
              className="rounded-xl border border-[var(--border)] px-6 py-4 text-[13px] font-bold text-[var(--text)]"
            >
              Explore Brands
            </Link>
          </div>
        </div>

        <div className="relative h-[480px] overflow-hidden rounded-3xl border border-[var(--border)]">
          <Image
            src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=900&q=80&auto=format&fit=crop"
            alt="Athlete with protein supplement"
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,10,12,0.1) 0%, rgba(10,10,12,0.85) 100%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}