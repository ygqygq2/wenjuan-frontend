import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import React, { FC } from 'react';

import ComponentLib from './ComponentLib';

const LeftPanel: FC = () => {
  const tabsItems = [
    {
      key: 'componentLib',
      label: (
        <span>
          <AppstoreOutlined></AppstoreOutlined>
          组件库
        </span>
      ),
      children: <ComponentLib></ComponentLib>,
    },
    {
      key: 'layers',
      label: (
        <span>
          <BarsOutlined></BarsOutlined>
          图层
        </span>
      ),
      children: <div>图层</div>,
    },
  ];
  return <Tabs defaultActiveKey="componentLib" items={tabsItems}></Tabs>;
};

export default LeftPanel;
