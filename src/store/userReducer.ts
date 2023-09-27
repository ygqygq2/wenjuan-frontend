import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getUserInfoService } from '@/services/user';
import { getToken, isTokenExpired } from '@/utils/user-token';

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

// 检查 localStorage 中的 JWT 令牌
const token = getToken();
const isTokenValid = !isTokenExpired(token);

// 根据 JWT 令牌的存在与否设置初始状态
const initialState = {
  ...INIT_STATE,
  isLogin: isTokenValid,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
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
