import type { ActionType } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { fetchCommunityList } from '@/services/community';
import { Table, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-table';
import { COMMUNITY_COLUMNS } from '@/pages/SuperAdmin/Community/settings';
import { OPERATIONS } from '@/pages/commonSettings';
import CreateUniversity from './components/CreateUniversity';
import DeleteUniversity from './components/DeleteUniversity';
import EditUniversity from './components/EditUniversity';
import { useState, type SetStateAction, useRef } from 'react';

import CreateCampus from '@/pages/SuperAdmin/Community/components/CreateCampus';
import EditCampus from '@/pages/SuperAdmin/Community/components/EditCampus';
import DeleteCampus from '@/pages/SuperAdmin/Community/components/DeleteCampus';
const Community: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [currentUniversity, setCurrentUniversity] = useState({});
  const [currentCampus, setCurrentCampus] = useState({});
  const [editUniversityVisible, setEditUniversityVisible] = useState(false);
  const [createUniversityVisible, setCreateUniversityVisible] = useState(false);
  const [deleteUniversityVisible, setDeleteUniversityVisible] = useState(false);
  const [createCampusVisible, setCreateCampusVisible] = useState(false);
  const [editCampusVisible, setEditCampusVisible] = useState(false);
  const [deleteCampusVisible, setDeleteCampusVisible] = useState(false);

  const expandedRowRender = (universityRecord: object) => {
    const columns = [
      {
        title: '校区',
        dataIndex: 'campus',
        key: 'campus',
      },
      {
        ...OPERATIONS,
        width: '40%',
        render: (_: any, campusRecord: SetStateAction<any>) => {
          return (
            <>
              <Button
                type="link"
                size="small"
                key="edit"
                onClick={() => {
                  setCurrentUniversity(universityRecord);
                  setCurrentCampus(campusRecord);
                  setEditCampusVisible(true);
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
                  setCurrentUniversity(universityRecord);
                  setCurrentCampus(campusRecord);
                  setDeleteCampusVisible(true);
                }}
              >
                删除
              </Button>
            </>
          );
        },
      },
    ];
    const data: any[] = [];

    // @ts-ignore
    universityRecord.campuses.map((item) => data.push(item));

    // @ts-ignore
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns: ProColumns[] = [
    ...COMMUNITY_COLUMNS,
    {
      ...OPERATIONS,
      width: '40%',
      render: (_, record) => {
        // (_, record) 这里record返回的就是每个university数据，一个record是一个university
        return (
          <>
            <Button
              type="link"
              size="small"
              key="add"
              onClick={() => {
                setCurrentUniversity(record);
                setCreateCampusVisible(true);
              }}
            >
              添加校区
            </Button>
            <Button
              type="link"
              size="small"
              key="edit"
              onClick={() => {
                setCurrentUniversity(record);
                setEditUniversityVisible(true);
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
                setCurrentUniversity(record);
                setDeleteUniversityVisible(true);
              }}
            >
              删除
            </Button>
          </>
        );
      },
    },
  ];

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
        actionRef={actionRef} //有这个才会在比如edit后刷新数据
        rowKey="id" //这里对应data那里的id
        search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCreateUniversityVisible(true);
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
          showSizeChanger: false,
        }}
      />
      <CreateUniversity
        open={createUniversityVisible}
        setCreateVisible={setCreateUniversityVisible}
        actionRef={actionRef}
      />
      <EditUniversity
        open={editUniversityVisible}
        setEditVisible={setEditUniversityVisible}
        actionRef={actionRef}
        currentUniversity={currentUniversity}
      />
      <DeleteUniversity
        open={deleteUniversityVisible}
        setDeleteVisible={setDeleteUniversityVisible}
        actionRef={actionRef}
        currentUniversity={currentUniversity}
      />
      <CreateCampus
        open={createCampusVisible}
        setCreateVisible={setCreateCampusVisible}
        actionRef={actionRef}
        currentUniversity={currentUniversity}
      />
      <EditCampus
        open={editCampusVisible}
        setEditVisible={setEditCampusVisible}
        actionRef={actionRef}
        currentCampus={currentCampus}
      />
      <DeleteCampus
        open={deleteCampusVisible}
        setDeleteVisible={setDeleteCampusVisible}
        actionRef={actionRef}
        currentCampus={currentCampus}
      />
    </PageContainer>
  );
};
export default Community;
