import React, { FC } from 'react';

import { useDispatch } from 'react-redux';

import { ComponentPropsType, getComponentConfByType } from '@/components/QuestionComponents';
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo';
import { changeComponentProps } from '@/store/componentsReducer';

const NoProp: FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>;
};

const ComponentProp: FC = () => {
  const dispatch = useDispatch();
  const { selectedComponent } = useGetComponentInfo();
  if (selectedComponent == null) return <NoProp></NoProp>;
  const { type, props, isHidden, isLocked } = selectedComponent;
  const componentConf = getComponentConfByType(type);
  if (componentConf == null) return <NoProp></NoProp>;

  function changeProps(newProps: ComponentPropsType<any>) {
    if (selectedComponent == null) return;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { fe_id } = selectedComponent;
    dispatch(changeComponentProps({ fe_id, newProps }));
  }

  const { PropComponent } = componentConf;
  return <PropComponent {...props} onChange={changeProps} disabled={isLocked || isHidden}></PropComponent>;
};

export default ComponentProp;
