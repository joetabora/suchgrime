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
        title: "Inside Rust Belt Cycles",
        excerpt:
          '"We don\'t build show bikes. We build machines meant to get abused on the highway."',
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

  await prisma.product.createMany({
    data: [
      {
        slug: "issue-01-logo-tee",
        title: "Issue 01 Logo Tee",
        category: "Apparel",
        description: "Heavyweight 100% cotton tee in faded black. Printed locally in Milwaukee.",
        priceCents: 3500,
        inventory: 50,
        status: "available",
        imageUrl: "https://images.unsplash.com/photo-1558981420-c532902e58b4?q=80&w=800&auto=format&fit=crop",
      },
      {
        slug: "garage-banner",
        title: "SuchGrime Garage Banner",
        category: "Accessories",
        description: "3x5 foot heavy canvas banner with brass grommets. For the workshop wall.",
        priceCents: 4500,
        inventory: 25,
        status: "available",
        imageUrl: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800&auto=format&fit=crop",
      },
      {
        slug: "sandcast-points-cover",
        title: "Sandcast Points Cover",
        category: "Parts",
        description: "Cast aluminum points cover for Big Twin and Sportster. Raw finish.",
        priceCents: 6500,
        inventory: 10,
        status: "coming_soon",
        imageUrl: "https://images.unsplash.com/photo-1471440671318-55bdbb772f93?q=80&w=800&auto=format&fit=crop",
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
