import Link from "next/link";
import { Check } from "lucide-react";
import Header from "@/components/shop/Header";

export default function OrderConfirmedPage() {
  return (
    <main className="bg-[var(--bg)] text-[var(--text)]">
      <Header />
      <section className="flex flex-col items-center px-12 py-24 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--surface-2)] text-[var(--gold-bright)]">
          <Check className="h-8 w-8" />
        </div>
        <h1 className="mb-3 font-[var(--font-display)] text-[32px] uppercase">Order confirmed</h1>
        <p className="mb-8 max-w-md text-[14px] text-[var(--muted)]">
          Thanks for your order — we&apos;re getting it ready. You&apos;ll receive updates by email.
        </p>
        <Link
          href="/products"
          className="rounded-xl bg-gradient-to-r from-[var(--gold-bright)] to-[var(--gold)] px-7 py-3.5 text-[13px] font-extrabold text-[#1A1300]"
        >
          Continue shopping
        </Link>
      </section>
    </main>
  );
}