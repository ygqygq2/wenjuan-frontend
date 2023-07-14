import classNames from 'classnames';
import React, { FC } from 'react';

import { getComponentConfByType } from '@/components/QuestionComponents';
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo';

import styles from './ComponentList.module.scss';

type PropsType = {
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
};

const ComponentList: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props;
  const { componentList } = useGetComponentInfo();

  return (
    <div className={styles.container}>
      {componentList
        .filter((c) => !c.isHidden) // 过滤隐藏的组件
        .map((c) => {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const { fe_id, props, type } = c;

          const componentConf = getComponentConfByType(type);
          if (componentConf == null) return null;

          const { Component } = componentConf;

          // 拼接 class name
          const wrapperDefaultClassName = styles['component-wrapper'];
          const selectedClassName = styles.selected;
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: fe_id === selectedComponentId, // 是否选中
          });

          return (
            <div
              className={wrapperClassName}
              key={fe_id}
              onClick={() => {
                setSelectedComponentId(fe_id);
                setSelectedComponentType(type);
              }}
            >
              <div className={styles.component}>
                <Component {...(props as any)}></Component>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ComponentList;
