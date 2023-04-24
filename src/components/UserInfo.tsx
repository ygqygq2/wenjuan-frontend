import { UserOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, message } from 'antd';
import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getUserInfoService } from '@/services/user';

import { removeToken } from '@/utils/user-token';

import { LOGIN_PATHNAME } from '../config/constants';

const UserInfo: FC = () => {
  const nav = useNavigate();
  const { data } = useRequest(getUserInfoService);
  const { username, nickname } = data || {};

  function logout() {
    removeToken();
    message.success('退出成功');
    nav(LOGIN_PATHNAME);
  }

  const UserInfoEl = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined></UserOutlined>
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  );

  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>;

  return <>{username ? UserInfoEl : Login}</>;
};

export default UserInfo;
