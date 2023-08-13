import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  PlayCircleOutlined,
  PauseOutlined,
} from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from 'antd';
import React, { FC, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { updateQuestionService, duplicateQuestionService } from '../services/question';

import styles from './QuestionCard.module.scss';

const { confirm } = Modal;

type PropsType = {
  _id: string;
  title: string;
  isStar: boolean;
  isPublished: boolean;
  answerCount: number;
  createdAt: string;
  onDelete: (id: string) => void;
};

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const nav = useNavigate();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _id, title, createdAt, answerCount, isPublished, isStar, onDelete } = props;
  const options = { timeZone: 'Asia/Shanghai' };
  // 将 createdAt 转换成北京时间
  const createdAtLocal = new Date(createdAt).toLocaleString('zh-CN', options);

  // 修改发布
  const [isPublishedState, setIsPublishedState] = useState(isPublished);
  const { loading: changePublishLoading, run: changePublish } = useRequest(
    async () => {
      await updateQuestionService(_id, { isPublished: !isPublishedState });
    },
    {
      manual: true,
      onSuccess() {
        setIsPublishedState(!isPublishedState); // 更新 state
        message.success('已更新');
      },
    },
  );

  // 修改标星
  const [isStarState, setIsStarState] = useState(isStar);
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarState });
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState); // 更新 state
        message.success('已更新');
      },
    },
  );

  // 复制
  const { loading: duplicateLoading, run: duplicate } = useRequest(async () => duplicateQuestionService(_id), {
    manual: true,
    onSuccess(result) {
      message.success('复制成功');
      nav(`/question/edit/${result.id}`, { state: { fetchBackendData: true } }); // 跳转到问卷编辑页
    },
  });

  // 删除
  const [isDeletedState, setIsDeletedState] = useState(false);
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => updateQuestionService(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess() {
        message.success('删除成功');
        setIsDeletedState(true);
        // 通知父组件删除成功，在列表中去掉已删除数据
        handleDelete(_id);
      },
    },
  );

  function del() {
    confirm({
      title: '确定删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      onOk: deleteQuestion,
    });
  }

  function handleDelete(id: string) {
    onDelete(id);
  }

  // 已经删除的问卷，不要再渲染卡片了
  if (isDeletedState) return null;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStarState && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublishedState ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
            <span>答卷: {answerCount}</span>
            {/* 使用北京时间 */}
            <span>{createdAtLocal}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px 0' }} />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/edit/${_id}`, { state: { fetchBackendData: true } })}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/stat/${_id}`)}
              disabled={!isPublishedState}
            >
              问卷统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              type="text"
              icon={isPublishedState ? <PauseOutlined /> : <PlayCircleOutlined />}
              size="small"
              onClick={changePublish}
              disabled={changePublishLoading}
            >
              {isPublishedState ? '停止' : '发布'}
            </Button>
            <Button type="text" icon={<StarOutlined />} size="small" onClick={changeStar} disabled={changeStarLoading}>
              {isStarState ? '取消标星' : '标星'}
            </Button>
            <Popconfirm title="确定复制该问卷？" okText="确定" cancelText="取消" onConfirm={duplicate}>
              <Button type="text" icon={<CopyOutlined />} size="small" disabled={duplicateLoading}>
                复制
              </Button>
            </Popconfirm>
            <Button type="text" icon={<DeleteOutlined />} size="small" onClick={del} disabled={deleteLoading}>
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
