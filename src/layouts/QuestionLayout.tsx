import { Spin } from 'antd';
import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import useLoadUserData from '@/hooks/useLoadUserData';
import useNavPage from '@/hooks/useNavPage';

const QuestionLayout: FC = () => {
  const userInfo = useLoadUserData();
  useNavPage(userInfo);

  return (
    <>
      <div style={{ height: '100vh' }}>
        {userInfo.waitingUserData ? (
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Spin></Spin>
          </div>
        ) : (
          <Outlet></Outlet>
        )}
      </div>
    </>
  );
};

export default QuestionLayout;
