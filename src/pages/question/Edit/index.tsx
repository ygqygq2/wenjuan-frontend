import { useTitle } from 'ahooks';
import React, { FC, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { useLocation } from 'react-router-dom';

import { useGetPageInfo } from '@/hooks/useGetPageInfo';
import { useLoadQuestionData } from '@/hooks/useLoadQuestionData';

import { changeSelectedId } from '@/store/componentsReducer';

import EditCanvas from './EditCanvas';
import EditHeader from './EditHeader';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import styles from './index.module.scss';

const Edit: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const fromEdit: boolean = location.state && location.state.fromEdit;
  const { loading } = useLoadQuestionData(fromEdit);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  function clearSelectedId() {
    dispatch(changeSelectedId(''));
  }

  const { title } = useGetPageInfo();
  useTitle(`问卷编辑 - ${title}`);

  return (
    <div className={styles.container}>
      <EditHeader></EditHeader>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel></LeftPanel>
          </div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={isLoading}></EditCanvas>
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel></RightPanel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
