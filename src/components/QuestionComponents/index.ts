import { FC } from 'react';

import QuestionCheckboxConf, { QuestionCheckboxPropsType, QuestionCheckboxStatPropsType } from './QuestionCheckbox';
import QuestionInfoConf, { QuestionInfoPropsType } from './QuestionInfo';
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput';
import QuestionParagraphConf, { QuestionParagraphPropsType } from './QuestionParagraph';
import QuestionRadioConf, { QuestionRadioPropsType, QuestionRadioStatPropsType } from './QuestionRadio';
import QuestionTextareaConf, { QuestionTextareaPropsType } from './QuestionTextarea';
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle';

// 组件的 prop type
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionTextareaPropsType &
  QuestionRadioPropsType &
  QuestionCheckboxPropsType;

// 组件的 stat
type ComponentStatPropsType = QuestionRadioStatPropsType & QuestionCheckboxStatPropsType;

// 组件的配置
export type ComponentConfType = {
  title: string;
  type: string;
  Component: FC<ComponentPropsType>;
  PropComponent: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
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

const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
  QuestionParagraphConf,
  QuestionInfoConf,
  QuestionRadioConf,
  QuestionCheckboxConf,
];

export function getComponentConfByType(type: string) {
  return componentConfList.find((c) => c.type === type);
}
