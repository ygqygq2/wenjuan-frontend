import React, { FC } from 'react';

import { useLoadQuestionData } from '@/hooks/useLoadQuestionData';

const Stat: FC = () => {
  const { loading, questionData } = useLoadQuestionData();
  return (
    <>
      Stat page
      {loading ? <p>loading</p> : <p>{JSON.stringify(questionData)}</p>}
    </>
  );
};

export default Stat;
