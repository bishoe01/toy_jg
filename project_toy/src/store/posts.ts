import { Posts } from "@/type";
import { atom, selectorFamily } from "recoil";

// 모든 게시글 목록 상태
const postListState = atom<Posts[]>({
  key: "postListState",
  default: [
    {
      _id: "66646a3c1c0c363ecdbf43b0",
      title: "제발 등록",
      content: "제발 등록되라 제발",
      date: "2024-06-08T14:27:08.612Z",
      writer: {
        id: "systemcall",
      },
      likedUser: ['a444' ,'systemcall'],
    },
    {
      _id: "66646aa51c0c363ecdbf43b1",
      title: "이상태에서 등록하면",
      content: "이렇게 등록하면 되겠네",
      date: "2024-06-08T14:28:53.633Z",
      writer: {
        id: "sanori",
      },
      likedUser: [],
    },
    {
      _id: "66646adf1c0c363ecdbf43b2",
      title: "이제 진짜 ",
      content: "이제 진짜 등록되겠네",
      date: "2024-06-08T14:29:51.621Z",
      writer: {
        id: "a444",
      },
      likedUser: ['bishoe01'],
    },
  ],
});

// 상세 게시글 관련
const postSelector = selectorFamily<Posts | undefined, string>({
  key: "postSelector",
 get:
    (postId) =>
    ({ get }) => {
      const postList = get(postListState);
      const foundPost = postList.find((post) => post._id === postId);
      return foundPost ?? ({} as Posts); 
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

// 내가 좋아요한 글 목록
const myLikeListState = selectorFamily<Posts[], string>({
  key: "myLikeListState",
  get:
    (userId) =>
    ({ get }) => {
      const postList = get(postListState);
      return postList.filter((post) => post.likedUser.includes(userId));
    },
});

// 내가 쓴 글 목록
const myPostListState = selectorFamily<Posts[], string>({
  key: "myPostListState",
  get:
    (userId) =>
    ({ get }) => {
      const postList = get(postListState);
      return postList.filter((post) => post.writer.id === userId);
    },
});

export { postListState, postSelector, myPostListState , myLikeListState};
