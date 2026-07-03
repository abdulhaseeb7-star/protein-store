import Link from "next/link";
import { Zap, Triangle, Coffee, Plus, Diamond, Ban } from "lucide-react";

const categories = [
  { name: "Whey Protein", count: 42, icon: Zap, featured: true, slug: "whey-protein" },
  { name: "Mass Gainers", count: 18, icon: Triangle, slug: "mass-gainers" },
  { name: "Pre-Workout", count: 26, icon: Coffee, slug: "pre-workout" },
  { name: "Amino Acids", count: 15, icon: Plus, slug: "amino-acids" },
  { name: "Creatine", count: 12, icon: Diamond, slug: "creatine" },
  { name: "Vitamins", count: 31, icon: Ban, slug: "vitamins" },
];

export default function CategoryGrid() {
  return (
    <section className="px-12 py-16">
      <p className="mb-2 text-[11px] font-bold tracking-[2px] text-[var(--gold-bright)]">BROWSE</p>
      <h2 className="mb-8 font-[var(--font-display)] text-[34px] uppercase">Shop by category</h2>

      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            className={`group flex h-[140px] flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all hover:-translate-y-1 hover:border-[var(--gold)] ${
              cat.featured ? "sm:col-span-2 bg-gradient-to-br from-[var(--surface-2)] to-[var(--surface)]" : ""
            }`}
          >
            <cat.icon className="h-6 w-6 text-[var(--gold-bright)]" />
            <div>
              <p className="text-[13.5px] font-bold">{cat.name}</p>
              <p className="text-[11px] text-[var(--muted)]">{cat.count} products</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}