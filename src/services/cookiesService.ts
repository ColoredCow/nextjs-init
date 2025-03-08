"use server";

import { cookies } from "next/headers";

async function getCookieStore() {
  return await cookies();
}

export async function createCookie(key: string, value: string) {
  const cookieStore = await getCookieStore();
  cookieStore.set(key, value, { secure: true });
}

export async function readCookie(key: string) {
  const cookieStore = await getCookieStore();
  return cookieStore.get(key);
}

export async function removeCookie(key: string) {
  const cookieStore = await getCookieStore();
  cookieStore.delete(key);
}

export async function checkCookie(key: string) {
  const cookieStore = await getCookieStore();
  return cookieStore.has(key);
}
