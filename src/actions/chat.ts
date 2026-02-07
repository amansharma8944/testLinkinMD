"use server";

import { db } from "@/db";
import { users, messages } from "@/db/schema";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { eq, desc } from "drizzle-orm";

async function getOrCreateUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  const existing = await db
    .select()
    .from(users)
    .where(eq(users.email, session.user.email));

  if (existing.length > 0) {
    return existing[0];
  }

  const [created] = await db
    .insert(users)
    .values({
      email: session.user.email,
      name: session.user.name,
      image: session.user.image,
    })
    .returning();

  return created;
}

export async function saveMessage(role: string, content: string) {
  const user = await getOrCreateUser();
  if (!user) return;

  await db.insert(messages).values({
    role,
    content,
    userId: user.id,
  });
}

export async function getChatHistory() {
  const user = await getOrCreateUser();
  if (!user) return [];

  return db
    .select()
    .from(messages)
    .where(eq(messages.userId, user.id))
    .orderBy(desc(messages.createdAt));
}