import React, { FC } from 'react';

type PropsType = {
  _id: string;
  title: string;
  isStar: boolean;
  isPublished: boolean;
  answerCount: number;
  createdAt: string;
};

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _id } = props;
  return (
    <>
      <p>QuestionCard {_id}</p>
    </>
  );
};

export default QuestionCard;
