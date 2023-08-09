import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type Role = {
  id: number;
  name: string;
};
export type AnswerRolesType = number[];

const INIT_STATE: AnswerRolesType = [];

export const answerRolesSlice = createSlice({
  name: 'answerRoles',
  initialState: INIT_STATE,
  reducers: {
    resetAnswerRoles: (state: AnswerRolesType, action: PayloadAction<AnswerRolesType>) => {
      return action.payload;
    },
    // 修改标题
    changeAnswerRoles: (state: AnswerRolesType, action: PayloadAction<AnswerRolesType>) => {
      state.splice(0, state.length, ...action.payload);
    },
  },
});

export const { resetAnswerRoles, changeAnswerRoles } = answerRolesSlice.actions;
export default answerRolesSlice.reducer;
