import CommunitySelector from '@/components/CommunitySelector';
import { fetchCarouselList } from '@/services/carousel';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef, useState } from 'react';
import { OPERATIONS } from '@/pages/commonSettings';
import Create from './components/Create';
import Delete from './components/Delete';
import Edit from './components/Edit';
import { CAROUSEL_COLUMNS } from './settings';

const Carousel: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [currentCarousel, setCurrentCarousel] = useState({});
  const [createVisible, setCreateVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  const requestTable = async (
    params: any & {
      pageSize: number;
      current: number;
    },
  ) => {
    const msg = await fetchCarouselList({
      ...params,
      current: params.current,
      pageSize: params.pageSize,
      communityId: localStorage.getItem('communityId'),
    });
    return {
      data: msg.news,
      success: true,
      total: msg.news.length,
    };
  };

  const access = localStorage.getItem('access');

  const columns: ProColumns[] = [
    ...CAROUSEL_COLUMNS,
    {
      ...OPERATIONS,
      width: 100,
      render: (_, record) =>
        !record.isPublic || access === 'superAdmin' ? (
          <>
            <Button
              type="link"
              size="small"
              key="edit"
              onClick={() => {
                setCurrentCarousel(record);
                setEditVisible(true);
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
                setCurrentCarousel(record);
                setDeleteVisible(true);
              }}
            >
              删除
            </Button>
          </>
        ) : (
          <></>
        ),
    },
  ];

  return (
    <PageContainer>
      {access === 'superAdmin' ? <CommunitySelector actionRef={actionRef} /> : <></>}
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle="轮播图信息"
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
      />
    </PageContainer>
  );
};

export default Carousel;
