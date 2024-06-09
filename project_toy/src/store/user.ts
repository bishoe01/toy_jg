// store/userStore.ts
import { atom, selector } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: {
    id: '',
    isAuthenticated: false,
  },
});

export const tokenState = atom({
  key: 'tokenState',
  default: '',
});
