import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef, useState } from 'react';
import { OPERATIONS } from '@/pages/commonSettings';
// import { fetchSuperAdminList } from '@/services/super-admin';
import { SUPER_ADMIN_COLUMNS } from './settings';
import Create from './components/Create';
// import Delete from './components/Delete';

const Notice: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [createVisible, setCreateVisible] = useState(false);
  // const [deleteVisible, setDeleteVisible] = useState(false);

  // const requestTable = async (
  //     params: any & {
  //         pageSize: number;
  //         current: number;
  //     },
  // ) => {
  //     const msg = await fetchSuperAdminList({
  //         ...params,
  //         current: params.current,
  //         pageSize: params.pageSize,
  //     });
  //     return {
  //         data: msg.notices,
  //         success: true,
  //         total: msg.notices.length,
  //     };
  // };

  const columns: ProColumns[] = [
    ...SUPER_ADMIN_COLUMNS,
    {
      ...OPERATIONS,
      render: () => (
        <>
          <Button
            type="link"
            size="small"
            danger
            key="delete"
            onClick={() => {
              // setDeleteVisible(true);
            }}
          >
            删除
          </Button>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle="超级管理员信息"
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
        // request={requestTable}
        columns={columns}
        pagination={{
          pageSize: 20,
          showSizeChanger: false,
        }}
      />
      <Create open={createVisible} setCreateVisible={setCreateVisible} actionRef={actionRef} />
      {/* <Delete
        open={deleteVisible}
        setDeleteVisible={setDeleteVisible}
        actionRef={actionRef}
        currentNotice={currentNotice}
      /> */}
    </PageContainer>
  );
};

export default Notice;
