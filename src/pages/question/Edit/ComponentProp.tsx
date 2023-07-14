import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { ComponentConfType, getComponentConfByType } from '@/components/QuestionComponents';
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo';
import { ComponentInfoType, changeComponentProps } from '@/store/componentsReducer';

const NoProp: FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>;
};
const ComponentProp = <T extends { onChange?: (newProps: T) => void }>() => {
  const dispatch = useDispatch();
  const { selectedComponent } = useGetComponentInfo<ComponentInfoType<T>>();

  if (selectedComponent == null) return <NoProp></NoProp>;
  const { type, props, isHidden, isLocked } = selectedComponent;
  const componentConf: ComponentConfType<T> | undefined = getComponentConfByType<T>(type);

  if (componentConf == null) return <NoProp></NoProp>;

  function changeProps(newProps: any) {
    if (selectedComponent == null) return;
    const { fe_id } = selectedComponent;
    dispatch(changeComponentProps({ fe_id, newProps }));
  }

  const { PropComponent } = componentConf;
  /* @ts-ignore */
  return <PropComponent {...props} onChange={changeProps} disabled={isLocked || isHidden} />;
};
export default ComponentProp;
