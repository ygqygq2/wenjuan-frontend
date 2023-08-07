import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons';
import { Button, Checkbox, Divider, Input, InputRef, Popover, QRCode, Space, Tooltip, Typography, message } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import React, { FC, useMemo, useRef, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { useGetPageInfo } from '@/hooks/useGetPageInfo';

import styles from './StatHeader.module.scss';

const { Title } = Typography;

const CheckboxGroup = Checkbox.Group;
const plainOptions = ['角色 1', '角色 2', '角色 3'];
const defaultCheckedList = ['角色 1', '角色 3'];

const StatHeader: FC = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const { title, isPublished } = useGetPageInfo();

  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

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
          <Space>
            <Popover
              content={
                <div>
                  <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                    全选（未选择表示所有人可回答）
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
                </div>
              }
              trigger="click"
              placement="bottom"
            >
              <Button>问卷回答角色设置</Button>
            </Popover>
            <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
              编辑问卷
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default StatHeader;
