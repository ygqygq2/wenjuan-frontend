import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, Popover, QRCode, Space, Tooltip, Typography, message } from 'antd';
import React, { FC, useMemo, useRef } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { useGetPageInfo } from '@/hooks/useGetPageInfo';

import styles from './StatHeader.module.scss';

const { Title } = Typography;

const StatHeader: FC = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const { title, isPublished } = useGetPageInfo();

  // 全选拷贝链接
  const urlInputRef = useRef<InputRef>(null);
  function handleCopy() {
    const elem = urlInputRef.current;
    if (elem == null) return;
    elem.select(); // 选中 input 内容
    document.execCommand('copy');
    message.success('拷贝成功');
  }

  // 生成链接和二维码
  const LinkAndQRCodeElem = useMemo(() => {
    if (!isPublished) return null;

    const url = `http://localhost:4000/question/${id}`;

    // 生成二维码
    const QRCodeElem = (
      <div style={{ textAlign: 'center' }}>
        <QRCode value={url} size={150}></QRCode>
      </div>
    );

    return (
      <Space>
        <Input value={url} style={{ width: '300px' }} ref={urlInputRef}></Input>
        <Tooltip title="拷贝链接">
          <Button icon={<CopyOutlined></CopyOutlined>} onClick={handleCopy}></Button>
        </Tooltip>
        <Popover content={QRCodeElem}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    );
  }, [id, isPublished]);

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined></LeftOutlined>} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{LinkAndQRCodeElem}</div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatHeader;
