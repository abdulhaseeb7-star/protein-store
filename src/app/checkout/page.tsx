"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/components/shop/Header";
import { useCartStore } from "@/store/cart-store";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // TODO: replace with real Stripe checkout session call
    await new Promise((r) => setTimeout(r, 800));

    clearCart();
    router.push("/order-confirmed");
  };

  if (items.length === 0) {
    return (
      <main className="bg-[var(--bg)] text-[var(--text)]">
        <Header />
        <section className="px-12 py-20 text-center">
          <p className="text-[var(--muted)]">Your cart is empty — add something before checking out.</p>
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <p className="text-[11px] font-bold tracking-[1.5px] text-[var(--gold-bright)]">SHIPPING DETAILS</p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Full name" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" />
              <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@email.com" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+92 300 1234567" />
              <Field label="City" name="city" value={form.city} onChange={handleChange} placeholder="Karachi" />
            </div>

            <Field label="Full address" name="address" value={form.address} onChange={handleChange} placeholder="House #, Street, Area" />

            <button
              type="submit"
              disabled={submitting}
              className="mt-4 rounded-xl bg-gradient-to-r from-[var(--gold-bright)] to-[var(--gold)] py-4 text-[13px] font-extrabold text-[#1A1300] disabled:opacity-60"
            >
              {submitting ? "Processing..." : `Pay $${totalPrice().toFixed(2)}`}
            </button>
          </form>

          <div className="h-fit rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <p className="mb-4 text-[13px] font-bold uppercase tracking-wide text-[var(--muted)]">Order summary</p>

            <div className="mb-4 flex flex-col gap-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[12.5px] font-semibold leading-tight">{item.name}</p>
                    <p className="text-[11px] text-[var(--muted)]">Qty {item.quantity}</p>
                  </div>
                  <p className="text-[12.5px] font-semibold text-[var(--gold-bright)]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-between border-t border-[var(--border)] pt-4 text-[16px] font-bold">
              <span>Total</span>
              <span className="text-[var(--gold-bright)]">${totalPrice().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[12px] font-semibold text-[var(--muted)]">{label}</label>
      <input
        required
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3.5 py-3 text-[13.5px] text-[var(--text)] placeholder:text-[var(--muted)] focus:border-[var(--gold)] focus:outline-none"
      />
    </div>
  );
}