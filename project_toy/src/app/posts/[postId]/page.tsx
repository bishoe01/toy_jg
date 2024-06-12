"use client";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { confirm_alert } from "@/utils/confirmAlerts";
import { userState } from "@/store/user";
import { useEffect, useState } from "react";
import { API_URL, Posts } from "@/type";
import axios from "axios";

type Props = {
  params: {
    postId: string;
  };
};

function PostDetailPage({ params }: Props) {
  const router = useRouter();
  const [post, setPost] = useState<Posts | null>();
  useEffect(() => {
    axios.get(`${API_URL}api/posts/${params.postId}`).then((res) => {
      setPost(res.data.posts[0]);
    });
  }, []);
  const { nickname } = useRecoilValue(userState);
  return (
    <div className="flex flex-col gap-2">
      <div className="w-full h-full mx-auto p-4 bg-primary rounded-2xl">
        <h1 className="text-3xl font-bold text-white mb-4">{post?.title}</h1>
        <p className="text-gray-400 mb-4">
          {new Date(post?.date).toLocaleDateString()}
        </p>
        <div className="text-whiter mb-4">{post?.content}</div>
        <p className="text-gray-400">작성자: {post?.nickname}</p>
        {nickname === post?.nickname && (
          <div className="mt-4 flex space-x-2">
            <button
              onClick={() => router.push(`/posts/edit/${post._id}`)}
              className="border-green-400 border-[1px] px-4 py-2 rounded text-green-400 hover:bg-green-600"
            >
              수정
            </button>
            <button
              onClick={() => {
                confirm_alert(
                  "정말 삭제하시겠습니까?",
                  "삭제",
                  "#FF2200",
                  () => {
                    deletePost(post._id as string);
                    router.push("/");
                  }
                );
              }}
              className="px-4 py-2 rounded border-[1px] text-red-400 border-red-400 "
            >
              삭제
            </button>
          </div>
        )}
        {/* comment */}
      </div>
    </div>
  );
}

export default PostDetailPage;
