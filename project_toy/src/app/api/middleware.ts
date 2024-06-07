import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1]; // Bearer 토큰 추출

  if (!token) {
    return new NextResponse(
      JSON.stringify({ message: "Authentication token missing" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Invalid token" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }
}
