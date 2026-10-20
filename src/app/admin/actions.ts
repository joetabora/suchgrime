"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/db";
import {
  createAdminSession,
  destroyAdminSession,
  isAdminAuthenticated,
  verifyAdminPassword,
} from "@/lib/auth";
import { slugify } from "@/lib/slug";

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Unauthorized");
  }
}

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") || "");
  if (!verifyAdminPassword(password)) {
    return { error: "Invalid password" };
  }
  await createAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await destroyAdminSession();
  redirect("/admin/login");
}

function boolFromForm(value: FormDataEntryValue | null) {
  return value === "on" || value === "true" || value === "1";
}

/* ---------- Features ---------- */

const featureSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  body: z.string().optional(),
  type: z.string().min(1),
  location: z.string().optional(),
  imageUrl: z.string().optional(),
  published: z.boolean(),
  slug: z.string().optional(),
});

export async function upsertFeature(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const parsed = featureSchema.parse({
    title: formData.get("title"),
    excerpt: formData.get("excerpt"),
    body: formData.get("body") || "",
    type: formData.get("type") || "Feature",
    location: formData.get("location") || "",
    imageUrl: formData.get("imageUrl") || "",
    published: boolFromForm(formData.get("published")),
    slug: formData.get("slug") || undefined,
  });

  const slug = parsed.slug?.trim() || slugify(parsed.title);

  if (id) {
    await prisma.feature.update({
      where: { id },
      data: { ...parsed, slug, location: parsed.location || null, imageUrl: parsed.imageUrl || null },
    });
  } else {
    await prisma.feature.create({
      data: { ...parsed, slug, location: parsed.location || null, imageUrl: parsed.imageUrl || null },
    });
  }

  revalidatePath("/");
  revalidatePath("/features");
  revalidatePath("/admin/features");
  redirect("/admin/features");
}

export async function deleteFeature(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  await prisma.feature.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/features");
  revalidatePath("/admin/features");
}

/* ---------- Builds ---------- */

const buildSchema = z.object({
  title: z.string().min(1),
  stage: z.string().min(1),
  builder: z.string().min(1),
  excerpt: z.string().min(1),
  body: z.string().optional(),
  imageUrl: z.string().optional(),
  published: z.boolean(),
  slug: z.string().optional(),
});

export async function upsertBuild(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const parsed = buildSchema.parse({
    title: formData.get("title"),
    stage: formData.get("stage"),
    builder: formData.get("builder"),
    excerpt: formData.get("excerpt"),
    body: formData.get("body") || "",
    imageUrl: formData.get("imageUrl") || "",
    published: boolFromForm(formData.get("published")),
    slug: formData.get("slug") || undefined,
  });
  const slug = parsed.slug?.trim() || slugify(parsed.title);

  if (id) {
    await prisma.build.update({
      where: { id },
      data: { ...parsed, slug, imageUrl: parsed.imageUrl || null },
    });
  } else {
    await prisma.build.create({
      data: { ...parsed, slug, imageUrl: parsed.imageUrl || null },
    });
  }

  revalidatePath("/");
  revalidatePath("/builds");
  revalidatePath("/admin/builds");
  redirect("/admin/builds");
}

export async function deleteBuild(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  await prisma.build.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/builds");
  revalidatePath("/admin/builds");
}

/* ---------- Events ---------- */

const eventSchema = z.object({
  title: z.string().min(1),
  location: z.string().min(1),
  eventDate: z.string().min(1),
  status: z.string().min(1),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  published: z.boolean(),
  slug: z.string().optional(),
});

export async function upsertEvent(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const parsed = eventSchema.parse({
    title: formData.get("title"),
    location: formData.get("location"),
    eventDate: formData.get("eventDate"),
    status: formData.get("status") || "Upcoming",
    description: formData.get("description") || "",
    imageUrl: formData.get("imageUrl") || "",
    published: boolFromForm(formData.get("published")),
    slug: formData.get("slug") || undefined,
  });
  const slug = parsed.slug?.trim() || slugify(parsed.title);

  const data = {
    title: parsed.title,
    location: parsed.location,
    eventDate: new Date(parsed.eventDate),
    status: parsed.status,
    description: parsed.description || "",
    imageUrl: parsed.imageUrl || null,
    published: parsed.published,
    slug,
  };

  if (id) {
    await prisma.event.update({ where: { id }, data });
  } else {
    await prisma.event.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function deleteEvent(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  await prisma.event.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/admin/events");
}

/* ---------- Products ---------- */

const productSchema = z.object({
  title: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  priceCents: z.coerce.number().int().positive(),
  inventory: z.coerce.number().int().min(0),
  status: z.string().min(1),
  imageUrl: z.string().optional(),
  active: z.boolean(),
  slug: z.string().optional(),
});

export async function upsertProduct(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const priceDollars = Number(formData.get("price") || 0);
  const parsed = productSchema.parse({
    title: formData.get("title"),
    category: formData.get("category"),
    description: formData.get("description"),
    priceCents: Math.round(priceDollars * 100),
    inventory: formData.get("inventory") || 0,
    status: formData.get("status") || "available",
    imageUrl: formData.get("imageUrl") || "",
    active: boolFromForm(formData.get("active")),
    slug: formData.get("slug") || undefined,
  });
  const slug = parsed.slug?.trim() || slugify(parsed.title);

  if (id) {
    await prisma.product.update({
      where: { id },
      data: { ...parsed, slug, imageUrl: parsed.imageUrl || null },
    });
  } else {
    await prisma.product.create({
      data: { ...parsed, slug, imageUrl: parsed.imageUrl || null },
    });
  }

  revalidatePath("/shop");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  await prisma.product.delete({ where: { id } });
  revalidatePath("/shop");
  revalidatePath("/admin/products");
}
