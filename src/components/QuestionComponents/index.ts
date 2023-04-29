import { FC } from 'react';

import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput';
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle';

// 组件的 prop type
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType;

// 组件的配置
export type ComponentConfType = {
  title: string;
  type: string;
  Component: FC<ComponentPropsType>;
  PropComponent: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
};

// 组件分组
export const componentConfGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionTitleConf],
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConf],
  },
];

const componentConfList: ComponentConfType[] = [QuestionInputConf, QuestionTitleConf];

export function getComponentConfByType(type: string) {
  return componentConfList.find((c) => c.type === type);
}
