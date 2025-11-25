import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

// Обработчик POST-запроса для регистрации нового пользователя
export async function POST(req: Request) {
  try {
    // Извлекаем email и пароль из тела запроса
    const { email, password } = await req.json();

    // Проверяем, что оба поля заполнены
    if (!email || !password) {
      return NextResponse.json({ error: "Заполните все поля" }, { status: 400 });
    }

    // Проверяем, существует ли пользователь с таким email
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "Такой пользователь уже существует" },
        { status: 409 }
      );
    }

    // Хешируем пароль перед сохранением в базу
    const passwordHash = await bcrypt.hash(password, 10);

    // Создаём нового пользователя в базе данных
    const newUser = await prisma.user.create({
      data: { email, passwordHash },
    });

    // Возвращаем успешный ответ с данными созданного пользователя
    return NextResponse.json({
      ok: true,
      user: { id: newUser.id, email: newUser.email },
    });
  } catch (error) {
    // Логируем ошибку и возвращаем статус 500
    console.error(error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
