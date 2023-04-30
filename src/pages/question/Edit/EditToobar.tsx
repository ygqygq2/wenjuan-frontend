import { DeleteOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { useGetComponentInfo } from '@/hooks/useGetComponentInfo';
import { changeComponentHidden, removeSelectedComponent } from '@/store/componentsReducer';

const EditToobar: FC = () => {
  const dispatch = useDispatch();

  const { selectedId } = useGetComponentInfo();

  // 删除组件
  function handleDelete() {
    dispatch(removeSelectedComponent());
  }

  // 隐藏组件
  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }));
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined></DeleteOutlined>} onClick={handleDelete}></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button shape="circle" icon={<EyeInvisibleOutlined></EyeInvisibleOutlined>} onClick={handleHidden}></Button>
      </Tooltip>
    </Space>
  );
};

export default EditToobar;
