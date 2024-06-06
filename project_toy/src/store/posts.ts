import { Posts } from "@/type";
import { atom, selectorFamily } from "recoil";


// 모든 게시글 목록 상태
const postListState = atom<Posts[]>({
  key: "postListState",
  default: [
  ],
});

// 상세 게시글 관련
const postSelector = selectorFamily<Posts | undefined, string>({
  key: "postSelector",
  get:
    (postId) =>
    ({ get }) => {
      const postList = get(postListState);
      return postList.find((post) => post._id === postId);
    },
  set:
    (postId) =>
    ({ set }, newPost) => {
      set(postListState, (prevPostList) => {
        const index = prevPostList.findIndex((post) => post._id === postId);
        if (index === -1) {
          return [...prevPostList, newPost as Posts]; // 새 글 추가
        } else {
          return [
            ...prevPostList.slice(0, index),
            newPost as Posts,
            ...prevPostList.slice(index + 1),
          ]; // 기존 글 수정
        }
      });
    },
});

export { postListState, postSelector };
