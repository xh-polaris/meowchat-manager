// import type { ActionType } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { fetchCommunityList } from '@/services/community';
import { Table, Button } from 'antd';
// import { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-table';
import { COMMUNITY_COLUMNS } from '@/pages/Community/settings';
import { OPERATIONS } from '@/pages/commonSettings';
const Community: React.FC = () => {
  const expandedRowRender = (record: object) => {
    console.log('record', record);
    const columns = [
      {
        title: '校区',
        dataIndex: 'campus',
        key: 'campus',
      },
      {
        ...OPERATIONS,
        width: 400,
        render: () => {
          return <>(开发中)</>;
        },
      },
    ];
    const data = [];

    // @ts-ignore
    record.campuses.map((item) => data.push(item));

    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns: ProColumns[] = [
    ...COMMUNITY_COLUMNS,
    {
      ...OPERATIONS,
      width: 400,
      render: () => {
        // (_, record) 这里record返回的就是每个university数据，一个record是一个university
        return <>(开发中)</>;
      },
    },
  ];

  // const actionRef = useRef<ActionType>();
  // const [createVisible, setCreateVisible] = useState(false);

  const requestTable = async () => {
    const communityList: any[] = (await fetchCommunityList({})).communities;
    const universityList: any[] = [];
    const campusList: any[] = [];
    communityList.map((community) => {
      if (community.parentId) {
        campusList.push({
          campus: community.name,
          id: community.id,
          parentId: community.parentId,
        });
      } else {
        universityList.push({
          university: community.name,
          id: community.id,
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

    return {
      data: universityList,
      success: true,
      total: universityList.length,
    };
  };

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        expandable={{
          expandedRowRender,
        }}
        headerTitle={'社区信息'}
        // actionRef={actionRef}
        rowKey="id" //这里对应data那里的id
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
        // dataSource={data}
        pagination={{
          pageSize: 20,
          showSizeChanger: false,
        }}
      />
      {/*<Create open={createVisible} setCreateVisible={setCreateVisible} actionRef={actionRef}/>*/}
    </PageContainer>
  );
};
export default Community;
