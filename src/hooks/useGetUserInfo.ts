import { useSelector } from 'react-redux';

import { StateType } from '@/store';
import { UserStateType } from '@/store/userReducer';

export const useGetUserInfo = <T>() => {
  const { username, nickname } = useSelector<StateType<T>>((state) => state.user) as UserStateType;
  return { username, nickname };
};
