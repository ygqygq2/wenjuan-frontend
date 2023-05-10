import { useSelector } from 'react-redux';

import { StateWithHistory } from 'redux-undo';

import { StateType } from '@/store';
import { ComponentsStateType } from '@/store/componentsReducer';

export const useGetComponentInfo = () => {
  // 获取 redux 中的组件信息
  const componentsTodos = useSelector<StateType>((state) => state.components) as StateWithHistory<ComponentsStateType>;
  // const components = useSelector <StateType>((state) => state.components.present) as ComponentsStateType;
  const components = componentsTodos.present as ComponentsStateType;
  const canUndo = componentsTodos.past.length > 0;
  const canRedo = componentsTodos.future.length > 0;

  const { componentList = [], selectedId, copiedComponent } = components;

  const selectedComponent = componentList.find((c) => c.fe_id === selectedId);

  return {
    componentList,
    canUndo,
    canRedo,
    selectedId,
    selectedComponent,
    copiedComponent,
  };
};
