import Component from './Component';
import PropComponent from './PropComponent';

import { QuestionTitleDefaultProps } from './interface';

export * from './interface';

export default {
  title: '标题',
  type: 'questionTitle',
  Component,
  PropComponent,
  defaultProps: QuestionTitleDefaultProps,
};
