import { UserAddOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Checkbox, Form, Input, Space, Typography, message } from 'antd';
import React, { FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { loginService } from '@/services/user';

import { setToken } from '@/utils/user-token';

import { MANAGE_INDEX_PATHNAME, REGISTER_PATHNAME } from '../config/constants';

import styles from './Login.module.scss';

const { Title } = Typography;

const DEFAULT_USERNAME = 'test123';
const DEFAULT_PASSWORD = '123456';

const USERNAME_KEY = 'USERNAME';
const PASSWORD_KEY = 'PASSWORD';

function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username);
  localStorage.setItem(PASSWORD_KEY, password);
}

function deleteUserFromStorage() {
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(PASSWORD_KEY);
}

function getUserInfoFromStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  };
}

const Login: FC = () => {
  const nav = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    // 设置表单的初始值为默认的演示帐号
    form.setFieldsValue({ username: DEFAULT_USERNAME, password: DEFAULT_PASSWORD });
  }, []);

  useEffect(() => {
    const { username, password } = getUserInfoFromStorage();
    form.setFieldsValue({ username, password });
  }, []);

  const { run } = useRequest(
    async (username: string, password: string) => {
      const data = await loginService(username, password);
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { token = '' } = result;
        setToken(token); // 存储 token
        message.success('登录成功');
        // 跳转到 MANAGE_INDEX_PATHNAME
        // 页面跳转不成功，只闪一下
        nav(MANAGE_INDEX_PATHNAME);
        nav(0);
      },
    },
  );

  const onFinish = (values: any) => {
    const { username, password, remember } = values || {};

    run(username, password);

    if (remember) {
      rememberUser(username, password);
    } else {
      deleteUserFromStorage();
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div>
          <Space>
            <Title level={2}>
              <UserAddOutlined />
            </Title>
            <Title level={2}>用户登录</Title>
          </Space>
        </div>
        <div>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                { required: true, message: '请输入用户名' },
                { type: 'string', min: 5, max: 20, message: '字符长度在 5-20 之间' },
                { pattern: /^\w+$/, message: '只能是字母数字下划线' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
              <Checkbox>记住我</Checkbox>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  登录
                </Button>
                <Link to={REGISTER_PATHNAME}>注册新用户</Link>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
