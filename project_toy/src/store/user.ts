// store/userStore.ts
import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: {
    nickname: '',
    isAuthenticated: false,
  },
});

export const tokenState = atom({
  key: 'tokenState',
  default: '',
});
