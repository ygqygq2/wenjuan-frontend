import React, { FC } from 'react';

import QuestionInput from '@/components/QuestionComponents/QuestionInput/Component';

import QuestionTitle from '@/components/QuestionComponents/QuestionTitle/Component';

import styles from './EditCanvas.module.scss';

const EditCanvas: FC = () => {
  return (
    <div className={styles.canvas}>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionTitle></QuestionTitle>
        </div>
      </div>

      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionInput></QuestionInput>
        </div>
      </div>
    </div>
  );
};

export default EditCanvas;
