import { StoryFn, Meta } from '@storybook/react';
import React from 'react';

import Component from '../../components/QuestionComponents/QuestionParagraph/Component';

export default {
  title: 'Question/QuestionParagraph',
  component: Component,
} as Meta<typeof Component>;

const Template: StoryFn<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const SetProps = Template.bind({});
Default.args = {
  text: 'hello',
  isCenter: true,
};

export const BreakLine = Template.bind({});
BreakLine.args = {
  text: 'hello\nhello\nhello',
};
