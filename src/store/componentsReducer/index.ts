import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import produce from 'immer';

import { ComponentPropsType } from '@/components/QuestionComponents';

export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  props: ComponentPropsType;
};

export type ComponentsStateType = {
  selectedId: string;
  componentList: Array<ComponentInfoType>;
};

const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: [],
};

export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload;
    },
    // 修改 selectedId
    changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
      draft.selectedId = action.payload;
    }),
    // 添加新组件
    addComponent: produce((draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
      const newComponent = action.payload;
      const { selectedId, componentList } = draft;
      const index = componentList.findIndex((c) => c.fe_id === selectedId);
      if (index < 0) {
        // 未选中任何组件
        draft.componentList.push(newComponent);
      } else {
        // 选中了组件，插入到 index 后面
        draft.componentList.splice(index + 1, 0, newComponent);
      }
      draft.selectedId = newComponent.fe_id;
    }),
    // 修改组件属性
    changeComponentProps: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>) => {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { fe_id, newProps } = action.payload;
        const curComp = draft.componentList.find((c) => c.fe_id === fe_id);
        if (curComp) {
          curComp.props = {
            ...curComp.props,
            ...newProps,
          };
        }
      },
    ),
  },
});

export const { resetComponents, changeSelectedId, addComponent, changeComponentProps } = componentsSlice.actions;
export default componentsSlice.reducer;
