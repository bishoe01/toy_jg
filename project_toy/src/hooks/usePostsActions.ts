import { postListState } from "@/store/posts";
import { Posts } from "@/type";
import { useRecoilCallback } from "recoil";

// 추가
export const useAddPost = () => {
  return useRecoilCallback(({ set }) => (newPost: Posts) => {
    set(postListState, (prevPostList) => [...prevPostList, newPost]);
  });
};

// 삭제
export const useDeletePost = () => {
  return useRecoilCallback(({ set }) => (postId: number) => {
    set(postListState, (prevPostList) =>
      prevPostList.filter((post) => post.post_id !== postId)
    );
  });
};
