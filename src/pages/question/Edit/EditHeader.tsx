import { EditOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks';
import { Button, Input, Space, Typography, message } from 'antd';
import React, { ChangeEvent, FC, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetComponentInfo } from '@/hooks/useGetComponentInfo';
import { useGetPageInfo } from '@/hooks/useGetPageInfo';

import { updateQuestionService } from '@/services/question';
import { StateType } from '@/store';
import { changePageTitle } from '@/store/pageInfoReducer';

import styles from './EditHeader.module.scss';
import EditToolbar from './EditToolbar';

const { Title } = Typography;

const TitleElem: FC = () => {
  // const {title} = useGetPageInfo();
  const title = useSelector<StateType, string>((state) => state.pageInfo.title); // Add type assertion to the title variable

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

const SaveButton: FC = () => {
  const { id } = useParams();
  const { componentList = [] } = useGetComponentInfo();
  const pageInfo = useGetPageInfo();

  // 保存 pageInfo componentList
  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, { ...pageInfo, componentList });
    },
    { manual: true },
  );

  // 快捷键
  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    // 禁用网页默认保存
    event.preventDefault();
    if (!loading) save();
  });

  // 自动保存
  useDebounceEffect(
    () => {
      save();
    },
    [pageInfo, componentList],
    { wait: 1000 },
  );

  return (
    <Button onClick={save} disabled={loading} icon={loading ? <LoadingOutlined /> : null}>
      保存
    </Button>
  );
};

const PublishButton: FC = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const { componentList = [] } = useGetComponentInfo();
  const pageInfo = useGetPageInfo();

  // 保存 pageInfo componentList
  const { loading, run: pub } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, { ...pageInfo, componentList, isPublished: true });
    },
    {
      manual: true,
      onSuccess() {
        message.success('发布成功');
        nav(`/question/stat/${id}`);
      },
    },
  );

  return (
    <Button type="primary" onClick={pub} disabled={loading}>
      发布
    </Button>
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
            <SaveButton></SaveButton>
            <PublishButton></PublishButton>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
