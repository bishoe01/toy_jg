import { postListState } from "@/store/posts";
import { Posts } from "@/type";
import { useRecoilCallback } from "recoil";

export const useAddPost = () => {
  return useRecoilCallback(({ set }) => (newPost: Posts) => {
    set(postListState, (prevPostList) => [...prevPostList, newPost]);
  });
};

export const useDeletePost = () => {
  return useRecoilCallback(({ set }) => (postId: string) => {
    set(postListState, (prevPostList) =>
      prevPostList.filter((post) => post._id !== postId)
    );
  });
};
