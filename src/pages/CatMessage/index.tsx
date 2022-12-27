import { fetchCatList } from '@/services/cat';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import { OPERATIONS } from '../commonSettings';
import View from './components/View';
import { CAT_MESSAGE_COLUMNS } from './settings';

// const handleAdd = async (fields: API.RuleListItem) => {
// };

const handleRemove = async (selectedRows: API.RuleListItem[]) => {
  console.log(selectedRows);
};

const CatMessage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);
  const [currentCat, setCurrentCat] = useState('');
  const [viewVisible, setViewVisible] = useState(false);

  const fetchCommunityInfo = () => {
    return '637ce159b15d9764c31f9c84';
  };

  const requestTable = async (
    params: any & {
      pageSize: number;
      current: number;
    },
  ) => {
    const msg = await fetchCatList({
      current: params.current,
      pageSize: params.pageSize,
      communityId: fetchCommunityInfo(),
    });
    return {
      data: msg.cats,
      success: true,
      total: msg?.cats?.length,
    };
  };

  const columns: ProColumns[] = [
    ...CAT_MESSAGE_COLUMNS,
    {
      ...OPERATIONS,
      render: (_, record) => (
        <>
          <Button
            type="link"
            size="small"
            key="edit"
            onClick={() => {
              console.log(currentCat);
              console.log(viewVisible);
            }}
          >
            编辑
          </Button>
          <Button
            type="link"
            size="small"
            key="view"
            onClick={() => {
              setCurrentCat(record.id);
              setViewVisible(true);
            }}
          >
            查看
          </Button>
          <Button type="link" size="small" danger key="delete">
            删除
          </Button>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={'猫咪信息'}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" key="primary">
            <PlusOutlined />
            新建
          </Button>,
        ]}
        request={requestTable}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      <View open={viewVisible} setViewVisible={setViewVisible} currentCat={currentCat} />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
    </PageContainer>
  );
};

export default CatMessage;
