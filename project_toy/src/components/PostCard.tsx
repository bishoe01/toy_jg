"use client";
import { useDeletePost } from "@/hooks/usePostsActions";
import { confirm_alert } from "@/utils/confirmAlerts";
import { useRouter } from "next/navigation";
import { LiaComment, LiaHeartSolid, LiaThumbtackSolid } from "react-icons/lia";
import { Posts } from "@/type";

interface PostCardProps {
  post: Posts;
}

const BUTTON_STYLE = "py-1 px-2 text-sm border-[1px] rounded-lg";
const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const router = useRouter();
  const deletePost = useDeletePost();
  //   const user = useRecoilValue(userState);
  const user = {
    id: "a444",
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    confirm_alert("정말 삭제하시겠습니까?", "삭제", "#FF2200", () => {
      deletePost(post._id as string);
    });
  };

  return (
    <div
      onClick={() => router.push(`/posts/${post._id}`)}
      className="bg-primary rounded-2xl p-4 pt-2 relative cursor-pointer hover:brightness-125 transition-transform duration-300 ease-in-out shadow-md" // 그림자 추가
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-whiter">
          {post.writer.id}
        </span>
        {user?.id === post.writer.id && (
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/posts/edit/${post._id}`);
              }}
              className={`${BUTTON_STYLE} border-green-400 text-green-400 `}
            >
              수정
            </button>
            <button
              className={`${BUTTON_STYLE} border-whiter text-whiter`}
              onClick={handleDeleteClick}
            >
              {/* <LiaThumbtackSolid className="text-whiter text-lg" /> */}
              삭제하기
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

      <div className="flex items-center mt-1 text-gray-300">
        <LiaHeartSolid className="mr-1" />
        0
        <LiaComment className="ml-4 mr-1" />0
      </div>
    </div>
  );
};

export default PostCard;
