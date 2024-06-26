"use client";
import PostCard from "./PostCard";
import { useEffect } from "react";
import { API_URL } from "@/type";
import { useRecoilState } from "recoil";
import { isPostDeletedState } from "@/store/posts";
import useFetchPosts from "@/hooks/usePostsActions";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";

const PostList: React.FC = () => {
  const [isPostDelete, setIsPostDelete] = useRecoilState(isPostDeletedState);
  const { postList, setPostList, loading, error, fetchPosts } =
    useFetchPosts(API_URL);
  const router = useRouter();

  useEffect(() => {
    if (isPostDelete) {
      fetchPosts();
      setIsPostDelete(false);
    }
  }, [isPostDelete]);

  if (loading)
    return (
      <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
        <ClipLoader color={"#4DA123"} loading={loading} size={150} />
      </div>
    );

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full flex flex-col gap-4">
      {postList.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center text-center my-40">
          <span className="text-whiter text-xl mb-4">
            현재 작성된 글이 없습니다
          </span>
          <button
            onClick={() => router.push("/register")}
            className="text-lg border-2 border-green-400 text-green-400 px-4 py-2 rounded-full hover:bg-green-600 transition"
          >
            작성하러 가기
          </button>
        </div>
      ) : (
        postList.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
};

export default PostList;
