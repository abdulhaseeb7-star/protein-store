"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/shop/Header";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <main className="bg-[var(--bg)] text-[var(--text)]">
      <Header />
      <section className="flex min-h-[80vh] items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <h1 className="mb-1 font-[var(--font-display)] text-[28px] uppercase">Welcome back</h1>
          <p className="mb-8 text-[13px] text-[var(--muted)]">Sign in to your account</p>

          {error && (
            <div className="mb-5 rounded-lg bg-[var(--ember)]/10 border border-[var(--ember)]/20 px-4 py-3 text-[13px] text-[var(--ember)]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-[var(--muted)]">Email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="john@email.com"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3.5 py-3 text-[13.5px] text-[var(--text)] placeholder:text-[var(--muted)] focus:border-[var(--gold)] focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-[var(--muted)]">Password</label>
              <input
                required
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3.5 py-3 text-[13.5px] text-[var(--text)] placeholder:text-[var(--muted)] focus:border-[var(--gold)] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 rounded-xl bg-gradient-to-r from-[var(--gold-bright)] to-[var(--gold)] py-4 text-[13px] font-extrabold text-[#1A1300] disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-[13px] text-[var(--muted)]">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-semibold text-[var(--gold-bright)]">
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}