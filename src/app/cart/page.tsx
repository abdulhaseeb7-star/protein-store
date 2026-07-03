"use client";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import Header from "@/components/shop/Header";
import { useCartStore } from "@/store/cart-store";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCartStore();

  return (
    <main className="bg-[var(--bg)] text-[var(--text)]">
      <Header />

      <section className="px-12 py-12">
        <h1 className="mb-8 font-[var(--font-display)] text-[40px] uppercase">Your cart</h1>

        {items.length === 0 ? (
          <div className="py-20 text-center">
            <p className="mb-4 text-[var(--muted)]">Your cart is empty.</p>
            <Link
              href="/products"
              className="inline-block rounded-xl bg-gradient-to-r from-[var(--gold-bright)] to-[var(--gold)] px-7 py-3.5 text-[13px] font-extrabold text-[#1A1300]"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]">
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
                >
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl">
                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1">
                    <p className="text-[10.5px] font-bold uppercase tracking-wide text-[var(--muted)]">
                      {item.brand}
                    </p>
                    <p className="text-[14.5px] font-bold">{item.name}</p>
                    <p className="mt-1 font-[var(--font-display)] text-[15px] text-[var(--gold-bright)]">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-2 py-1.5">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-5 text-center text-[13px] font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove item"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--muted)] hover:text-[var(--ember)]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="h-fit rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <p className="mb-4 text-[13px] font-bold uppercase tracking-wide text-[var(--muted)]">Order summary</p>
              <div className="mb-4 flex justify-between text-[14px]">
                <span className="text-[var(--muted)]">Subtotal</span>
                <span className="font-semibold">${totalPrice().toFixed(2)}</span>
              </div>
              <div className="mb-6 flex justify-between border-t border-[var(--border)] pt-4 text-[16px] font-bold">
                <span>Total</span>
                <span className="text-[var(--gold-bright)]">${totalPrice().toFixed(2)}</span>
              </div>
              <Link
                href="/checkout"
                className="block w-full rounded-xl bg-gradient-to-r from-[var(--gold-bright)] to-[var(--gold)] py-4 text-center text-[13px] font-extrabold text-[#1A1300]"
              >
                Proceed to checkout
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}