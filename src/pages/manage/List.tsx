import { useRequest, useTitle } from 'ahooks';
import { Spin, Typography } from 'antd';
import { FC } from 'react';

import ListSearch from '@/components/ListSearch';
import { getQuestionListService } from '@/services/question';

import QuestionCard from '../../components/QuestionCard';

import styles from './List.module.scss';

const { Title } = Typography;

const List: FC = () => {
  useTitle('问卷调查 - 我的问卷');

  const { data = {}, loading } = useRequest(getQuestionListService);
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { list = [], total = 0 } = data;
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch></ListSearch>
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin></Spin>
          </div>
        )}
        {!loading &&
          list.length > 0 &&
          list.map((q: any) => {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>Load more... 上划加载更多</div>
    </>
  );
};

export default List;
