import React, { FC } from 'react';

import EditCanvas from './EditCanvas';
import styles from './index.module.scss';

const Edit: FC = () => {
  // const {loading, data} = useLoadQuestionData();

  return (
    <div className={styles.container}>
      <div style={{ backgroundColor: '#fff' }}>Header</div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}></div>
          <div className={styles.main}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas></EditCanvas>
            </div>
          </div>
          <div className={styles.right}></div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
