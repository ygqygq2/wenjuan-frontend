import React, { FC } from 'react';

import { useLoadQuestionData } from '@/hooks/useLoadQuestionData';

import EditCanvas from './EditCanvas';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import styles from './index.module.scss';

const Edit: FC = () => {
  const { loading } = useLoadQuestionData();

  return (
    <div className={styles.container}>
      <div style={{ backgroundColor: '#fff' }}>Header</div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel></LeftPanel>
          </div>
          <div className={styles.main}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading}></EditCanvas>
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
