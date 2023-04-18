import { FormOutlined } from '@ant-design/icons';
import { Space, Typography } from 'antd';
import React, { FC } from 'react';

import { Link } from 'react-router-dom';

import styles from './Logo.module.scss';

const { Title } = Typography;

const Logo: FC = () => {
  return (
    <>
      <div className={styles.container}>
        <Link to="/">
          <Space>
            <Title>
              <FormOutlined></FormOutlined>
            </Title>
            <Title>问卷调查</Title>
          </Space>
        </Link>
      </div>
    </>
  );
};

export default Logo;
