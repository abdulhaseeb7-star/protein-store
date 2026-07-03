import { ShieldCheck, Award, Truck, Headset } from "lucide-react";

const features = [
  { icon: ShieldCheck, title: "100% Authentic", desc: "Only genuine products from trusted sources" },
  { icon: Award, title: "Top Quality", desc: "Carefully selected premium brands" },
  { icon: Truck, title: "Fast Delivery", desc: "Quick and safe delivery nationwide" },
  { icon: Headset, title: "24/7 Support", desc: "We're here to help, anytime" },
];

export default function FeatureStrip() {
  return (
    <section className="px-12 pb-16">
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-3.5 bg-[var(--surface)] p-7">
            <Icon className="h-[22px] w-[22px] flex-shrink-0 text-[var(--gold-bright)]" />
            <div>
              <p className="mb-1 text-[13.5px] font-bold">{title}</p>
              <p className="text-xs leading-relaxed text-[var(--muted)]">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}