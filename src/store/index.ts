import { configureStore } from '@reduxjs/toolkit';

import componentsReducer, { ComponentsStateType } from './componentsReducer';
import userReducer, { UserStateType } from './userReducer';

export type StateType = {
  user: UserStateType;
  components: ComponentsStateType;
};

export default configureStore({
  reducer: {
    user: userReducer,
    components: componentsReducer,
  },
});
