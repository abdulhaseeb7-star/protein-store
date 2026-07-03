import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

interface Brand {
  id: number;
  name: string;
  slug: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface VariantInput {
  flavor: string | null;
  size: string;
  price: number;
  stock: number;
  sku: string;
}

interface ProductInput {
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  imageUrl: string;
  isFeatured?: boolean;
  stock: number;
  brand: string;
  category: string;
  variants: VariantInput[];
}

async function main() {
  const brands: Brand[] = await Promise.all(
    [
      { name: "Optimum Nutrition", slug: "optimum-nutrition" },
      { name: "Muscletech", slug: "muscletech" },
      { name: "BSN", slug: "bsn" },
      { name: "Dymatize", slug: "dymatize" },
      { name: "Cellucor", slug: "cellucor" },
      { name: "MyProtein", slug: "myprotein" },
    ].map((b) =>
      prisma.brand.upsert({ where: { slug: b.slug }, update: {}, create: b })
    )
  );

  const categories: Category[] = await Promise.all(
    [
      { name: "Whey Protein", slug: "whey-protein" },
      { name: "Mass Gainers", slug: "mass-gainers" },
      { name: "Pre-Workout", slug: "pre-workout" },
      { name: "Amino Acids", slug: "amino-acids" },
      { name: "Creatine", slug: "creatine" },
      { name: "Vitamins", slug: "vitamins" },
    ].map((c) =>
      prisma.category.upsert({ where: { slug: c.slug }, update: {}, create: c })
    )
  );

  const getBrand = (name: string): number => brands.find((b) => b.name === name)!.id;
  const getCategory = (name: string): number => categories.find((c) => c.name === name)!.id;

  const products: ProductInput[] = [
    {
      name: "Gold Standard 100% Whey",
      slug: "gold-standard-whey",
      description: "Premium whey protein isolate blend formulated for fast absorption and lean muscle support.",
      basePrice: 59.99,
      imageUrl: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=500&q=80&auto=format&fit=crop",
      isFeatured: true,
      stock: 100,
      brand: "Optimum Nutrition",
      category: "Whey Protein",
      variants: [
        { flavor: "Chocolate", size: "2lb", price: 59.99, stock: 40, sku: "ON-GS-CHOC-2LB" },
        { flavor: "Chocolate", size: "5lb", price: 89.99, stock: 25, sku: "ON-GS-CHOC-5LB" },
        { flavor: "Vanilla", size: "2lb", price: 59.99, stock: 35, sku: "ON-GS-VAN-2LB" },
      ],
    },
    {
      name: "Nitro-Tech Whey Protein",
      slug: "nitro-tech",
      description: "Whey protein peptides and isolate engineered for muscle recovery and growth.",
      basePrice: 54.99,
      imageUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&q=80&auto=format&fit=crop",
      stock: 80,
      brand: "Muscletech",
      category: "Whey Protein",
      variants: [
        { flavor: "Chocolate", size: "2lb", price: 54.99, stock: 30, sku: "MT-NT-CHOC-2LB" },
        { flavor: "Strawberry", size: "2lb", price: 54.99, stock: 28, sku: "MT-NT-STRAW-2LB" },
      ],
    },
    {
      name: "Syntha-6 Protein",
      slug: "syntha-6",
      description: "A multi-source protein blend with a smooth, dessert-like taste for sustained release.",
      basePrice: 49.99,
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80&auto=format&fit=crop",
      stock: 70,
      brand: "BSN",
      category: "Whey Protein",
      variants: [
        { flavor: "Cookies & Cream", size: "5lb", price: 49.99, stock: 20, sku: "BSN-S6-CC-5LB" },
      ],
    },
    {
      name: "ISO100 Hydrolyzed",
      slug: "iso100",
      description: "Fast-absorbing hydrolyzed whey protein isolate, virtually free of fat, sugar, and lactose.",
      basePrice: 69.99,
      imageUrl: "https://images.unsplash.com/photo-1579722821273-0f6c1b6b8a4c?w=500&q=80&auto=format&fit=crop",
      stock: 60,
      brand: "Dymatize",
      category: "Whey Protein",
      variants: [
        { flavor: "Gourmet Chocolate", size: "3lb", price: 69.99, stock: 22, sku: "DYM-ISO-CHOC-3LB" },
      ],
    },
    {
      name: "Serious Mass Gainer",
      slug: "serious-mass",
      description: "High-calorie mass gainer packed with protein, carbs, and 25 vitamins and minerals.",
      basePrice: 64.99,
      imageUrl: "https://picsum.photos/seed/massgainer1/500/400",
      stock: 50,
      brand: "Optimum Nutrition",
      category: "Mass Gainers",
      variants: [
        { flavor: "Chocolate", size: "6lb", price: 64.99, stock: 25, sku: "ON-SM-CHOC-6LB" },
      ],
    },
    {
      name: "C4 Original Pre-Workout",
      slug: "c4-original",
      description: "Explosive energy, sharper focus, and longer endurance for your toughest workouts.",
      basePrice: 29.99,
      imageUrl: "https://picsum.photos/seed/preworkout1/500/400",
      stock: 90,
      brand: "Cellucor",
      category: "Pre-Workout",
      variants: [
        { flavor: "Fruit Punch", size: "30 servings", price: 29.99, stock: 45, sku: "CEL-C4-FP-30" },
      ],
    },
    {
      name: "Alpha Amino BCAA",
      slug: "bcaa-energy",
      description: "Amino acid blend that supports hydration, recovery, and lean muscle preservation.",
      basePrice: 34.99,
      imageUrl: "https://picsum.photos/seed/amino1/500/400",
      stock: 60,
      brand: "Cellucor",
      category: "Amino Acids",
      variants: [
        { flavor: "Watermelon", size: "30 servings", price: 34.99, stock: 30, sku: "CEL-AA-WM-30" },
      ],
    },
    {
      name: "Creatine Monohydrate",
      slug: "creatine-monohydrate",
      description: "Pure micronized creatine monohydrate for strength, power, and muscle gains.",
      basePrice: 19.99,
      imageUrl: "https://picsum.photos/seed/creatine1/500/400",
      stock: 120,
      brand: "MyProtein",
      category: "Creatine",
      variants: [
        { flavor: null, size: "250g", price: 19.99, stock: 60, sku: "MP-CRE-250G" },
        { flavor: null, size: "500g", price: 32.99, stock: 40, sku: "MP-CRE-500G" },
      ],
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        basePrice: p.basePrice,
        imageUrl: p.imageUrl,
        isFeatured: p.isFeatured ?? false,
        stock: p.stock,
        brandId: getBrand(p.brand),
        categoryId: getCategory(p.category),
        variants: { create: p.variants },
      },
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });