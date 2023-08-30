import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getUserInfoService } from '@/services/user';

export type UserStateType = {
  username: string;
  nickname: string;
  waitingUserData: boolean;
  isLogin: boolean;
};

const INIT_STATE: UserStateType = { username: '', nickname: '', waitingUserData: false, isLogin: false };

export const fetchUserData = createAsyncThunk('user/fetchUserData', async () => {
  const result = await getUserInfoService();
  const { username } = result;
  if (username) {
    const nickname = result?.profile?.nickname || username;
    return {
      username,
      nickname,
      waitingUserData: false,
      isLogin: true,
    };
  }
  return {
    ...INIT_STATE,
    waitingUserData: false,
    isLogin: false,
  };
});

export const userSlice = createSlice({
  name: 'user',
  initialState: INIT_STATE,
  reducers: {
    loginReducer: (state: UserStateType, action: PayloadAction<UserStateType>) => {
      return action.payload;
    },
    logoutReducer: () => INIT_STATE,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      return { ...state, ...action.payload };
    });
  },
});

export const { loginReducer, logoutReducer } = userSlice.actions;
export default userSlice.reducer;
