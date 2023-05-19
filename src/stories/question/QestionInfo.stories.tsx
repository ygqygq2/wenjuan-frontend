import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import Component from '@/components/QuestionComponents/QuestionInfo/Component';

export default {
  title: 'Question/QuestionInfo',
  component: Component,
} as Meta<typeof Component>;

const Template: StoryFn<typeof Component> = (args) => <Component {...args} />;

// 默认属性
export const Default = Template.bind({});
Default.args = {};

// 设置了属性
export const SetProps = Template.bind({});
SetProps.args = {
  title: 'hello',
  desc: 'world',
};

// 换行
export const DescBreakLine = Template.bind({});
DescBreakLine.args = {
  title: 'hello',
  desc: 'a\n\bc',
};
