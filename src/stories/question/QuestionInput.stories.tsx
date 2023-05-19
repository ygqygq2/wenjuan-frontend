import { StoryFn, Meta } from '@storybook/react';
import React from 'react';

import Component from '../../components/QuestionComponents/QuestionInput/Component';

export default {
  title: 'Question/QuestionInput',
  component: Component,
} as Meta<typeof Component>;

const Template: StoryFn<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const SetProps = Template.bind({});
SetProps.args = {
  title: 'Custom title',
  placeholder: 'Type here...',
};
