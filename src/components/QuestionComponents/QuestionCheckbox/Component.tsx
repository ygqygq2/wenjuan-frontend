import { Checkbox, Space, Typography } from 'antd';
import React, { FC } from 'react';

import { QuestionCheckboxDefaultProps, QuestionCheckboxPropsType } from './interface';

const { Paragraph } = Typography;

const QuestionCheckbox: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const { title, options: list = [], isVertical } = { ...QuestionCheckboxDefaultProps, ...props };

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {list.map((opt) => {
          const { value, text, checked } = opt;
          return (
            <Checkbox key={value} value={value} checked={checked}>
              {text}
            </Checkbox>
          );
        })}
      </Space>
    </div>
  );
};

export default QuestionCheckbox;
