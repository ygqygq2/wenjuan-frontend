import { Typography } from 'antd';
import { nanoid } from 'nanoid';
import React, { FC, useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { ComponentConfType, componentConfGroup } from '@/components/QuestionComponents';
import { addComponent } from '@/store/componentsReducer';

import styles from './ComponentLib.module.scss';

const { Title } = Typography;

function genComponent<T extends object>(c: ComponentConfType<T>) {
  const { title, type, Component, defaultProps } = c;
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(
      addComponent({
        fe_id: nanoid(),
        title,
        type,
        props: defaultProps,
      }),
    );
  }, []);

  return (
    <div key={type} className={styles.wrapper} onClick={handleClick}>
      <div className={styles.component}>
        <Component {...(defaultProps as T)} />
      </div>
    </div>
  );
}

const ComponentLib: FC = () => {
  return (
    <>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group;
        return (
          <div key={groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0' }}>
              {groupName}
            </Title>
            <div>{components.map((c) => genComponent(c))}</div>
          </div>
        );
      })}
    </>
  );
};

export default ComponentLib;
