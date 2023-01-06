import { NAME } from '@/pages/commonSettings';
import { ProColumns } from '@ant-design/pro-components';
import { Avatar, Badge, Space } from 'antd';

const MAX_ORDER = 10;

export const AVATAR_IMG: ProColumns = {
  title: '缩略图',
  dataIndex: 'avatarUrl',
  hideInSearch: true,
  render: (_) => <Avatar src={_} size={40}></Avatar>,
};

export const COLOR: ProColumns = {
  title: '花色',
  dataIndex: 'color',
  hideInSearch: true,
};

export const AREA: ProColumns = {
  title: '出没区域',
  dataIndex: 'area',
};

export const IS_COLLECTED: ProColumns = {
  title: '是否收录',
  dataIndex: 'isCollected',
  hideInSearch: true,
  render: (_) => (
    <Space>
      <Badge status={_ ? 'success' : 'error'} text={_ ? '是' : '否'} />
    </Space>
  ),
};

export const CAT_MESSAGE_COLUMNS = [
  {
    order: MAX_ORDER + 10,
    ...AVATAR_IMG,
  },
  {
    order: MAX_ORDER + 8,
    ...NAME,
  },
  {
    order: MAX_ORDER + 6,
    ...COLOR,
  },
  {
    order: MAX_ORDER + 4,
    ...AREA,
  },
  //   {
  //     order: MAX_ORDER + 2,
  //     ...IS_COLLECTED,
  //   },
];
