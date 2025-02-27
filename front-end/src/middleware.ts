import { NextRequest, NextResponse } from "next/server";
import { getCookieServer } from "@/lib/cookieServer";
import { api } from "@/services/api";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/_nex") || pathname === "/") {
    return NextResponse.next();
  }

  const { token, userId } = await getCookieServer();

  if (pathname.startsWith("/dashboard")) {
    if (!token || !userId) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const isValid = await validateToken(token, userId);

    if (!isValid) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

async function validateToken(token: string, userId: string) {
  if (!token || !userId) return false;

  try {
    const response = await api.get(`/api/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.status === 200;
  } catch (err) {
    console.error(`Erro ao validar token: ${err}`);
    return false;
  }
}
