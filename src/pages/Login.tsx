import { UserAddOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Form, Input, Space, Typography, message } from 'antd';
import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { loginService } from '@/services/user';
import { AppDispatch } from '@/store';
import { fetchUserData } from '@/store/userReducer';

import { setToken } from '@/utils/user-token';

import { encryptPassword } from '@/utils/utils';

import { REGISTER_PATHNAME } from '../config/constants';

import styles from './Login.module.scss';

const { Title } = Typography;

const DEFAULT_USERNAME = 'test123';
const DEFAULT_PASSWORD = '123456';

const Login: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();

  useEffect(() => {
    // 设置表单的初始值为默认的演示帐号
    form.setFieldsValue({ username: DEFAULT_USERNAME, password: DEFAULT_PASSWORD });
  }, []);

  const { run } = useRequest(
    async (username: string, password: string) => {
      // 使用 CryptoJS 对密码进行加密
      const hashedPassword = encryptPassword(password);
      const data = await loginService(username, hashedPassword);
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { token = '' } = result;
        setToken(token); // 存储 token
        message.success('登录成功');
        dispatch(fetchUserData());
      },
    },
  );

  const onFinish = async (values: any) => {
    const { username, password } = values || {};

    run(username, password);
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
