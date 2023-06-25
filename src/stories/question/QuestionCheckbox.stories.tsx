import { StoryFn, Meta } from '@storybook/react';
import React from 'react';

import Component from '../../components/QuestionComponents/QuestionCheckbox/Component';

export default {
  title: 'Question/QuestionCheckbox',
  component: Component,
} as Meta<typeof Component>;

const Template: StoryFn<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const SetProps = Template.bind({});
SetProps.args = {
  title: 'hello',
  options: [
    { value: 'v1', text: 't1', checked: false },
    { value: 'v2', text: 't2', checked: true },
    { value: 'v3', text: 't3', checked: true },
  ],
  isVertical: true,
};
