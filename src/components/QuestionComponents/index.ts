import { FC } from 'react';

import QuestionCheckboxConf, { QuestionCheckboxStatPropsType, QuestionCheckboxPropsType } from './QuestionCheckbox';
import QuestionInfoConf, { QuestionInfoPropsType } from './QuestionInfo';
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput';
import QuestionParagraphConf, { QuestionParagraphPropsType } from './QuestionParagraph';
import QuestionRadioConf, { QuestionRadioStatPropsType, QuestionRadioPropsType } from './QuestionRadio';
import QuestionTextareaConf, { QuestionTextareaPropsType } from './QuestionTextarea';
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle';

// 组件的 prop type
export type ComponentPropsType =
  | QuestionCheckboxPropsType
  | QuestionInfoPropsType
  | QuestionInputPropsType
  | QuestionParagraphPropsType
  | QuestionRadioPropsType
  | QuestionTextareaPropsType
  | QuestionTitlePropsType;

// 组件的 stat
type ComponentStatPropsType = QuestionRadioStatPropsType & QuestionCheckboxStatPropsType;

// 使用泛型定义
export type ComponentConfType<T> = {
  title: string;
  type: string;
  Component: FC<T>;
  PropComponent: FC<T>;
  defaultProps: T & { onChange?: (newProps: T) => void }; // 添加 onChange 属性
  StatComponent?: FC<ComponentStatPropsType>;
};

// 组件分组
export const componentConfGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionInfoConf, QuestionTitleConf, QuestionParagraphConf],
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConf, QuestionTextareaConf],
  },
  {
    groupId: 'chooseGroup',
    groupName: '用户选择',
    components: [QuestionRadioConf, QuestionCheckboxConf],
  },
];

const componentConfList: ComponentConfType<any>[] = [
  QuestionCheckboxConf,
  QuestionInfoConf,
  QuestionInputConf,
  QuestionParagraphConf,
  QuestionRadioConf,
  QuestionTextareaConf,
  QuestionTitleConf,
];

export function getComponentConfByType<T>(type: string): ComponentConfType<T> | undefined {
  return componentConfList.find((c) => c.type === type) as ComponentConfType<T> | undefined;
}
