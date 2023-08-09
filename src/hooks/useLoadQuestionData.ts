import { useRequest } from 'ahooks';
import { message } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { getQuestionService } from '@/services/question';
import { Role, resetAnswerRoles } from '@/store/answerRolesReducer';
import { resetComponents } from '@/store/componentsReducer';
import { resetPageInfo } from '@/store/pageInfoReducer';

export const useLoadQuestionData = (fetchBackendData: boolean) => {
  const { id = '' } = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const { loading, data, error, run } = useRequest(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    async (id: string) => {
      try {
        if (!id) throw new Error('没有问卷 id');
        if (fetchBackendData) {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const data = await getQuestionService(id);
          return data;
        }
        return {};
      } catch (err) {
        console.error('获取问卷数据失败:', err);
        // 提示返回上一页
        message.error('返回上一页');
        setTimeout(() => {
          nav(-1);
        }, 2000);
        throw err;
      }
    },
    {
      manual: true,
    },
  );

  useEffect(() => {
    if (!data) return;
    const {
      title = '',
      description = '',
      js = '',
      css = '',
      componentList = [],
      isPublished = false,
      roles = [],
    } = data;
    // 获取默认的 selectedId
    let selectedId = '';
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id; // 默认选中第一个组件
    }
    dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }));

    // 把 pageInfo 信息存到 redux 中
    dispatch(resetPageInfo({ title, description, js, css, isPublished }));

    // 把问卷回答角色信息存到 redux 中
    dispatch(resetAnswerRoles(roles.map((role: Role) => role.id)));
  }, [data]);

  useEffect(() => {
    run(id);
  }, [id]);

  return { loading, error };
};
