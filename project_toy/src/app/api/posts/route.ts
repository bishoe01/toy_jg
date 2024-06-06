import { Posts } from '@/type';
import connectDB from '@/utils/database';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        const db = await connectDB();
        const result = await db.collection("posts").find().toArray();
        console.log("result:", result)
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}


export async function POST(req: Request) {
  try {
    const db = await connectDB();

    const data = await req.json();
    const newPost: Posts = {
      ...data
    };
    console.log("req.body:", newPost);

    await db.collection("posts").insertOne(newPost as any); // 변환된 데이터 사용
    return NextResponse.json(
      { message: "Post added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to add post:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// export async function DELETE(req: any) {
//     try {
//         const db = await connectDB();
//         await db.collection("posts").deleteOne({
//             post_id:
//                 req.body.post_id
//         });

//         return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 });
//     }
//     catch (error) {
//         console.error('Failed to delete post:', error);
//         return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//     }
// }

type Params = {
  postId: string;
};

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const postId = Number(params.postId); // 문자열 postId를 숫자로 변환

    const db = await connectDB();
    const result = await db.collection("posts").deleteOne({ post_id: postId });

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


export async function PUT(req: any) {
    try {
        const db = await connectDB();
        await db.collection("posts").updateOne({ post_id: req.body.post_id }, { $set: req.body });
        return NextResponse.json({ message: 'Post updated successfully' }, { status: 200 });
    }
    catch (error) {
        console.error('Failed to update post:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
