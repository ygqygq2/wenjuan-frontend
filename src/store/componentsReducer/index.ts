import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ComponentPropsType } from '@/components/QuestionComponents';

export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  props: ComponentPropsType;
};

export type ComponentsStateType = {
  componentList: Array<ComponentInfoType>;
};

const INIT_STATE: ComponentsStateType = {
  componentList: [],
};

export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload;
    },
  },
});

export const { resetComponents } = componentsSlice.actions;
export default componentsSlice.reducer;
