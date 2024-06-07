import connectDB from "@/utils/database";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"; // 비밀번호 암호화 라이브러리
import jwt from "jsonwebtoken"; // JWT 라이브러리

export async function POST(request: NextRequest) {
  try {
    const db = await connectDB();
    const { id, password } = await request.json();
    

    const user = await db.collection("user").findOne({ id });
    console.log("user:", user)

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    return NextResponse.json({ message: "Login successful", token }, { status: 200 });
  } catch (error) {
    console.error("Login failed:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
