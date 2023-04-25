import { Spin } from 'antd';
import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import useLoadUserData from '@/hooks/useLoadUserData';

const QuestionLayout: FC = () => {
  const { waitingUserData } = useLoadUserData();
  return (
    <>
      <p>Question Layout</p>
      <div>
        {waitingUserData ? (
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
