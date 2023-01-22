import PhotoAlbum from '@/components/ PhotoAlbum';
import { ProColumns } from '@ant-design/pro-components';
import { Avatar, Space } from 'antd';

const MAX_ORDER = 10;

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

export const TITLE: ProColumns = {
  title: '标题',
  dataIndex: 'title',
  width: 120,
};

export const TEXT: ProColumns = {
  title: '发布内容',
  dataIndex: 'text',
  hideInSearch: true,
  width: 400,
};

export const PHOTOS: ProColumns = {
  title: '图片',
  dataIndex: 'photos',
  hideInSearch: true,
  width: 200,
  render: (_: any) => (
    <Space>
      <PhotoAlbum photos={_} />
      <div>共 {_?.length ?? ''} 张</div>
    </Space>
  ),
};

export const NEWS_COLUMNS = [
  {
    order: MAX_ORDER + 10,
    ...USER,
  },
  {
    order: MAX_ORDER + 8,
    ...TITLE,
  },
  {
    order: MAX_ORDER + 4,
    ...TEXT,
  },
  {
    order: MAX_ORDER + 2,
    ...PHOTOS,
  },
];
