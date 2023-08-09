import { useSelector } from 'react-redux';

import { StateType } from '@/store';
import { AnswerRolesType } from '@/store/answerRolesReducer';

export function useGetAnswerRoles<T>() {
  const answerRoles = useSelector<StateType<T>>((state) => state.answerRoles) as AnswerRolesType;
  return answerRoles;
}
