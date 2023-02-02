import { NAME } from '@/pages/commonSettings';
import { ProColumns } from '@ant-design/pro-components';
import { Avatar } from 'antd';

const MAX_ORDER = 10;

export const AVATAR_IMG: ProColumns = {
  title: '缩略图',
  dataIndex: 'avatarUrl',
  hideInSearch: true,
  width: 80,
  render: (_) => <Avatar src={_} size={40}></Avatar>,
};

export const COLOR: ProColumns = {
  title: '花色',
  dataIndex: 'color',
  width: 80,
  hideInSearch: true,
};

export const AREA: ProColumns = {
  title: '出没区域',
  dataIndex: 'area',
  width: 200,
};

export const CAT_MESSAGE_COLUMNS = [
  {
    order: MAX_ORDER + 10,
    ...AVATAR_IMG,
  },
  {
    order: MAX_ORDER + 8,
    ...NAME,
    width: 80,
  },
  {
    order: MAX_ORDER + 6,
    ...COLOR,
  },
  {
    order: MAX_ORDER + 4,
    ...AREA,
  },
];
