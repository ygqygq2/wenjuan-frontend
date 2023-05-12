import Component from './Component';
import PropComponent from './PropComponent';
import StatComponent from './StatComponent';
import { QuestionCheckboxDefaultProps } from './interface';

export * from './interface';

export default {
  title: '单选',
  type: 'questionCheckbox', // 要和后端统一好
  Component, // 画布显示的组件
  PropComponent, // 修改属性
  StatComponent,
  defaultProps: QuestionCheckboxDefaultProps,
};
