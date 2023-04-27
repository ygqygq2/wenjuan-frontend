import { Input, Typography } from 'antd';
import React, { FC } from 'react';

import { QuestionInputDefaultProps, QuestionInputPropsType } from './interface';

const { Paragraph } = Typography;
const QuestionInput: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const { title, placeholder } = { ...QuestionInputDefaultProps, ...props };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Input placeholder={placeholder}></Input>
    </div>
  );
};

export default QuestionInput;
