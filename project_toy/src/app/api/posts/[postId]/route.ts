import connectDB from "@/utils/database";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { postId: string } }) {
  try {
    if (!ObjectId.isValid(params.postId)) { // params.postId 사용
      return new NextResponse(JSON.stringify({ message: 'Invalid post ID' }), { status: 400 });
    }

    const db = await connectDB();
    const post = await db.collection('posts').findOne({ _id: new ObjectId(params.postId) });

    if (!post) {
      return new NextResponse(JSON.stringify({ message: 'Post not found' }), { status: 404 });
    }

    return new NextResponse(JSON.stringify(post), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}
