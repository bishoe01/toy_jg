"use client";
import PostCard from "./PostCard";
import { useEffect, useState } from "react";
import { API_URL, Posts } from "@/type";
import { useRecoilState } from "recoil";
import { isPostDeletedState } from "@/store/posts";
import useFetchPosts from "@/hooks/usePostsActions";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const FilteredPostList: React.FC = () => {
  const [isPostDelete, setIsPostDelete] = useRecoilState(isPostDeletedState);
  const { postList, setPostList, loading, error, fetchPosts } =
    useFetchPosts(API_URL);
  const router = useRouter();
  const [nickname, setNickname] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const nickname = localStorage.getItem("nickname");
    if (!token || !nickname) {
      Swal.fire({
        title: "유저 정보가 없습니다.",
        text: "로그인 해주세요",
        icon: "warning",
        confirmButtonText: "확인",
        background: "#383838",
        color: "#FBFBFB",
      }).then(() => {
        router.push("/login");
      });
    }
  }, [router]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedNickname = localStorage.getItem("nickname");
      setNickname(storedNickname);
    }
  }, []);

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

  const filteredPosts = postList.filter(
    (post: Posts) => post.nickname === nickname
  );

  return (
    <div className="w-full flex flex-col gap-4">
      {filteredPosts.length === 0 ? (
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
        filteredPosts.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
};

export default FilteredPostList;
