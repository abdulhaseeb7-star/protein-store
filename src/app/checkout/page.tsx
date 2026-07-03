"use client";
import { useState } from "react";
import Image from "next/image";
import Header from "@/components/shop/Header";
import { useCartStore } from "@/store/cart-store";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            imageUrl: item.imageUrl,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      clearCart();
      window.location.href = data.url;
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="bg-[var(--bg)] text-[var(--text)]">
        <Header />
        <section className="px-12 py-20 text-center">
          <p className="text-[var(--muted)]">Your cart is empty.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-[var(--bg)] text-[var(--text)]">
      <Header />

      <section className="px-12 py-12">
        <h1 className="mb-8 font-[var(--font-display)] text-[40px] uppercase">Checkout</h1>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]">
          <div className="flex flex-col gap-4">
            <p className="text-[13px] text-[var(--muted)]">
              Review your order and click below to proceed to secure payment via Stripe.
            </p>

            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
              >
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl">
                  <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-[10.5px] font-bold uppercase tracking-wide text-[var(--muted)]">
                    {item.brand}
                  </p>
                  <p className="text-[14px] font-bold">{item.name}</p>
                  <p className="text-[11px] text-[var(--muted)]">Qty {item.quantity}</p>
                </div>
                <p className="font-[var(--font-display)] text-[15px] text-[var(--gold-bright)]">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}

            {error && (
              <p className="rounded-lg bg-[var(--ember)]/10 px-4 py-3 text-[13px] text-[var(--ember)]">
                {error}
              </p>
            )}
          </div>

          <div className="h-fit rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <p className="mb-4 text-[13px] font-bold uppercase tracking-wide text-[var(--muted)]">
              Order summary
            </p>

            {items.map((item) => (
              <div key={item.id} className="mb-3 flex justify-between text-[13px]">
                <span className="text-[var(--muted)]">{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <div className="mb-6 flex justify-between border-t border-[var(--border)] pt-4 text-[16px] font-bold">
              <span>Total</span>
              <span className="text-[var(--gold-bright)]">${totalPrice().toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-[var(--gold-bright)] to-[var(--gold)] py-4 text-[13px] font-extrabold text-[#1A1300] disabled:opacity-60"
            >
              {loading ? "Redirecting to Stripe..." : `Pay $${totalPrice().toFixed(2)}`}
            </button>

            <p className="mt-3 text-center text-[11px] text-[var(--muted)]">
              🔒 Secured by Stripe
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}