import { Layout, Spin } from 'antd';
import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import useLoadUserData from '@/hooks/useLoadUserData';

import Logo from '../components/Logo';

import styles from './MainLayout.module.scss';

const { Header, Content, Footer } = Layout;

const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData();
  return (
    <>
      <Layout>
        <Header className={styles.header}>
          <div className={styles.left}>
            <Logo></Logo>
          </div>
          <div className={styles.right}></div>
        </Header>
        <Content className={styles.main}>
          {waitingUserData ? (
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
              <Spin></Spin>
            </div>
          ) : (
            <Outlet></Outlet>
          )}
        </Content>
        <Footer className={styles.footer}>问卷调查 &copy;2023 - present. Created by ygqygq2</Footer>
      </Layout>
    </>
  );
};

export default MainLayout;
