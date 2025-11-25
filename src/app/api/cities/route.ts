import cities from "@/data/cities.json";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const query = url.searchParams.get("query")?.toLowerCase() || "";

  if (!query) {
    return NextResponse.json([]);
  }

  const results = cities.filter(
    (c) =>
      c.name_ru.toLowerCase().includes(query) ||
      c.name_en.toLowerCase().includes(query)
  );

  return NextResponse.json(results);
}