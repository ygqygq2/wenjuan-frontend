import { FC, useState } from 'react';

import QuestionCard from '../../components/QuestionCard';

import styles from './List.module.scss';

const rawQuestionList = [
  {
    _id: '1',
    title: '问卷 1',
    isPublished: false,
    isStart: true,
    answerCount: 100,
    createdAt: '2021-01-01 12:00:00',
  },
  {
    _id: '2',
    title: '问卷 2',
    isPublished: true,
    isStart: false,
    answerCount: 3,
    createdAt: '2021-01-02 12:00:00',
  },
  {
    _id: '3',
    title: '问卷 3',
    isPublished: true,
    isStart: true,
    answerCount: 40,
    createdAt: '2021-01-03 12:00:00',
  },
  {
    _id: '4',
    title: '问卷 4',
    isPublished: false,
    isStart: false,
    answerCount: 20,
    createdAt: '2021-01-04 12:00:00',
  },
];

const List: FC = () => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [questionList, setQuestionList] = useState(rawQuestionList);
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <h3>我的问卷</h3>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {questionList.map((q) => {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const { _id } = q;
          return <QuestionCard isStar={false} key={_id} {...q} />;
        })}
      </div>
      <div className={styles.footer}>List 底部</div>
    </>
  );
};

export default List;
