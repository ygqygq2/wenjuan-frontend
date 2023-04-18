import { Layout } from 'antd';
import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Logo from '../components/Logo';

import styles from './MainLayout.module.scss';

const { Header, Content, Footer } = Layout;

const MainLayout: FC = () => {
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
          <Outlet></Outlet>
        </Content>
        <Footer className={styles.footer}>问卷调查 &copy;2023 - present. Created by ygqygq2</Footer>
      </Layout>
    </>
  );
};

export default MainLayout;
