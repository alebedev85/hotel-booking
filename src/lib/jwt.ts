import jwt from "jsonwebtoken";

// Тип payload для твоего проекта
export interface JwtUserPayload {
  id: string;
  email: string;
}

// Секретный ключ для подписи JWT (из .env)
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Время жизни токена
const JWT_EXPIRES_IN = "1h";

/**
 * Генерация JWT для пользователя
 * @param payload - объект с id и email пользователя
 * @returns подписанный JWT
 */
export function signJwt(payload: JwtUserPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Проверка JWT и извлечение payload
 * @param token - JWT токен
 * @returns payload с id и email, если токен валиден, иначе null
 */
export function verifyJwt(token: string): JwtUserPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtUserPayload;
  } catch {
    return null;
  }
}
