import { useKeyPress } from 'ahooks';

import { useDispatch } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';

import {
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  selectNextComponent,
  selectPrevComponent,
} from '@/store/componentsReducer';

import { useGetComponentInfo } from './useGetComponentInfo';

// 判断光标区域
function isActiveElementValid() {
  const { activeElement } = document;
  if (activeElement === document.body) return true;
  // 引入 dnt-kit 后
  if (activeElement?.matches('div[role="button"]')) return true;
  return false;
}

export function useBindCanvasKeyPress() {
  const dispatch = useDispatch();
  const { canUndo, canRedo } = useGetComponentInfo();
  // 删除组件
  useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveElementValid()) return;
    dispatch(removeSelectedComponent());
  });

  // 复制组件
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementValid()) return;
    dispatch(copySelectedComponent());
  });

  // 粘贴组件
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElementValid()) return;
    dispatch(pasteCopiedComponent());
  });

  // 选中上一个组件
  useKeyPress(['uparrow'], () => {
    if (!isActiveElementValid()) return;
    dispatch(selectPrevComponent());
  });

  // 选中下一个组件
  useKeyPress('downarrow', () => {
    if (!isActiveElementValid()) return;
    dispatch(selectNextComponent());
  });

  // 撤消
  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      if (canUndo) {
        dispatch(UndoActionCreators.undo());
      }
    },
    { exactMatch: true },
  );

  // 重做
  useKeyPress(['ctrl.y', 'meta.y'], () => {
    if (canRedo) {
      dispatch(UndoActionCreators.redo());
    }
  });
}
