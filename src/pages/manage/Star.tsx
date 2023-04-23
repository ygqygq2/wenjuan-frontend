import { useTitle } from 'ahooks';
import { Empty, Spin, Typography } from 'antd';
import React, { FC } from 'react';

import ListPage from '@/components/ListPage';
import ListSearch from '@/components/ListSearch';
import QuestionCard from '@/components/QuestionCard';
import useLoadQuestionListData from '@/hooks/useLoadQuestionListData';

import styles from './common.module.scss';

const { Title } = Typography;

const Star: FC = () => {
  useTitle('问卷调查 - 星标问卷');

  const { data = {}, loading } = useLoadQuestionListData({ isStar: true });
  const { list = [], total = 0 } = data;
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {list.length > 0 &&
          list.map((q: any) => {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  );
};

export default Star;
