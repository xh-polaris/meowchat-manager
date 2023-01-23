import type { ProColumns } from '@ant-design/pro-table';
import { formatTime } from '@/scripts/utils';
import { Avatar, Space } from 'antd';

export const OPERATIONS: ProColumns = {
  title: '操作',
  dataIndex: 'operations',
  hideInSearch: true,
};

export const NAME: ProColumns = {
  title: '昵称',
  dataIndex: 'name',
};

export const CREATE_AT: ProColumns = {
  title: '创建时间',
  dataIndex: 'createAt',
  hideInSearch: true,
  width: 100,
  renderText: (text) => <>{formatTime(text)}</>,
};

export const USER: ProColumns = {
  title: '发布者',
  dataIndex: 'user',
  hideInSearch: true,
  width: 120,
  render: (_: any) => (
    <Space>
      <Avatar src={_?.avatarUrl} size={30}></Avatar>
      {_?.nickname}
    </Space>
  ),
};
