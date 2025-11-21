import { NextResponse } from "next/server";
import hotels from "@/data/moscow_hotels.json";

// Словарь русские → английские города
const cityMap: Record<string, string> = {
  "москва": "Moscow",
  "санкт-петербург": "Saint Petersburg",
  "казань": "Kazan",
  "сочи": "Sochi",
  "новосибирск": "Novosibirsk",
  "екатеринбург": "Yekaterinburg"
  // добавь остальные города по необходимости
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("location");

  if (!city) {
    return NextResponse.json({ hotels: [], total: 0 });
  }

  // Ищем английское название через словарь
  const cityEng = cityMap[city.toLowerCase()];
  if (!cityEng) {
    return NextResponse.json({ hotels: [], total: 0 });
  }

  // Фильтр по английскому названию города
  const filtered = hotels.filter(
    (h) => h.location.city === cityEng
  );

  return NextResponse.json({
    hotels: filtered,
    total: filtered.length,
  });
}
