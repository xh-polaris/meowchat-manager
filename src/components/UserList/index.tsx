import { findCommunityName } from '@/scripts/utils';
import { Avatar, Button, List, Space, Tag } from 'antd';

const switchRoleTag = (roleType = '', communityId = '') => {
  let tag;
  switch (roleType) {
    case 'superAdmin':
      tag = <Tag color="red">超级管理员</Tag>;
      break;
    case 'communityAdmin':
      tag = (
        <>
          <Tag color="green">社区管理员</Tag>
          <Tag color="green">{findCommunityName(communityId)}</Tag>
        </>
      );
      break;
    case '':
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
                onClick={() => handleCreate(item?.user.id)}
                disabled={item?.roles?.[0]?.roleType === 'superAdmin'}
              >
                添加为{type}管理员
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item?.user.avatarUrl} />}
              title={
                <Space>
                  <div>{item?.user.nickname}</div>
                  {switchRoleTag(item?.roles?.[0]?.roleType)}
                </Space>
              }
              description={<>用户ID: {item?.user.id}</>}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default UserList;
