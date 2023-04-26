import { FormOutlined } from '@ant-design/icons';
import { Space, Typography } from 'antd';
import React, { FC, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from '@/config/constants';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';

import styles from './Logo.module.scss';

const { Title } = Typography;

const Logo: FC = () => {
  const { username } = useGetUserInfo();
  const [pathname, setPathname] = useState(HOME_PATHNAME);

  useEffect(() => {
    if (username) {
      setPathname(MANAGE_INDEX_PATHNAME);
    }
  }, [username]);
  return (
    <>
      <div className={styles.container}>
        <Link to={pathname}>
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
