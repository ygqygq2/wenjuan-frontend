import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  RedoOutlined,
  UndoOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';

import { useGetComponentInfo } from '@/hooks/useGetComponentInfo';
import {
  changeComponentHidden,
  copySelectedComponent,
  moveComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  toggleComponentLocked,
} from '@/store/componentsReducer';

const EditToolbar: FC = () => {
  const dispatch = useDispatch();

  const { selectedId, componentList, selectedComponent, copiedComponent, canUndo, canRedo } = useGetComponentInfo();
  const { isLocked } = selectedComponent || {};
  const { length } = componentList;
  const selectedIndex = componentList.findIndex((c) => c.fe_id === selectedId);
  const isFirst = selectedIndex <= 0; // 第一个
  const isLast = selectedIndex >= length - 1; // 最后一个

  // 删除组件
  function handleDelete() {
    dispatch(removeSelectedComponent());
  }

  // 隐藏组件
  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }));
  }

  // 锁定组件
  function handleLock() {
    dispatch(toggleComponentLocked({ fe_id: selectedId }));
  }

  // 复制组件
  function handleCopy() {
    dispatch(copySelectedComponent());
  }

  // 粘贴组件
  function handlePaste() {
    dispatch(pasteCopiedComponent());
  }

  // 上移
  function handleMoveUp() {
    if (isFirst) return;
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }));
  }

  // 下移
  function handleMoveDown() {
    if (isLast) return;
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }));
  }

  // 撤消
  function handleUndo() {
    dispatch(UndoActionCreators.undo());
  }

  // 重做
  function handleRedo() {
    dispatch(UndoActionCreators.redo());
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined></DeleteOutlined>} onClick={handleDelete}></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button shape="circle" icon={<EyeInvisibleOutlined></EyeInvisibleOutlined>} onClick={handleHidden}></Button>
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          icon={<LockOutlined></LockOutlined>}
          onClick={handleLock}
          type={isLocked ? 'primary' : 'default'}
        ></Button>
      </Tooltip>
      <Tooltip title="复制">
        <Button shape="circle" icon={<CopyOutlined></CopyOutlined>} onClick={handleCopy}></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined></BlockOutlined>}
          onClick={handlePaste}
          disabled={copiedComponent === null}
        ></Button>
      </Tooltip>
      <Tooltip title="上移">
        <Button shape="circle" icon={<UpOutlined></UpOutlined>} onClick={handleMoveUp} disabled={isFirst}></Button>
      </Tooltip>
      <Tooltip title="下移">
        <Button shape="circle" icon={<DownOutlined></DownOutlined>} onClick={handleMoveDown} disabled={isLast}></Button>
      </Tooltip>
      <Tooltip title="撤消">
        <Button
          shape="circle"
          icon={<UndoOutlined></UndoOutlined>}
          onClick={handleUndo}
          disabled={isLast && !canUndo}
        ></Button>
      </Tooltip>
      <Tooltip title="重做">
        <Button
          shape="circle"
          icon={<RedoOutlined></RedoOutlined>}
          onClick={handleRedo}
          disabled={isLast && !canRedo}
        ></Button>
      </Tooltip>
    </Space>
  );
};

export default EditToolbar;
