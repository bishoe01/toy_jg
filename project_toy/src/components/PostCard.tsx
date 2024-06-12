"use client";
import { confirm_alert } from "@/utils/confirmAlerts";
import { useRouter, usePathname } from "next/navigation";
import { API_URL, Posts } from "@/type";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "@/store/user";
import axios from "axios";
import { isPostDeletedState } from "@/store/posts";

interface PostCardProps {
  post: Posts;
}

const BUTTON_STYLE = "py-1 px-2 text-sm border-[1px] rounded-md";
const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const router = useRouter();
  const pathname = usePathname(); // 현재 URL 경로를 가져옴
  const { nickname } = useRecoilValue(userState);
  const setIsPostDelete = useSetRecoilState(isPostDeletedState);

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    confirm_alert("정말 삭제하시겠습니까?", "삭제", "#FF2200", async () => {
      try {
        await axios.delete(`${API_URL}api/posts/${post._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setIsPostDelete(true);

        if (pathname === "/mypage") {
          router.push("/mypage");
        } else {
          router.push("/");
        }
      } catch (error) {
        confirm_alert("게시글 삭제 실패", "확인", "#FF2200", async () => {
          console.error("게시글 삭제 실패:", error);
        });
      }
    });
  };

  return (
    <div
      onClick={() => router.push(`/posts/${post._id}`)}
      className="bg-primary rounded-2xl p-4 py-5 pt-3 relative cursor-pointer hover:brightness-125 transition-transform duration-300 ease-in-out"
    >
      <div className="flex items-center justify-between">
        <div className="text-md font-medium text-whiter">
          <span className="text-xs text-green-400 italic mr-2">nickname</span>
          {post.nickname}
        </div>
        {(nickname === post.nickname ||
          localStorage.getItem("nickname") === post.nickname) && (
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/posts/edit/${post._id}`);
              }}
              className={`${BUTTON_STYLE} border-green-400 text-green-400`}
            >
              수정
            </button>
            <button
              className={`${BUTTON_STYLE} border-red-400 text-red-400`}
              onClick={handleDeleteClick}
            >
              삭제
            </button>
          </div>
        )}
      </div>

      <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">
        {post.title}
      </h2>

      <div className="relative overflow-hidden group">
        <p className="text-gray-secondary bg-secondary p-3 rounded-md text-sm line-clamp-3 overflow-hidden">
          {post.content}
        </p>
        <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent pointer-events-none group-hover:hidden"></div>{" "}
        <div className="absolute inset-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
          <p className="text-gray-secondary bg-secondary rounded-md text-sm">
            {post.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
