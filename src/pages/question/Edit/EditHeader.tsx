import { EditOutlined, LeftOutlined } from '@ant-design/icons';
import { Button, Input, Space, Typography } from 'antd';
import React, { ChangeEvent, FC, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useGetPageInfo } from '@/hooks/useGetPageInfo';

import { changePageTitle } from '@/store/pageInfoReducer';

import styles from './EditHeader.module.scss';
import EditToolbar from './EditToolbar';

const { Title } = Typography;

const TitleElem: FC = () => {
  const { title } = useGetPageInfo();
  const dispatch = useDispatch();
  const [editState, setEditState] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim();
    if (!newTitle) return;
    dispatch(changePageTitle(newTitle));
  }
  if (editState) {
    return (
      <Input
        value={title}
        onPressEnter={() => setEditState(false)}
        onBlur={() => setEditState(false)}
        onChange={handleChange}
      ></Input>
    );
  }
  return (
    <Space>
      <Title>{title}</Title>;
      <Button icon={<EditOutlined></EditOutlined>} type="text" onClick={() => setEditState(true)}></Button>
    </Space>
  );
};

const EditHeader: FC = () => {
  const nav = useNavigate();
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined></LeftOutlined>} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElem></TitleElem>
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar></EditToolbar>
        </div>
        <div className={styles.right}>
          <Space>
            <Button>保存</Button>
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
