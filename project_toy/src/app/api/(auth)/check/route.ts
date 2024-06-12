import connectDB from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) {
    return NextResponse.json({ message: '토큰이 없습니다.' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const db = await connectDB();
    const user = await db.collection('user').findOne({id : decoded.userId});
    if (!user) {
      return NextResponse.json({ message: '유저를 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json({ id: user.id, name: user.name }, { status: 200 });
  } catch (error) {
    console.error('유저 정보 가져오기 실패:', error);
    return NextResponse.json({ message: '토큰이 유효하지 않습니다.' }, { status: 403 });
  }
}
