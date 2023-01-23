import { fetchNoticeList } from '@/services/notice';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef, useState } from 'react';
import { OPERATIONS } from '../commonSettings';
import Create from './components/Create';
import Edit from './components/Edit';
import { NOTICE_COLUMNS } from './settings';

const Notice: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [currentNotice, setCurrentNotice] = useState({});
  const [createVisible, setCreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  const requestTable = async (
    params: any & {
      pageSize: number;
      current: number;
    },
  ) => {
    const msg = await fetchNoticeList({
      ...params,
      current: params.current,
      pageSize: params.pageSize,
      communityId: '637ce159b15d9764c31f9c84',
    });
    return {
      data: msg.notices,
      success: true,
      total: msg.notices.length,
    };
  };

  const columns: ProColumns[] = [
    ...NOTICE_COLUMNS,
    {
      ...OPERATIONS,
      width: 100,
      render: (_, record) => (
        <>
          <Button
            type="link"
            size="small"
            key="edit"
            onClick={() => {
              setCurrentNotice(record);
              setEditVisible(true);
            }}
          >
            编辑
          </Button>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={'公告信息'}
        actionRef={actionRef}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCreateVisible(true);
            }}
          >
            <PlusOutlined />
            新建
          </Button>,
        ]}
        request={requestTable}
        columns={columns}
        pagination={{
          pageSize: 20,
        }}
      />
      <Create open={createVisible} setCreateVisible={setCreateVisible} actionRef={actionRef} />
      <Edit
        open={editVisible}
        setEditVisible={setEditVisible}
        actionRef={actionRef}
        currentNotice={currentNotice}
      />
    </PageContainer>
  );
};

export default Notice;
