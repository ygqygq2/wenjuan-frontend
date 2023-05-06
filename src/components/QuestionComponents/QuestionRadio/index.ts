import Component from './Component';
import PropComponent from './PropComponent';
import { QuestionRadioDefaultProps } from './interface';

export * from './interface';

export default {
  title: '单选',
  type: 'questionRadio', // 要和后端统一好
  Component, // 画布显示的组件
  PropComponent, // 修改属性
  defaultProps: QuestionRadioDefaultProps,
};
