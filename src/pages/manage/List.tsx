import { useDebounceFn, useRequest, useTitle } from 'ahooks';
import { Empty, Spin, Typography } from 'antd';
import { FC, useEffect, useMemo, useRef, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import ListSearch from '@/components/ListSearch';

import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '@/config/constants';
import { getQuestionListService } from '@/services/question';

import QuestionCard from '../../components/QuestionCard';

import styles from './common.module.scss';

const { Title } = Typography;

const List: FC = () => {
  useTitle('问卷调查 - 我的问卷');

  const [started, setStarted] = useState(false);
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const haveMoreData = total > list.length;

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';

  // keyword 变化时，重置信息
  useEffect(() => {
    setStarted(false);
    setPage(1);
    setList([]);
    setTotal(0);
  }, [keyword]);

  // 真正加载
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      });
      return { data };
    },
    {
      manual: true,
      onSuccess(result) {
        console.log(result);
        const { list: l = [], total: t = 0 } = result;
        setList(list.concat(l));
        setTotal(t);
        setPage(page + 1);
      },
    },
  );

  // 尝试触发加载
  const containerRef = useRef<HTMLDivElement>(null);
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current;
      if (elem === null) {
        return;
      }
      const domRect = elem.getBoundingClientRect();
      if (domRect === null) {
        return;
      }
      const { bottom } = domRect;
      if (bottom <= document.body.clientHeight) {
        load();
        setStarted(true);
      }
    },
    {
      wait: 1000,
    },
  );

  useEffect(() => {
    tryLoadMore();
  }, [searchParams]);

  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore);
    }

    return () => {
      window.removeEventListener('scroll', tryLoadMore);
    };
  }, [searchParams, haveMoreData]);

  const LoadMoreContentElem = useMemo(() => {
    if (!started || loading) return <Spin></Spin>;
    if (total === 0) return <Empty description="暂无数据"></Empty>;
    if (!haveMoreData) return <span>没有更多了...</span>;
    return <span>开始加载下一页</span>;
  }, [started, loading, haveMoreData]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch></ListSearch>
        </div>
      </div>
      <div className={styles.content}>
        {list.length > 0 &&
          list.map((q: any) => {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem}</div>
      </div>
    </>
  );
};

export default List;
