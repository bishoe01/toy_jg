"use client";
import { useRecoilValue } from "recoil";
import { postListState } from "@/store/posts";
import PostCard from "./PostCard";

const PostList: React.FC = () => {
  const postList = useRecoilValue(postListState);

  return (
    <div className="w-full grid grid-cols-3 gap-4">
      {postList.map((post) => (
        <PostCard key={post.post_id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
