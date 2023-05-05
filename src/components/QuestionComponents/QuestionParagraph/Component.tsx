import { Typography } from 'antd';
import React, { FC } from 'react';

import { QuestionParagraphDefaultProps, QuestionParagraphPropsType } from './interface';

const { Paragraph } = Typography;

const QuestionParagraph: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text = '', isCenter = false } = { ...QuestionParagraphDefaultProps, ...props };

  const textList = text.split('\n');
  return (
    <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: '0' }}>
      {textList.map((t, index) => (
        <span key={index}>
          {index > 0 && <br />}
          {t}
        </span>
      ))}
    </Paragraph>
  );
};

export default QuestionParagraph;
