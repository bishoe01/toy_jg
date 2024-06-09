"use client";
import { useRecoilValue } from "recoil";
import { postListState } from "@/store/posts";
import PostCard from "./PostCard";

const PostList: React.FC = () => {
  const postList = useRecoilValue(postListState);

  return (
    <div className=" w-full flex flex-col-reverse gap-4">
      {postList.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
