import { NextResponse } from "next/server";
import { verifyJwt } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";

// Обработчик GET-запроса для проверки авторизации пользователя
export async function GET(req: Request) {
  // Извлекаем cookie из заголовков запроса
  const cookieHeader = req.headers.get("cookie");

  // Получаем токен из cookie (если есть)
  const token = cookieHeader?.split("token=")[1]?.split(";")[0];

  // Если токена нет — пользователь не авторизован
  if (!token) return NextResponse.json({ authenticated: false });

  // Проверяем валидность токена и получаем payload (id, email и т.д.)
  const payload = verifyJwt(token);
  if (!payload) return NextResponse.json({ authenticated: false });

  // Проверяем, существует ли пользователь в базе данных
  const user = await prisma.user.findUnique({ where: { id: payload.id } });
  if (!user) return NextResponse.json({ authenticated: false });

  // Возвращаем успешный ответ с данными пользователя
  return NextResponse.json({
    authenticated: true,
    user: { id: user.id, email: user.email },
  });
}
