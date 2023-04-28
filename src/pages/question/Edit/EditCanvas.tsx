import { Spin } from 'antd';
import React, { FC } from 'react';

import { getComponentConfByType } from '@/components/QuestionComponents';
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo';
import { ComponentInfoType } from '@/store/componentsReducer';

import styles from './EditCanvas.module.scss';

type PropsType = {
  loading: boolean;
};

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo;
  const componentConf = getComponentConfByType(type);
  if (componentConf == null) return null;
  const { Component } = componentConf;
  return <Component {...props}></Component>;
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList } = useGetComponentInfo();

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin></Spin>
      </div>
    );
  }
  return (
    <div className={styles.canvas}>
      {componentList.map((c) => {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { fe_id } = c;
        return (
          <div key={fe_id} className={styles['component-wrapper']}>
            <div className={styles.component}>{genComponent(c)}</div>
          </div>
        );
      })}
      {/* <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionTitle></QuestionTitle>
        </div>
      </div>

      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionInput></QuestionInput>
        </div>
      </div> */}
    </div>
  );
};

export default EditCanvas;
