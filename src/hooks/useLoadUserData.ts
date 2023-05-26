import { useRequest } from 'ahooks';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useParams } from 'react-router-dom';

import { getUserInfoService } from '@/services/user';
import { loginReducer } from '@/store/userReducer';

import { useGetUserInfo } from './useGetUserInfo';

function useLoadUserData() {
  const dispatch = useDispatch();
  const { id = '' } = useParams();
  const [waitingUserData, setWaitingUserData] = useState(true);

  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result;
      // 存储到 redux store 中
      dispatch(loginReducer({ username, nickname }));
    },
    onFinally() {
      setWaitingUserData(false);
    },
  });

  // 从 redux store 中获取用户信息
  const { username } = useGetUserInfo();

  // 判断是否已经存在用户信息（获取过）
  useEffect(() => {
    if (username) {
      setWaitingUserData(false);
    }
    run(id); // 如果 username 不存在，就获取用户信息
  }, [username]);
  return { waitingUserData };
}

export default useLoadUserData;
