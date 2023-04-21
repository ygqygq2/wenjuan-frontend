import React, { FC } from 'react';

import { useLoadQuestionData } from '@/hooks/useLoadQuestionData';

const Edit: FC = () => {
  const { loading, questionData } = useLoadQuestionData();

  return (
    <>
      Edit page
      {loading ? <p>loading</p> : <p>{JSON.stringify(questionData)}</p>}
    </>
  );
};

export default Edit;
