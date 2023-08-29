import { useRequest } from 'ahooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getUserInfoService } from '@/services/user';
import { loginReducer } from '@/store/userReducer';

import { useGetUserInfo } from './useGetUserInfo';

function useLoadUserData() {
  const dispatch = useDispatch();

  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username } = result;
      const nickname = result.profile.nickname || username;
      // 存储到 redux store 中
      dispatch(loginReducer({ username, nickname, isLogin: true, waitingUserData: false }));
    },
  });

  // 从 redux store 中获取用户信息
  const userInfo = useGetUserInfo();
  const { username } = userInfo;

  // 判断是否已经存在用户信息（获取过）
  useEffect(() => {
    if (!username) {
      dispatch(loginReducer({ ...userInfo, waitingUserData: true }));
      run(); // 如果 username 不存在，就获取用户信息
    }
  }, [username]);
  return userInfo;
}

export default useLoadUserData;
