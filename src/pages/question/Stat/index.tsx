import React, { FC } from 'react';

import { useLoadQuestionData } from '@/hooks/useLoadQuestionData';

const Stat: FC = () => {
  const { loading, data } = useLoadQuestionData();
  return (
    <>
      Stat page
      {loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>}
    </>
  );
};

export default Stat;
