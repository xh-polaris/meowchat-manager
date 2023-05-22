import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef, useState } from 'react';
import { OPERATIONS } from '@/pages/commonSettings';
import { fetchCommunityAdminList } from '@/services/community-admin';
import { COMMUNITY_ADMIN_COLUMNS } from './settings';
import Create from './components/Create';
import Delete from './components/Delete';
import CommunitySelector from '@/components/CommunitySelector';

const Notice: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [createVisible, setCreateVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [currentId, setCurrentId] = useState('');

  const requestTable = async (params: any) => {
    const msg = await fetchCommunityAdminList({
      ...params,
      communityId: localStorage.getItem('communityId'),
    });
    return {
      data: msg.users,
      success: true,
      total: msg.users.length,
    };
  };

  const columns: ProColumns[] = [
    ...COMMUNITY_ADMIN_COLUMNS,
    {
      ...OPERATIONS,
      render: (_, record) => (
        <>
          <Button
            type="link"
            size="small"
            danger
            key="delete"
            onClick={() => {
              setCurrentId(record.id);
              setDeleteVisible(true);
            }}
          >
            取消社区管理员
          </Button>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <CommunitySelector actionRef={actionRef} />
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle="社区管理员信息"
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
            添加
          </Button>,
        ]}
        request={requestTable}
        columns={columns}
        pagination={{
          pageSize: 20,
          showSizeChanger: false,
        }}
      />
      <Create open={createVisible} setCreateVisible={setCreateVisible} actionRef={actionRef} />
      <Delete
        open={deleteVisible}
        setDeleteVisible={setDeleteVisible}
        actionRef={actionRef}
        currentId={currentId}
      />
    </PageContainer>
  );
};

export default Notice;
