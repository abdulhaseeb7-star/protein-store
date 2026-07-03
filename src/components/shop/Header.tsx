"use client";
import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/products" },
  { label: "Brands", href: "/brands" },
  { label: "Categories", href: "/categories" },
  { label: "Offers", href: "/offers" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const totalItems = useCartStore((state) => state.totalItems());
  const { isSignedIn } = useUser();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg)]/75 px-12 py-4 backdrop-blur-xl">
      <Link href="/" className="flex items-center gap-2.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--gold-bright)] to-[var(--ember)] font-[var(--font-display)] text-lg text-[#0A0A0C]">
          NI
        </div>
        <div className="text-xs font-bold tracking-wide text-[var(--text)]">
          NUTRI-IMPORTS
          <span className="block text-[9px] font-normal tracking-wider text-[var(--muted)]">
            BY AL SAYED IMPORTS · EST 2021
          </span>
        </div>
      </Link>

      <nav className="hidden gap-8 md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[13px] font-semibold tracking-wide text-[var(--muted)] transition-colors hover:text-[var(--gold-bright)]"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-5">
        <Search className="h-[18px] w-[18px] cursor-pointer text-[var(--text)] opacity-85" />

        {isSignedIn ? (
          <UserButton />
        ) : (
          <>
            <SignInButton mode="modal">
              <button className="text-[13px] font-semibold text-[var(--muted)] hover:text-[var(--gold-bright)]">
                Sign in
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="rounded-lg bg-gradient-to-r from-[var(--gold-bright)] to-[var(--gold)] px-4 py-2 text-[12px] font-bold text-[#1A1300]">
                Sign up
              </button>
            </SignUpButton>
          </>
        )}

        <Link href="/cart" className="relative">
          <ShoppingCart className="h-[18px] w-[18px] cursor-pointer text-[var(--text)] opacity-85" />
          {totalItems > 0 && (
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--ember)] text-[9px] font-bold text-white">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}