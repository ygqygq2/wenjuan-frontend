import { useKeyPress } from 'ahooks';

import { useDispatch } from 'react-redux';

import {
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  selectNextComponent,
  selectPrevComponent,
} from '@/store/componentsReducer';

// 判断光标区域
function isActiveElementValid() {
  const { activeElement } = document;
  if (activeElement === document.body) return true;
  return false;
}

export function useBindCanvasKeyPress() {
  const dispatch = useDispatch();
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
}
