import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import React, { FC } from 'react';

import ComponentProp from './ComponentProp';

const RightPanel: FC = () => {
  const tabsItems = [
    {
      key: 'props',
      label: (
        <span>
          <FileTextOutlined></FileTextOutlined>
          属性
        </span>
      ),
      children: <ComponentProp></ComponentProp>,
    },
    {
      key: 'setting',
      label: (
        <span>
          <SettingOutlined></SettingOutlined>
          页面设置
        </span>
      ),
      chilren: <div>页面设置</div>,
    },
  ];
  return <Tabs defaultActiveKey="prop" items={tabsItems}></Tabs>;
};

export default RightPanel;
