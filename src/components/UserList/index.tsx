import { findCommunityName } from '@/scripts/utils';
import { Avatar, Button, List, Space, Tag } from 'antd';

interface Roles {
  roleType?: number;
  communityId?: string;
}

const switchRoleTag = (roles: Roles) => {
  let roleType = 1,
    communityId = '';
  let tag;

  if (roles) {
    if (roles?.[0].roleType === 4) {
      roleType = roles?.[1]?.roleType;
      if (roleType === 2) {
        communityId = roles?.[1]?.communityId;
      }
    } else {
      roleType = roles?.[0]?.roleType;
      if (roleType === 2) {
        communityId = roles?.[0]?.communityId;
      }
    }
  }

  switch (roleType) {
    case 3:
      tag = <Tag color="red">超级管理员</Tag>;
      break;
    case 2:
      tag = (
        <>
          <Tag color="green">社区管理员</Tag>
          <Tag color="green">{findCommunityName(communityId)}</Tag>
        </>
      );
      break;
    case 1:
      tag = <Tag color="blue">普通用户</Tag>;
      break;
    default:
      tag = <></>;
  }
  return tag;
};

const UserList = (props: any) => {
  const { users: data = [], handleCreate, type } = props;

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={data}
        pagination={{
          position: 'bottom',
          pageSize: 5,
        }}
        renderItem={(item: any) => (
          <List.Item
            actions={[
              <Button
                type="primary"
                key="super-admin"
                onClick={() => handleCreate(item?.id)}
                disabled={
                  (type === '超级' && item?.roles?.find((value: any) => value.roleType === 3)) ||
                  (type === '社区' && item?.roles?.find((value: any) => value.roleType === 2))
                }
              >
                添加为{type}管理员
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item?.avatarUrl} />}
              title={
                <Space>
                  <div>{item?.nickname}</div>
                  {switchRoleTag(item?.roles)}
                </Space>
              }
              description={<>用户ID: {item?.id}</>}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default UserList;
