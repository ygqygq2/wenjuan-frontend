import { useRequest } from 'ahooks';
import { Pagination, Table, Typography } from 'antd';
import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loading from '@/components/Loading';
import { STAT_PAGE_SIZE } from '@/config/constants';
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo';
import { getQuestionStatListService } from '@/services/stat';

const { Title } = Typography;

type PropsType = {
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
};

const PageStat: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props;

  const { id = '' } = useParams();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const { loading } = useRequest(
    async () => {
      const res = await getQuestionStatListService(id, { page, pageSize });
      return res;
    },
    {
      refreshDeps: [id, page, pageSize],
      onSuccess(res) {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const { total, list = [] } = res;
        setTotal(total);
        setList(list);
      },
    },
  );

  const { componentList } = useGetComponentInfo<any>();
  const columns = componentList.map((c) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { fe_id, title, type, props } = c;
    const colTitle = props?.title || title;

    return {
      // title: colTitle,
      title: (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSelectedComponentId(fe_id);
            setSelectedComponentType(type);
          }}
        >
          <span style={{ color: fe_id === selectedComponentId ? '#1890ff' : 'inherit' }}>{colTitle}</span>
        </div>
      ),
      dataIndex: fe_id,
    };
  });

  const dataSource = list.map((i: any) => ({ ...i, key: i._id }));
  const TableElem = (
    <>
      <Table columns={columns} dataSource={dataSource} pagination={false}></Table>
      <div style={{ textAlign: 'center', marginTop: '18px' }}>
        <Pagination
          total={total}
          pageSize={pageSize}
          current={page}
          // eslint-disable-next-line @typescript-eslint/no-shadow
          onChange={(page) => setPage(page)}
          // eslint-disable-next-line @typescript-eslint/no-shadow
          onShowSizeChange={(page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          }}
        />
      </div>
    </>
  );

  return (
    <div>
      <Title level={3}>答卷数量：{!loading && total}</Title>
      {loading && <Loading></Loading>}
      {!loading && TableElem}
    </div>
  );
};

export default PageStat;
