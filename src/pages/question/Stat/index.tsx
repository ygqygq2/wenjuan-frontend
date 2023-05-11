import { useTitle } from 'ahooks';
import { Button, Result, Spin } from 'antd';
import React, { FC, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useGetPageInfo } from '@/hooks/useGetPageInfo';
import { useLoadQuestionData } from '@/hooks/useLoadQuestionData';

import ComponentList from './ComponentList';
import StatHeader from './StatHeader';
import styles from './index.module.scss';

const Stat: FC = () => {
  const nav = useNavigate();
  const { loading } = useLoadQuestionData();
  const { title, isPublished } = useGetPageInfo();

  // 状态提升 selectedId type
  const [selectedComponentId, setSelectedComponentId] = useState('');
  const [selectedComponentType, setSelectedComponentType] = useState('');

  // 修改标题
  useTitle(`问卷统计 - ${title}`);

  const LoadingElem = (
    <div style={{ textAlign: 'center', marginTop: '60px' }}>
      <Spin></Spin>
    </div>
  );

  function genContentElem() {
    if (typeof isPublished === 'boolean' && !isPublished) {
      return (
        <div style={{ flex: '1' }}>
          <Result
            status="warning"
            title="该页面未发布"
            extra={
              <Button type="primary" onClick={() => nav(-1)}>
                返回
              </Button>
            }
          ></Result>
        </div>
      );
    }

    return (
      <>
        <div className={styles.left}>
          <ComponentList
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.main}>
          <PageStat
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.right}>
          <ChartStat selectedComponentId={selectedComponentId} selectedComponentType={selectedComponentType} />
        </div>
      </>
    );
  }

  return (
    <div className={styles.container}>
      <StatHeader />
      <div className={styles['content-wrapper']}>
        {loading && LoadingElem}
        {!loading && <div className={styles.content}>{genContentElem()}</div>}
      </div>
    </div>
  );
};

export default Stat;
