export type OptionType = {
  value: string;
  text: string;
  checked: boolean;
};

export type QuestionCheckboxPropsType = {
  title?: string;
  isVertical?: boolean;
  options?: OptionType[];
  disabled?: boolean;

  onChange?: (newProps: QuestionCheckboxPropsType) => void;
};

export const QuestionCheckboxDefaultProps: QuestionCheckboxPropsType = {
  title: '多选标题',
  isVertical: false,
  options: [
    { value: 'item1', text: '选项 1', checked: false },
    { value: 'item2', text: '选项 2', checked: false },
    { value: 'item3', text: '选项 3', checked: false },
  ],
};
// 统计组件的属性类型
export type QuestionCheckboxStatPropsType = {
  stat: Array<{ name: string; count: number }>;
};
