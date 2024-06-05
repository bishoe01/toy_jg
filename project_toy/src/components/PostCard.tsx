import { useDeletePost } from "@/hooks/usePostsActions";
import { FaRegTrashAlt } from "react-icons/fa";
import { confirm_alert } from "@/utils/confirmDelete";
import { useRouter } from "next/navigation";
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
      deletePost(post.post_id);
    });
  };

  return (
    <div
      onClick={() => router.push(`/posts/${post.post_id}`)}
      className="rounded-md border p-4 relative cursor-pointer hover:scale-105 hover:border-green-500 hover:shadow-lg transition-transform duration-300 ease-in-out"
    >
      <h2 className="text-lg font-bold">{post.title}</h2>
      <p>{post.content}</p>

      <button
        className="absolute top-2 right-2 z-10"
        onClick={handleDeleteClick}
      >
        <FaRegTrashAlt className="hover:text-red-500 rounded-md text-gray-700 text-xl" />
      </button>
    </div>
  );
};

export default PostCard;
