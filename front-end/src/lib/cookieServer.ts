import { cookies } from "next/headers";

export async function getCookieServer() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const userId = cookieStore.get("userId")?.value;

  return { token: token || null, userId: userId || null };
}
