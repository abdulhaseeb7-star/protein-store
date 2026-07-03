import Header from "@/components/shop/Header";
import Hero from "@/components/shop/Hero";
import BrandStrip from "@/components/shop/BrandStrip";
import CategoryGrid from "@/components/shop/CategoryGrid";
import ProductGrid from "@/components/shop/ProductGrid";
import FeatureStrip from "@/components/shop/FeatureStrip";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: { brand: true, reviews: true },
    orderBy: { isFeatured: "desc" },
    take: 4,
  });

  const topSelling = products.map((p) => {
    const avgRating =
      p.reviews.length > 0
        ? p.reviews.reduce((sum, r) => sum + r.rating, 0) / p.reviews.length
        : 0;

    return {
      id: p.id,
      slug: p.slug,
      brand: p.brand.name,
      name: p.name,
      price: Number(p.basePrice),
      rating: avgRating,
      reviewCount: p.reviews.length,
      imageUrl: p.imageUrl,
      isBestseller: p.isFeatured,
    };
  });

  return (
    <main className="bg-[var(--bg)] text-[var(--text)]">
      <Header />
      <Hero />
      <BrandStrip />
      <CategoryGrid />
      <ProductGrid title="Top selling products" tag="BEST SELLERS" products={topSelling} />
      <FeatureStrip />
    </main>
  );
}