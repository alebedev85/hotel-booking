import { NextResponse } from "next/server";
import { verifyJwt } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const cookieHeader = req.headers.get("cookie");
  const token = cookieHeader?.split("token=")[1]?.split(";")[0];

  if (!token) return NextResponse.json({ authenticated: false });

  const payload = verifyJwt(token);
  if (!payload) return NextResponse.json({ authenticated: false });

  const user = await prisma.user.findUnique({ where: { id: payload.id } });
  if (!user) return NextResponse.json({ authenticated: false });

  return NextResponse.json({
    authenticated: true,
    user: { id: user.id, email: user.email },
  });
}
