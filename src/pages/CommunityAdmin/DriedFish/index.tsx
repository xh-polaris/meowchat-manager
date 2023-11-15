import CommunitySelector from '@/components/CommunitySelector';
import { fetchDriedFishList } from '@/services/dried-fish';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef, useState } from 'react';
import { OPERATIONS } from '@/pages/commonSettings';
// import Create from './components/Create';
// import Delete from './components/Delete';
// import Edit from './components/Edit';
import View from './components/View';
import { CAROUSEL_COLUMNS } from './settings';

const DriedFish: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [currentDriedFish, setCurrentDriedFish] = useState({});
  //   const [createVisible, setCreateVisible] = useState(false);
  //   const [deleteVisible, setDeleteVisible] = useState(false);
  //   const [editVisible, setEditVisible] = useState(false);
  const [viewVisible, setViewVisible] = useState(false);
  const [includeGlobalPlan, setIncludeGlobalPlan] = useState(0);

  const requestTable = async (
    params: any & {
      pageSize: number;
      current: number;
    },
  ) => {
    const data = await fetchDriedFishList({
      ...params,
      page: params.current - 1,
      communityId: localStorage.getItem('communityId'),
      includeGlobal: includeGlobalPlan,
    });
    return {
      data: data.plans,
      success: true,
      total: data.total,
    };
  };

  const access = localStorage.getItem('access');

  const columns: ProColumns[] = [
    ...CAROUSEL_COLUMNS,
    {
      ...OPERATIONS,
      width: 200,
      render: (_, record) => (
        <>
          <Button
            type="link"
            size="small"
            key="complete"
            onClick={() => {
              // setCurrentCarousel(record);
              // setEditVisible(true);
            }}
          >
            完成计划
          </Button>
          <Button
            type="link"
            size="small"
            key="detail"
            onClick={() => {
              setCurrentDriedFish(record.id);
              setViewVisible(true);
            }}
          >
            详情
          </Button>
          <Button
            type="link"
            size="small"
            key="edit"
            onClick={() => {
              //   setCurrentCarousel(record);
              //   setEditVisible(true);
            }}
          >
            编辑
          </Button>
          <Button
            type="link"
            size="small"
            danger
            key="delete"
            onClick={() => {
              // setCurrentCarousel(record);
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
      {access === 'superAdmin' ? <CommunitySelector actionRef={actionRef} /> : <></>}
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle="小鱼干计划信息"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <>
            {access === 'superAdmin' ? (
              <Button
                type="primary"
                key="primary"
                onClick={() => {
                  setIncludeGlobalPlan(includeGlobalPlan === 0 ? 1 : 0);
                  actionRef?.current?.reload();
                }}
              >
                {includeGlobalPlan === 0 ? '展示全局计划' : '隐藏全局计划'}
              </Button>
            ) : (
              <></>
            )}
          </>,
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              //   setCreateVisible(true);
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
      {/* <Create open={createVisible} setCreateVisible={setCreateVisible} actionRef={actionRef} />
      <Delete
        open={deleteVisible}
        setDeleteVisible={setDeleteVisible}
        actionRef={actionRef}
        currentCarousel={currentCarousel}
      />
      <Edit
        open={editVisible}
        setEditVisible={setEditVisible}
        actionRef={actionRef}
        currentCarousel={currentCarousel}
      /> */}
      <View
        open={viewVisible}
        setViewVisible={setViewVisible}
        currentDriedFish={currentDriedFish}
      />
    </PageContainer>
  );
};

export default DriedFish;
