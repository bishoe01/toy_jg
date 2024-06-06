import connectDB from "@/utils/database";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { postId: string }}) {
    try {
    const postId = new ObjectId(params.postId); // ObjectId 변환
    console.log("postId:", postId)

    const db = await connectDB();
    const result = await db.collection("posts").deleteOne({ _id: postId }); 

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "포스트 실패" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "성공적으로 삭제 완료 !" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete post:", error);
    return NextResponse.json({ message: "500에러" }, { status: 500 });
  }
}
