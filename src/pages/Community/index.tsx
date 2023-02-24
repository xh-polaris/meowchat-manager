import type { ActionType } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { fetchCommunityList } from '@/services/community';
import { Table, Space, Button } from 'antd';
import { useRef, useState } from 'react';
import { fetchNoticeList } from '@/services/notice';
import { PlusOutlined } from '@ant-design/icons';
import Create from '@/pages/Notice/components/Create';
const Community: React.FC = () => {
  fetchCommunityList({}).then((data) => {
    const communityList: any[] = data.communities;
    const universityList: any[] = [];
    const campusList: any[] = [];
    communityList.map((community) => {
      if (community.parentId) {
        campusList.push(community);
      } else {
        universityList.push({
          ...community,
          campuses: [],
        });
      }
    });
    universityList.map((university) => {
      campusList
        .filter((campus) => campus.parentId === university.id)
        .map((campus) => {
          university.campuses.push(campus);
        });
    });
    console.log(universityList);
  });

  const expandedRowRender = () => {
    const columns = [
      {
        title: '校区',
        dataIndex: 'campus',
        key: 'campus',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <Space size="middle">
            <a>编辑</a>
          </Space>
        ),
      },
    ];
    const data = [];

    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        campus: '闵行校区',
      });
    }

    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns = [
    {
      title: '学校',
      dataIndex: 'university',
      key: 'university',
    },
    {
      title: '操作',
      key: 'operation',
      render: () => <a>编辑</a>,
    },
  ];
  const data = [];

  for (let i = 0; i < 3; ++i) {
    data.push({
      key: Math.random(),
      university: '华东师范大学',
    });
  }

  const actionRef = useRef<ActionType>();
  const [createVisible, setCreateVisible] = useState(false);

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

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        expandable={{
          expandedRowRender,
        }}
        headerTitle={'社区信息'}
        actionRef={actionRef}
        rowKey="key" //这里对应data那里 也可以换成id啥的
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
        dataSource={data}
        pagination={{
          pageSize: 20,
          showSizeChanger: false,
        }}
      />
      <Create open={createVisible} setCreateVisible={setCreateVisible} actionRef={actionRef} />
    </PageContainer>
  );
};
export default Community;

// import React from 'react';
// import 'antd/dist/antd.css';
// import './index.css';
// import { Badge, Space, Table } from 'antd';
