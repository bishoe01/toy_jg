"use client";
import { useRouter } from "next/navigation";
import { useRecoilState, useRecoilValue } from "recoil";
import { postSelector } from "@/store/posts";
import { confirm_alert } from "@/utils/confirmAlerts";
import { useDeletePost } from "@/hooks/usePostsActions";
import { LiaHeart, LiaHeartSolid } from "react-icons/lia";

type Props = {
  params: {
    postId: string;
  };
};

function PostDetailPage({ params }: Props) {
  const router = useRouter();
  const [post, setPost] = useRecoilState(postSelector(params.postId));
  //   const user = useRecoilValue(userState);
  //TODO
  const user = {
    id: "bishoe01",
  };
  const deletePost = useDeletePost();
  return (
    <div className="w-full mx-auto p-4 bg-primary rounded-2xl">
      <h1 className="text-3xl font-bold text-white mb-4">{post.title}</h1>
      <p className="text-gray-400 mb-4">
        {new Date(post.date).toLocaleString()}
      </p>
      <div className="text-whiter mb-4">{post.content}</div>
      <p className="text-gray-400">작성자: {post.writer.id}</p>
      {user?.id === post.writer.id ? (
        <div className="mt-4 flex space-x-2">
          <button
            onClick={() => router.push(`/posts/edit/${post._id}`)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            수정
          </button>
          <button
            onClick={() => {
              confirm_alert("정말 삭제하시겠습니까?", "삭제", "#FF2200", () => {
                deletePost(post._id as string);
                router.push("/");
              });
            }}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            삭제
          </button>
        </div>
      ) : post?.likedUser.includes(user.id) ? (
        <button className="py-1 px-3  text-white">
          <LiaHeartSolid color="#FBFBFB" />
        </button>
      ) : (
        <button className="py-1 px-3  text-white">
          <LiaHeart color="#FBFBFB" />
        </button>
      )}
    </div>
  );
}

export default PostDetailPage;
