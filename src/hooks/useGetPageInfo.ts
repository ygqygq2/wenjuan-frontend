import { useSelector } from 'react-redux';

import { StateType } from '@/store';
import { PageInfoType } from '@/store/pageInfoReducer';

export function useGetPageInfo<T>() {
  const pageInfo = useSelector<StateType<T>>((state) => state.pageInfo) as PageInfoType;
  return pageInfo;
}
