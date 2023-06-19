import { useRequest } from 'ahooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getQuestionService } from '@/services/question';
import { resetComponents } from '@/store/componentsReducer';
import { resetPageInfo } from '@/store/pageInfoReducer';

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
    const { title = '', description = '', js = '', css = '', componentList = [], isPublished = false } = data;
    // 获取默认的 selectedId
    let selectedId = '';
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id; // 默认选中第一个组件
    }
    dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }));

    // 把 pageInfo 信息存到 redux 中
    dispatch(resetPageInfo({ title, description, js, css, isPublished }));
  }, [data]);

  useEffect(() => {
    run(id);
  }, [id]);

  return { loading, error };
};
