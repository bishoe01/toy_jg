import { Posts } from "@/type";
import { atom, selectorFamily } from "recoil";


// 모든 게시글 목록 상태
const postListState = atom<Posts[]>({
  key: "postListState",
  default: [
    {
      post_id: 1,
      title: "제목1",
      content: "내용1",
      date: new Date().toISOString(),
      writer: {
        id: "kevin",
      },
    },
    {
      post_id: 2,
      title: "제목2",
      content: "내용2",
      date: new Date().toISOString(),
      writer: {
        id: "james",
      },
    },
    {
      post_id: 3,
      title: "제목3",
      content: "내용3",
      date: new Date().toISOString(),
      writer: {
        id: "david",
      },
    },
  ],
});

// 상세 게시글 관련
const postSelector = selectorFamily<Posts | undefined, number>({
  key: "postSelector",
  get:
    (postId) =>
    ({ get }) => {
      const postList = get(postListState);
      return postList.find((post) => post.post_id === postId);
    },
  set:
    (postId) =>
    ({ set }, newPost) => {
      set(postListState, (prevPostList) => {
        const index = prevPostList.findIndex((post) => post.post_id === postId);
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
