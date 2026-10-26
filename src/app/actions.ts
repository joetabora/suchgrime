"use server";

import { z } from "zod";
import { prisma } from "@/lib/db";

export type SubscribeState = { ok?: boolean; error?: string } | null;

export async function subscribeAction(_prev: SubscribeState, formData: FormData): Promise<SubscribeState> {
  const parsed = z.string().trim().toLowerCase().email().safeParse(formData.get("email"));
  if (!parsed.success) return { error: "Enter a valid email." };

  await prisma.subscriber.upsert({
    where: { email: parsed.data },
    create: { email: parsed.data },
    update: {},
  });
  return { ok: true };
}
