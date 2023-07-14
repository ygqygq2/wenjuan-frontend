import { arrayMove } from '@dnd-kit/sortable';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import cloneDeep from 'lodash.clonedeep';

import { nanoid } from 'nanoid';

import { ComponentPropsType } from '@/components/QuestionComponents';

import { getNextSelectedId, insertNewComponent } from './utils';

export type ComponentInfoType<T> = {
  fe_id: string;
  type: string;
  title: string;
  isHidden?: boolean;
  isLocked?: boolean;
  props: T;
};

export type ComponentsStateType<T> = {
  selectedId: string;
  componentList: Array<ComponentInfoType<T>>;
  copiedComponent: ComponentInfoType<T> | null;
};

const INIT_STATE: ComponentsStateType<any> = {
  selectedId: '',
  componentList: [],
  copiedComponent: null,
};

export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: <T>(state: ComponentsStateType<T>, action: PayloadAction<ComponentsStateType<T>>) => {
      return action.payload;
    },
    // 修改 selectedId
    changeSelectedId: <T>(state: ComponentsStateType<T>, action: PayloadAction<string>) => {
      state.selectedId = action.payload;
    },
    // 添加新组件
    addComponent: <T>(state: ComponentsStateType<T>, action: PayloadAction<ComponentInfoType<T>>) => {
      const newComponent = action.payload;
      insertNewComponent(state, newComponent);
    },
    // 修改组件属性
    changeComponentProps: <T>(
      state: ComponentsStateType<T>,
      action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>,
    ) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { fe_id, newProps } = action.payload;

      // 当前要修改属性的这个组件
      const curComp = state.componentList.find((c) => c.fe_id === fe_id);
      if (curComp) {
        curComp.props = {
          ...curComp.props,
          ...newProps,
        };
      }
    },
    // 删除选中的组件
    removeSelectedComponent: <T>(state: ComponentsStateType<T>) => {
      const { componentList = [], selectedId: removedId } = state;

      // 重新计算 selectedId
      const newSelectedId = getNextSelectedId(removedId, componentList);
      state.selectedId = newSelectedId;
      const index = componentList.findIndex((c) => c.fe_id === removedId);
      componentList.splice(index, 1);
    },
    // 隐藏/显示组件
    changeComponentHidden: <T>(
      state: ComponentsStateType<T>,
      action: PayloadAction<{ fe_id: string; isHidden: boolean }>,
    ) => {
      const { componentList = [] } = state;
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { fe_id, isHidden } = action.payload;

      // 重新计算 selectedId
      let newSelectedId = '';
      if (isHidden) {
        // 要隐藏
        newSelectedId = getNextSelectedId(fe_id, componentList);
      } else {
        // 要显示
        newSelectedId = fe_id;
      }
      state.selectedId = newSelectedId;

      const curComp = componentList.find((c) => c.fe_id === fe_id);
      if (curComp) {
        curComp.isHidden = isHidden;
      }
    },
    // 锁定/解锁组件
    toggleComponentLocked: <T>(state: ComponentsStateType<T>, action: PayloadAction<{ fe_id: string }>) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { fe_id } = action.payload;
      const curComp = state.componentList.find((c) => c.fe_id === fe_id);
      if (curComp) {
        curComp.isLocked = !curComp.isLocked;
      }
    },
    // 拷贝当前选中的组件
    copySelectedComponent: <T>(state: ComponentsStateType<T>) => {
      const { selectedId, componentList = [] } = state;
      const selectedComponent = componentList.find((c) => c.fe_id === selectedId);
      if (selectedComponent == null) return;
      state.copiedComponent = cloneDeep(selectedComponent) as ComponentInfoType<T>;
    },
    // 粘贴组件
    pasteCopiedComponent: <T>(state: ComponentsStateType<T>) => {
      const { copiedComponent } = state;
      if (copiedComponent == null) return;
      // 把 fe_id 修改了
      copiedComponent.fe_id = nanoid();
      insertNewComponent(state, copiedComponent);
    },
    selectPrevComponent: <T>(state: ComponentsStateType<T>) => {
      const { selectedId, componentList = [] } = state;
      const selectedIndex = componentList.findIndex((c) => c.fe_id === selectedId);
      if (selectedIndex <= 0) return; // 未选中组件，或选中的组件是第一个
      state.selectedId = componentList[selectedIndex - 1].fe_id;
    },
    selectNextComponent: <T>(state: ComponentsStateType<T>) => {
      const { selectedId, componentList = [] } = state;
      const selectedIndex = componentList.findIndex((c) => c.fe_id === selectedId);
      if (selectedIndex < 0 || selectedIndex >= componentList.length - 1) return; // 未选中组件，或选中的组件是最后一个
      state.selectedId = componentList[selectedIndex + 1].fe_id;
    },
    // 修改组件标题
    changeComponentTitle: <T>(
      state: ComponentsStateType<T>,
      action: PayloadAction<{ fe_id: string; title: string }>,
    ) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { title, fe_id } = action.payload;
      const curComp = state.componentList.find((c) => c.fe_id === fe_id);
      if (curComp) curComp.title = title;
    },

    // 移动组件位置
    moveComponent: <T>(
      state: ComponentsStateType<T>,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>,
    ) => {
      const { componentList: curComponentList } = state;
      const { oldIndex, newIndex } = action.payload;

      state.componentList = arrayMove(curComponentList, oldIndex, newIndex);
    },
  },
});

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
  moveComponent,
} = componentsSlice.actions;
export default componentsSlice.reducer;
