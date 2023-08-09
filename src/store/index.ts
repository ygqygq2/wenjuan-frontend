import { configureStore } from '@reduxjs/toolkit';

import undoable, { StateWithHistory, excludeAction } from 'redux-undo';

import answerRolesReducer, { AnswerRolesType } from './answerRolesReducer';
import componentsReducer, { ComponentsStateType } from './componentsReducer';
import pageInfoReducer, { PageInfoType } from './pageInfoReducer';
import userReducer, { UserStateType } from './userReducer';

export type StateType<T> = {
  user: UserStateType;
  components: StateWithHistory<ComponentsStateType<T>>;
  pageInfo: PageInfoType;
  answerRoles: AnswerRolesType;
};

export default configureStore({
  reducer: {
    user: userReducer,
    components: undoable(componentsReducer, {
      limit: 20, // 限制 undo 20 步
      filter: excludeAction([
        'component/resetComponents',
        'component/changeSelectedId',
        'component/selectPrevComponent',
        'component/selectNextComponent',
      ]),
    }),
    pageInfo: pageInfoReducer,
    answerRoles: answerRolesReducer,
  },
});
