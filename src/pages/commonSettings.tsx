import type { ProColumns } from '@ant-design/pro-table';
import { formatTime } from '@/scripts/utils';
import { Avatar, Space } from 'antd';
import Unfold from '@/components/Unfold';

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

export const AVATAR_IMG: ProColumns = {
  title: '缩略图',
  dataIndex: 'avatarUrl',
  hideInSearch: true,
  render: (_) => <Avatar src={_} size={40}></Avatar>,
};

export const TEXT: ProColumns = {
  title: '发布内容',
  dataIndex: 'text',
  hideInSearch: true,
  width: 400,
  render: (_: any) => <Unfold text={_} limit={50}></Unfold>,
};
