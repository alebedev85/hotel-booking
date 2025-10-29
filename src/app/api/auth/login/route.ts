import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signJwt } from "@/lib/jwt";

// Обработчик POST-запроса для авторизации пользователя
export async function POST(req: Request) {
  try {
    // Извлекаем email и пароль из тела запроса
    const { email, password } = await req.json();

    // Проверяем, что поля не пустые
    if (!email || !password) {
      return NextResponse.json({ error: "Заполните все поля" }, { status: 400 });
    }

    // Ищем пользователя в базе данных по email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Неверный логин или пароль" }, { status: 401 });
    }

    // Сравниваем введённый пароль с хешем из базы
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Неверный логин или пароль" }, { status: 401 });
    }

    // Генерируем JWT с id и email пользователя
    const token = signJwt({ id: user.id, email: user.email });

    // Формируем ответ и устанавливаем HttpOnly cookie с токеном
    const res = NextResponse.json({ ok: true });
    res.cookies.set({
      name: "token",
      value: token,
      httpOnly: true, // недоступно из JS
      secure: process.env.NODE_ENV === "production", // только HTTPS в продакшене
      sameSite: "lax", // защита от CSRF
      path: "/", // доступно во всём приложении
      maxAge: 60 * 60, // срок жизни cookie — 1 час
    });

    // Возвращаем успешный ответ
    return res;
  } catch (error) {
    // Логируем и возвращаем ошибку сервера
    console.error(error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
