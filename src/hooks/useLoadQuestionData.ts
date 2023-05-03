import { useRequest } from 'ahooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getQuestionService } from '@/services/question';
import { resetComponents } from '@/store/componentsReducer';

export const useLoadQuestionData = () => {
  const { id = '' } = useParams();
  const dispatch = useDispatch();

  const { loading, data, error, run } = useRequest(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    async (id: string) => {
      if (!id) throw new Error('没有问卷 id');
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const data = await getQuestionService(id);
      return data;
    },
    {
      manual: true,
    },
  );

  useEffect(() => {
    if (!data) return;
    const { componentList = [] } = data;
    // 获取默认的 selectedId
    let selectedId = '';
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id; // 默认选中第一个组件
    }
    dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }));
  }, [data]);

  useEffect(() => {
    run(id);
  }, [id]);

  return { loading, error };
};
