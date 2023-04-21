import React, { FC } from 'react';

import { useLoadQuestionData } from '@/hooks/useLoadQuestionData';

const Edit: FC = () => {
  const { loading, data } = useLoadQuestionData();

  return (
    <>
      Edit page
      {loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>}
    </>
  );
};

export default Edit;
