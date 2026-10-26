import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.feature.deleteMany();
  await prisma.build.deleteMany();
  await prisma.event.deleteMany();

  await prisma.feature.createMany({
    data: [
      {
        slug: "ironhead-revival",
        title: "The '74 Ironhead Survival",
        excerpt:
          "After sitting in a damp basement for two decades, this Sportster was dragged into the light and stripped to its soul.",
        body: "Placeholder story body. Replace with the real feature when ready.",
        type: "Feature",
        location: "Walker's Point, MKE",
        imageUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2000&auto=format&fit=crop",
      },
      {
        slug: "panhead-chopper",
        title: "Long & Low: The 10-Over Panhead",
        excerpt:
          "A meticulous build that proves sometimes the classic chopper silhouette is exactly what's needed.",
        body: "Placeholder story body.",
        type: "Profile",
        imageUrl: "https://images.unsplash.com/photo-1558981420-c532902e58b4?q=80&w=1000&auto=format&fit=crop",
      },
      {
        slug: "shop-tour-milwaukee",
        title: "Shop Tour: Placeholder",
        excerpt: "Placeholder shop tour. Replace with a real visit to a Milwaukee garage.",
        body: "Placeholder shop tour.",
        type: "Shop Tour",
        imageUrl: "https://images.unsplash.com/photo-1471440671318-55bdbb772f93?q=80&w=1000&auto=format&fit=crop",
      },
    ],
  });

  await prisma.build.createMany({
    data: [
      {
        slug: "project-shovel",
        title: "Project Shovel",
        stage: "Fabrication",
        builder: "Dave S.",
        excerpt: "Hardtailing an 80-inch Shovelhead. Measuring twice, cutting once.",
        imageUrl: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800&auto=format&fit=crop",
      },
      {
        slug: "the-survivor",
        title: "The Survivor",
        stage: "Mockup",
        builder: "Mike T.",
        excerpt: "Piecing together a period-correct 70s survivor build from swap meet finds.",
        imageUrl: "https://images.unsplash.com/photo-1471440671318-55bdbb772f93?q=80&w=800&auto=format&fit=crop",
      },
      {
        slug: "evo-sporty",
        title: "Evo Sporty",
        stage: "Tear Down",
        builder: "Sarah K.",
        excerpt: "Stripping a pristine 1200 down to the frame. The point of no return.",
        imageUrl: "https://images.unsplash.com/photo-1558981420-c532902e58b4?q=80&w=800&auto=format&fit=crop",
      },
    ],
  });

  const now = new Date();
  await prisma.event.createMany({
    data: [
      {
        slug: "fall-scramble",
        title: "The Fall Scramble",
        location: "Menomonee Valley",
        eventDate: new Date(now.getFullYear(), 9, 24),
        status: "Upcoming",
        description: "Placeholder event — replace with real coverage.",
      },
      {
        slug: "winter-swap-meet",
        title: "Winter Swap Meet",
        location: "State Fair Park",
        eventDate: new Date(now.getFullYear(), 10, 12),
        status: "Upcoming",
        description: "Placeholder event.",
      },
    ],
  });

  const img = (id: string) => `https://images.unsplash.com/${id}?q=80&w=900&auto=format&fit=crop`;
  const PHOTOS = {
    a: img("photo-1558981806-ec527fa84c39"),
    b: img("photo-1558981420-c532902e58b4"),
    c: img("photo-1471440671318-55bdbb772f93"),
    d: img("photo-1568772585407-9361f9bf3a87"),
  };
  const PLACEHOLDER = "Placeholder product — replace the title, photos, price, and description in /admin.";
  const TEE_SIZES = "S, M, L, XL, 2XL";

  await prisma.product.createMany({
    data: [
      {
        slug: "coffin-chopper-tee",
        title: "Coffin Chopper Tee",
        category: "Tees",
        description: `${PLACEHOLDER}\n\nConcept: a rigid chopper riding out of an open coffin, drawn as traditional flash.`,
        priceCents: 3500,
        inventory: 50,
        sizes: TEE_SIZES,
        featured: true,
        imageUrl: PHOTOS.a,
        gallery: PHOTOS.b,
      },
      {
        slug: "dagger-and-rose-tee",
        title: "Dagger & Rose Tee",
        category: "Tees",
        description: `${PLACEHOLDER}\n\nConcept: classic dagger-through-rose flash with a piston for a hilt.`,
        priceCents: 3500,
        compareAtCents: 4000,
        inventory: 40,
        sizes: TEE_SIZES,
        featured: true,
        imageUrl: PHOTOS.b,
        gallery: PHOTOS.c,
      },
      {
        slug: "reaper-rides-longsleeve",
        title: "Reaper Rides Longsleeve",
        category: "Tees",
        description: `${PLACEHOLDER}\n\nConcept: the reaper on a springer front end, sleeve hits down both arms.`,
        priceCents: 4500,
        inventory: 0,
        status: "coming_soon",
        sizes: TEE_SIZES,
        imageUrl: PHOTOS.c,
      },
      {
        slug: "flash-sheet-trucker",
        title: "Flash Sheet Trucker Hat",
        category: "Headwear",
        description: `${PLACEHOLDER}\n\nConcept: embroidered blackletter wordmark on a foam-front trucker.`,
        priceCents: 3000,
        inventory: 30,
        featured: true,
        imageUrl: PHOTOS.d,
      },
      {
        slug: "graveyard-sticker-pack",
        title: "Graveyard Sticker Pack",
        category: "Accessories",
        description: `${PLACEHOLDER}\n\nConcept: five die-cut flash stickers for toolboxes and helmets.`,
        priceCents: 1200,
        inventory: 100,
        imageUrl: PHOTOS.a,
      },
      {
        slug: "garage-banner",
        title: "SuchGrime Garage Banner",
        category: "Accessories",
        description: `${PLACEHOLDER}\n\nConcept: 3x5 ft canvas banner with brass grommets for the workshop wall.`,
        priceCents: 4500,
        inventory: 25,
        imageUrl: PHOTOS.d,
      },
      {
        slug: "sandcast-points-cover",
        title: "Sandcast Points Cover",
        category: "Parts",
        description: `${PLACEHOLDER}\n\nConcept: cast aluminum points cover, raw finish.`,
        priceCents: 6500,
        inventory: 10,
        status: "coming_soon",
        imageUrl: PHOTOS.c,
      },
      {
        slug: "skull-shift-knob",
        title: "Skull Shift Knob",
        category: "Parts",
        description: `${PLACEHOLDER}\n\nConcept: machined skull shift knob.`,
        priceCents: 5500,
        inventory: 8,
        imageUrl: PHOTOS.b,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
