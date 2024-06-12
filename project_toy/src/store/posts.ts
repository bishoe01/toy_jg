import { atom, selectorFamily } from "recoil";

// 게시글 삭제 상태 (true: 삭제됨, false: 삭제되지 않음)
const isPostDeletedState = atom<boolean>({
  key: "isPostDeletedState",
  default: false,
});

export { isPostDeletedState };
