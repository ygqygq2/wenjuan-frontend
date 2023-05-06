export type OptionType = {
  value: string;
  text: string;
};

export type QuestionRadioPropsType = {
  title?: string;
  isVertical?: boolean;
  options?: OptionType[];
  value?: string;
  disabled?: boolean;

  onChange?: (newProps: QuestionRadioPropsType) => void;
};

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: '单选标题',
  isVertical: false,
  options: [
    { value: 'item1', text: '选项 1' },
    { value: 'item2', text: '选项 2' },
    { value: 'item3', text: '选项 3' },
  ],
  value: '',
};
