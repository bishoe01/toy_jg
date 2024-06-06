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
    <div className=" w-full flex flex-col gap-4">
      <button
        className="bg-secondary text-whiter px-2 py-1 rounded-lg mt-2"
        onClick={(e) => {
          e.stopPropagation();
          // axios요청 to add post
          axios.post("/api/posts", {
            title: "한글 제목",
            content: "한글 내용, 그리고 그렇게 된다",
            date: new Date().toISOString(),
            writer: {
              id: "한글맨",
            },
          });
        }}
      >
        ADD
      </button>
      {postList.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
