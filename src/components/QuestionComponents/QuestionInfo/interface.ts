export type QuestionInfoPropsType = {
  title?: string;
  description?: string;
  disabled?: boolean;

  onChange?: (newProps: QuestionInfoPropsType) => void;
};

export const QuestionInfoDefaultProps: QuestionInfoPropsType = {
  title: '问卷标题',
  description: '问卷描述',
};
