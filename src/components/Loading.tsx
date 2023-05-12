import { Spin } from 'antd';
import React, { FC } from 'react';

const Loading: FC = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Spin></Spin>
    </div>
  );
};

export default Loading;
