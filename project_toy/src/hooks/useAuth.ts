import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

const useAuthCheck = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const nickname = localStorage.getItem('nickname');

    if (!token || !nickname) {
      Swal.fire({
        title: '유저 정보가 없습니다.',
        text: '로그인 해주세요',
        icon: 'warning',
        confirmButtonText: '확인',
        background: '#383838',
        color: '#FBFBFB',
      }).then(() => {
        router.push('/login');
      });
    }
  }, [router]);
};

export default useAuthCheck;
