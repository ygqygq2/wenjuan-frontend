import { UserOutlined } from '@ant-design/icons';
import { Button, Space, message } from 'antd';
import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import useNavPage from '@/hooks/useNavPage';
import { fetchUserData, logoutReducer } from '@/store/userReducer';
import { removeToken } from '@/utils/user-token';

import { LOGIN_PATHNAME } from '../config/constants';

const UserInfo: FC = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch(fetchUserData());
      } catch (error) {
        message.error('获取用户信息失败');
      }
    };

    getData();
  }, []);

  const userInfo = useGetUserInfo();
  useNavPage(userInfo);

  function logout() {
    dispatch(logoutReducer()); // 清空 redux user 数据
    removeToken();
    message.success('退出成功');
    nav(LOGIN_PATHNAME);
  }

  const UserInfoEl = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <Space>
          <UserOutlined></UserOutlined>
          {userInfo.nickname}
        </Space>
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  );

  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>;

  return <div>{userInfo.isLogin ? UserInfoEl : Login}</div>;
};

export default UserInfo;
