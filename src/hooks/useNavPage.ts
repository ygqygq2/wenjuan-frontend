import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { LOGIN_PATHNAME, MANAGE_INDEX_PATHNAME } from '@/config/constants';
import { isLoginOrRegister, isNoNeedUserInfo } from '@/router';

import { UserStateType } from '@/store';

function useNavPage(userInfo: UserStateType) {
  const { pathname } = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    if (userInfo.waitingUserData && !userInfo.isLogin) return;

    // 已经登录
    if (userInfo.isLogin) {
      if (isLoginOrRegister(pathname)) {
        nav(MANAGE_INDEX_PATHNAME);
        return;
      }
      return;
    }

    // 未登录
    const isMatch = isNoNeedUserInfo(pathname);
    if (isMatch) {
      // console.log ('不需要用户信息');
    } else {
      nav(LOGIN_PATHNAME);
    }
  }, [userInfo, pathname, nav]);
}

export default useNavPage;
