import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt, JwtUserPayload } from "@/lib/jwt";

// Middleware для защиты маршрутов, доступных только авторизованным пользователям
export function middleware(req: NextRequest) {

  // Получаем JWT-токен из cookie
  const token = req.cookies.get("token")?.value;

  // Если токен отсутствует — пользователь не авторизован
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/"; // редирект на главную страницу
    return NextResponse.redirect(url);
  }

  // Проверяем токен и получаем payload с id и email
  const payload: JwtUserPayload | null = verifyJwt(token);

  // Если токен недействителен — редирект на главную
  if (!payload) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Если токен валиден — продолжаем выполнение запроса
  return NextResponse.next();
}

// Конфигурация: middleware применяется только к маршрутам /hotels/**
export const config = {
  matcher: ["/hotels/:path*"],
};
