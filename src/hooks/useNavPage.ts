import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { LOGIN_PATHNAME, MANAGE_INDEX_PATHNAME } from '@/config/constants';
import { isLoginOrRegister, isNoNeedUserInfo } from '@/router';

import { useGetUserInfo } from './useGetUserInfo';

function useNavPage(waitingUserData: boolean) {
  const { username } = useGetUserInfo();
  const { pathname } = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    if (waitingUserData) return;

    // 已经登录
    if (username) {
      if (isLoginOrRegister(pathname)) {
        window.location.href = `/#${MANAGE_INDEX_PATHNAME}`; // 跳转页面
        window.location.reload(); // 刷新页面
      }
      return;
    }

    // 未登录
    const isMatch = isNoNeedUserInfo(pathname);
    if (isMatch) {
      console.log('不需要用户信息');
    } else {
      nav(LOGIN_PATHNAME);
    }
  }, [waitingUserData, username, pathname]);
}

export default useNavPage;
