import { BlockOutlined, CopyOutlined, DeleteOutlined, EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { useGetComponentInfo } from '@/hooks/useGetComponentInfo';
import {
  changeComponentHidden,
  copySelectedComponent,
  removeSelectedComponent,
  toggleComponentLocked,
} from '@/store/componentsReducer';

const EditToobar: FC = () => {
  const dispatch = useDispatch();

  const { selectedId, selectedComponent } = useGetComponentInfo();
  const { isLocked } = selectedComponent || {};

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
  function handlePaste() {}

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
        <Button shape="circle" icon={<BlockOutlined></BlockOutlined>} onClick={handlePaste}></Button>
      </Tooltip>
    </Space>
  );
};

export default EditToobar;
