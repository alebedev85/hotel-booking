import { NextResponse } from "next/server";

// Обработчик POST-запроса для выхода пользователя (logout)
export async function POST() {
  // Создаём базовый ответ с флагом успешного выполнения
  const res = NextResponse.json({ ok: true });

  // Удаляем cookie с токеном, устанавливая пустое значение и срок жизни 0
  res.cookies.set("token", "", { maxAge: 0, path: "/" });

  // Возвращаем ответ клиенту
  return res;
}