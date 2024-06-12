import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/database";
import { Posts } from "@/type";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

// 인증 미들웨어
async function authMiddleware(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ message: "인증 토큰이 없습니다." }, { status: 401 });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    return decodedToken;
  } catch (error) {
    return NextResponse.json({ message: "유효하지 않은 토큰입니다." }, { status: 403 });
  }
}

// GET: 게시글 목록 조회 (토큰 불필요)
export async function GET() {
  try {
    const db = await connectDB();
    const result = await db.collection("posts").find().toArray();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// POST: 게시글 생성 (토큰 필요)
export async function POST(req: NextRequest) {
  const decodedToken = await authMiddleware(req);
  if (decodedToken instanceof NextResponse) {
    return decodedToken;
  }

  try {
    const db = await connectDB();
    const data = await req.json();

    const newPost: Posts = {
      ...data,
      date: new Date().toISOString(),
    };

    await db.collection("posts").insertOne(newPost as any);
    return NextResponse.json(
      { message: "Post added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to add post:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE: 게시글 삭제 (토큰 필요)
export async function DELETE(req: NextRequest, { params }: { params: { postId: string } }) {
  const decodedToken = await authMiddleware(req);
  if (decodedToken instanceof NextResponse) {
    return decodedToken;
  }

  try {
    const postId = new ObjectId(params.postId);
    const db = await connectDB();

    // 게시글 작성자 확인
    const post = await db.collection("posts").findOne({ _id: postId });
    if (!post || post.writer.id !== decodedToken.id) { // 작성자 비교
      return NextResponse.json({ message: "권한이 없습니다." }, { status: 403 });
    }

    const result = await db.collection("posts").deleteOne({ _id: postId });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "포스트 삭제 실패" }, { status: 404 });
    }

    return NextResponse.json({ message: "성공적으로 삭제 완료!" }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete post:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// PUT: 게시글 수정 (토큰 필요)
export async function PUT(req: NextRequest, { params }: { params: { postId: string } }) {
  const decodedToken = await authMiddleware(req);
  if (decodedToken instanceof NextResponse) {
    return decodedToken;
  }

  try {
    const db = await connectDB();
    const postId = new ObjectId(params.postId);
    const data = await req.json();

    // 게시글 작성자 확인
    const post = await db.collection("posts").findOne({ _id: postId });
    if (!post || post.writer.id !== decodedToken.id) {
      return NextResponse.json({ message: "권한이 없습니다." }, { status: 403 });
    }

    await db.collection("posts").updateOne({ _id: postId }, { $set: data });
    return NextResponse.json(
      { message: "Post updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update post:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
