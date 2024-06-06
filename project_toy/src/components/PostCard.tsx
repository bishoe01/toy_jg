import { useDeletePost } from "@/hooks/usePostsActions";
import { confirm_alert } from "@/utils/confirmDelete";
import { useRouter } from "next/navigation";
import { LiaComment, LiaHeartSolid, LiaThumbtackSolid } from "react-icons/lia";
import { Posts } from "@/type";

interface PostCardProps {
  post: Posts;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const router = useRouter();
  const deletePost = useDeletePost();

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    confirm_alert("정말 삭제하시겠습니까?", "삭제", "#FF2200", () => {
      deletePost(post._id as string);
    });
  };

  return (
    <div
      onClick={() => router.push(`/posts/${post._id}`)}
      className="bg-primary rounded-2xl p-4 relative cursor-pointer hover:brightness-125 transition-transform duration-300 ease-in-out shadow-md" // 그림자 추가
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-whiter">
          {post.writer.id}
        </span>
        <button
          className="p-2 bg-red-600 rounded-full hover:bg-red-700"
          onClick={handleDeleteClick}
        >
          <LiaThumbtackSolid className="text-white text-lg" />
        </button>
      </div>

      <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">
        {post.title}
      </h2>

      <div className="relative overflow-hidden group">
        <p
          className="text-gray-secondary bg-secondary p-3 rounded-md text-sm line-clamp-3 overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
          }}
        >
          {post.content}
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque eum
          saepe, nostrum molestias voluptatibus sapiente necessitatibus ullam!
          Consequatur, placeat at!
        </p>
        <div
          className="absolute inset-0 bg-gradient-to-t from-primary
         to-transparent pointer-events-none group-hover:hidden"
        ></div>{" "}
      </div>

      <div className="flex items-center mt-2 text-gray-300">
        <LiaHeartSolid className="mr-1" />
        0
        <LiaComment className="ml-4 mr-1" />0
      </div>
    </div>
  );
};

export default PostCard;
