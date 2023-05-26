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
        nav(MANAGE_INDEX_PATHNAME);
      }
      return;
    }

    // 未登录
    if (isNoNeedUserInfo(pathname)) {
      console.log(pathname);
      console.log('不需要登录路由');
    } else {
      nav(LOGIN_PATHNAME);
    }
  }, [waitingUserData, username, pathname]);
}

export default useNavPage;
