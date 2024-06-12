import connectDB from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const db = await connectDB();
    const { id, password } = await request.json();

    const user = await db.collection("user").findOne({ id });
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
