import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { userState } from '@/store/user';

const useAuth = () => {
  const [user, setUser] = useRecoilState(userState);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // 컴포넌트가 클라이언트 측에서 마운트되었음을 설정

    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        Swal.fire({
          title: "로그인이 필요합니다.",
          text: "로그인 페이지로 이동합니다.",
          icon: "warning",
          confirmButtonText: "확인"
        }).then(() => {
          router.push('/login');
        });
        return;
      }

      try {
        const response = await axios.get('/api/check', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error('유저 정보 가져오기 실패:', error);
        localStorage.removeItem('token');
        Swal.fire({
          title: "토큰이 유효하지 않습니다.",
          text: "다시 로그인 해주세요.",
          icon: "error",
          confirmButtonText: "확인"
        }).then(() => {
          router.push('/login');
        });
      }
    };

    if (isClient) {
      fetchUserData();
    }
  }, [isClient, router, setUser]);

  return { user };
};

export default useAuth;
