// utils/auth.ts
import { tokenState, userState } from '@/store/user';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';

export const useAuth = () => {
  const setUser = useSetRecoilState(userState);
  const setToken = useSetRecoilState(tokenState);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser({ id: response.data.id, isAuthenticated: true });
        setToken(token);
      } catch (error) {
        localStorage.removeItem('token');
        setUser({ id: '', isAuthenticated: false });
        setToken('');
      }
    } else {
      setUser({ id: '', isAuthenticated: false });
    }
  };

  return checkAuth;
};
