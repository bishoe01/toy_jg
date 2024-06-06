"use client";
import { useRecoilState, useRecoilValue } from "recoil";
import { postListState } from "@/store/posts";
import PostCard from "./PostCard";
import { useEffect } from "react";
import axios from "axios";

const PostList: React.FC = () => {
  const [postList, setPostList] = useRecoilState(postListState);
  useEffect(() => {
    axios.get("/api/posts").then((res) => {
      setPostList(res.data);
    });
  }, []);

  return (
    <div className=" w-full flex flex-col-reverse gap-4">
      {postList.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
