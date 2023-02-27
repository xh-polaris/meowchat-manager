import { fetchCatList } from '@/services/cat';
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
import { CAT_COLUMNS } from './settings';

// const handleRemove = async (selectedRows: API.RuleListItem[]) => {
//   console.log(selectedRows);
// };

const Cat: React.FC = () => {
  const actionRef = useRef<ActionType>();
  // const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);
  const [currentCat, setCurrentCat] = useState('');
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
    const msg = await fetchCatList({
      ...params,
      current: params.current,
      pageSize: params.pageSize,
      communityId: localStorage.getItem('communityId'),
    });
    return {
      data: msg.cats,
      success: true,
      total: msg.total,
    };
  };

  const columns: ProColumns[] = [
    ...CAT_COLUMNS,
    {
      ...OPERATIONS,
      width: 150,
      render: (_, record) => (
        <>
          <Button
            type="link"
            size="small"
            key="edit"
            onClick={() => {
              setCurrentCat(record.id);
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
              setCurrentCat(record.id);
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
              setCurrentCat(record.id);
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
        headerTitle={'猫咪信息'}
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
      <View open={viewVisible} setViewVisible={setViewVisible} currentCat={currentCat} />
      <Create open={createVisible} setCreateVisible={setCreateVisible} actionRef={actionRef} />
      <Delete
        open={deleteVisible}
        setDeleteVisible={setDeleteVisible}
        actionRef={actionRef}
        currentCat={currentCat}
      />
      <Edit
        open={editVisible}
        setEditVisible={setEditVisible}
        actionRef={actionRef}
        currentCat={currentCat}
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
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
            type="primary"
            danger
          >
            批量删除
          </Button>
        </FooterToolbar>
      )} */}
    </PageContainer>
  );
};

export default Cat;
