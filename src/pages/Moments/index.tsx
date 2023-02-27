import { fetchMomentList } from '@/services/moments';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef, useState } from 'react';
import { OPERATIONS } from '../commonSettings';
import Create from './components/Create';
import Delete from './components/Delete';
import Edit from './components/Edit';
import View from './components/View';
import { MOMENTS_COLUMNS } from './settings';

const Moments = () => {
  const actionRef = useRef<ActionType>();
  // const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);
  const [currentMoment, setCurrentMoment] = useState('');
  const [viewVisible, setViewVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  const requestTable = async (
    params: any & {
      pageSize: number;
      current: number;
    },
  ) => {
    const msg = await fetchMomentList({
      ...params,
      current: params.current,
      pageSize: params.pageSize,
      communityId: localStorage.getItem('communityId'),
    });
    return {
      data: msg.moments,
      success: true,
      total: msg.total,
    };
  };

  const columns: ProColumns[] = [
    ...MOMENTS_COLUMNS,
    {
      ...OPERATIONS,
      width: 200,
      render: (_, record) => (
        <>
          <Button
            type="link"
            size="small"
            key="edit"
            onClick={() => {
              setCurrentMoment(record.id);
              setEditVisible(true);
            }}
          >
            编辑
          </Button>
          <Button
            type="link"
            size="small"
            key="view"
            onClick={() => {
              setCurrentMoment(record.id);
              setViewVisible(true);
            }}
          >
            查看
          </Button>
          <Button
            type="link"
            size="small"
            danger
            key="delete"
            onClick={() => {
              setCurrentMoment(record.id);
              setDeleteVisible(true);
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
        headerTitle={'动态信息'}
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
        // rowSelection={{
        //   onChange: (_, selectedRows) => {
        //     setSelectedRows(selectedRows);
        //   },
        // }}
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
        }}
      />
      <View open={viewVisible} setViewVisible={setViewVisible} currentMoment={currentMoment} />
      <Create open={createVisible} setCreateVisible={setCreateVisible} actionRef={actionRef} />
      <Delete
        open={deleteVisible}
        setDeleteVisible={setDeleteVisible}
        actionRef={actionRef}
        currentMoment={currentMoment}
      />
      <Edit
        open={editVisible}
        setEditVisible={setEditVisible}
        actionRef={actionRef}
        currentMoment={currentMoment}
      />
      {/* {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项
            </div>
          }
        >
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )} */}
    </PageContainer>
  );
};

export default Moments;
