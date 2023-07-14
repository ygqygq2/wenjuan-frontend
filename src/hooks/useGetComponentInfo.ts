import { useSelector } from 'react-redux';

import { StateWithHistory } from 'redux-undo';

import { StateType } from '@/store';
import { ComponentInfoType, ComponentsStateType } from '@/store/componentsReducer';

export const useGetComponentInfo = <T>(): {
  componentList: Array<ComponentInfoType<T>>;
  canUndo: boolean;
  canRedo: boolean;
  selectedId: string;
  selectedComponent: ComponentInfoType<T> | null;
  copiedComponent: ComponentInfoType<T> | null;
} => {
  // 获取 redux 中的组件信息
  const componentsTodos = useSelector<StateType<T>>((state) => state.components) as StateWithHistory<
    ComponentsStateType<T>
  >;
  // const components = useSelector <StateType>((state) => state.components.present) as ComponentsStateType;
  const components = componentsTodos.present as ComponentsStateType<T>;
  const canUndo = componentsTodos.past.length > 0;
  const canRedo = componentsTodos.future.length > 0;

  const { componentList = [], selectedId, copiedComponent } = components;

  const selectedComponent = componentList.find((c) => c.fe_id === selectedId) || null;

  return {
    componentList,
    canUndo,
    canRedo,
    selectedId,
    selectedComponent,
    copiedComponent,
  };
};
