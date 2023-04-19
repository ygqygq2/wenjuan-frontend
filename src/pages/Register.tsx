import { UserAddOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Typography } from 'antd';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { LOGIN_PATHNAME } from '../config/constants';

import styles from './Register.module.scss';

const { Title } = Typography;

const Register: FC = () => {
  const onFinish = (value: any) => {
    // run(values);
  };
  return (
    <>
      <div className={styles.container}>
        <div>
          <Space>
            <Title level={2}>
              <UserAddOutlined></UserAddOutlined>
            </Title>
            <Title level={2}>注册新用户</Title>
          </Space>
        </div>
        <div>
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                { required: true, message: '请输入用户名' },
                { type: 'string', min: 5, max: 20, message: '用户名长度在 5-20 之间' },
                { pattern: /^\w+$/, message: '用户名只能包含字母、数字和下划线' },
              ]}
            >
              <Input></Input>
            </Form.Item>
            <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password></Input.Password>
            </Form.Item>
            <Form.Item
              label="确认密码"
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: '请输入密码' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次输入的密码不一致'));
                  },
                }),
              ]}
            >
              <Input.Password></Input.Password>
            </Form.Item>
            <Form.Item label="昵称" name="nickname">
              <Input></Input>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  注册
                </Button>
                <Link to={LOGIN_PATHNAME}>已有帐户，登录</Link>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
