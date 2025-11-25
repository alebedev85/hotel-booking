import hotels from "@/data/moscow_hotels_city_id.json"; // пока один файл
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const city_id = Number(url.searchParams.get("city_id"));

  if (!city_id) {
    return NextResponse.json({ hotels: [], total: 0 });
  }

  const filtered = hotels.filter((h) => h.city_id === city_id);

  return NextResponse.json({
    hotels: filtered,
    total: filtered.length
  });
}
