import { useRequest } from 'ahooks';
import { useSearchParams } from 'react-router-dom';

import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_SEARCH_PARAM_KEY,
} from '@/config/constants';
import { getQuestionListService } from '@/services/question';

type OptionType = {
  isStar: boolean;
  isDeleted: boolean;
};

function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
  const { isStar, isDeleted } = opt;
  const [searchParams] = useSearchParams();

  const { data, loading, error, refresh } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
      const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '', 10) || 1;
      const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '', 10) || LIST_PAGE_SIZE;

      const res = await getQuestionListService({ keyword, isStar, isDeleted, page, pageSize });
      return res;
    },
    {
      refreshDeps: [searchParams], // 刷新的依赖项
    },
  );

  return { data, loading, error, refresh };
}

export default useLoadQuestionListData;
