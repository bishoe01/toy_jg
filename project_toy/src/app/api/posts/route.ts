import connectDB from '@/utils/database';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const db = await connectDB();
        const result = await db.collection("posts").find().toArray();
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: any) {
    try {
        const db = await connectDB();
        await db.collection("posts").insertOne(req.body);
        return NextResponse.json({ message: 'Post added successfully' }, { status: 201 });
    } catch (error) {
        console.error('Failed to add post:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(req: any) {
    try {
        const db = await connectDB();
        await db.collection("posts").deleteOne({
            post_id:
                req.body.post_id
        });

        return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 });
    }
    catch (error) {
        console.error('Failed to delete post:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
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
