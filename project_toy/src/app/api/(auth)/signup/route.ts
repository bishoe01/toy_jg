import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/database";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const db = await connectDB();
    const { id, password } = await request.json();

    const existingUser = await db.collection("user").findOne({ id });
    if (existingUser) {
      return NextResponse.json(
        { message: "이미 사용 중인 아이디입니다." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = { id, password: hashedPassword };
    await db.collection("user").insertOne(user);

    return NextResponse.json({ message: "회원가입 성공" }, { status: 201 });
  } catch (error) {
    console.error("회원가입 실패:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function GET() {
  return NextResponse.json({ message: "GET request to the homepage" });
}
