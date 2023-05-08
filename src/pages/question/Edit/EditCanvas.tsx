import { Spin } from 'antd';
import classNames from 'classnames';
import React, { FC } from 'react';

import { useDispatch } from 'react-redux';

import { getComponentConfByType } from '@/components/QuestionComponents';
import { useBindCanvasKeyPress } from '@/hooks/useBindCanvasKeyPress';
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo';
import { ComponentInfoType, changeSelectedId } from '@/store/componentsReducer';

import styles from './EditCanvas.module.scss';

type PropsType = {
  loading: boolean;
};

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo;
  const componentConf = getComponentConfByType(type);
  if (componentConf == null) return null;
  const { Component } = componentConf;
  return <Component key={type} {...props}></Component>;
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList, selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();

  // 点击组件，选中
  function handleClick(event: MouseEvent, id: string) {
    event.stopPropagation(); // 阻止冒泡
    dispatch(changeSelectedId(id));
  }

  // 绑定快捷键
  useBindCanvasKeyPress();

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin></Spin>
      </div>
    );
  }

  return (
    <div className={styles.canvas}>
      {componentList
        .filter((c) => !c.isHidden)
        .map((c, index) => {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const { fe_id, isLocked } = c;

          // 拼接 class name
          const wrapperDefaultClassName = styles['component-wrapper'];
          const selectedClassName = styles.selected;
          const lockedClassName = styles.locked;
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: fe_id === selectedId,
            [lockedClassName]: isLocked,
          });
          return (
            <div
              key={index}
              className={wrapperClassName}
              onClick={(e) => handleClick(e as unknown as MouseEvent, fe_id)}
            >
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
