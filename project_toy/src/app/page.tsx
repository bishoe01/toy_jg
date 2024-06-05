import PostList from "@/components/PostList";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center p-24">
      <h1 className="text-4xl font-bold text-center mb-8">정글 게시판</h1>
      <PostList />
    </main>
  );
}
