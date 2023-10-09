import type { ProColumns } from '@ant-design/pro-components';
import { Tag } from 'antd';
import { TEXT, USER } from '../../commonSettings';

const MAX_ORDER = 10;

export const TITLE: ProColumns = {
  title: '标题',
  dataIndex: 'title',
  width: 120,
};

export const IS_OFFICIAL: ProColumns = {
  title: '发布方',
  dataIndex: 'isOfficial',
  hideInSearch: true,
  width: 120,
  render: (_: any) => (
    <>{_ === true ? <Tag color="red">官方</Tag> : <Tag color="default">非官方</Tag>}</>
  ),
};

export const POSTS_COLUMNS = [
  {
    order: MAX_ORDER + 10,
    ...USER,
  },
  {
    order: MAX_ORDER + 8,
    ...TITLE,
  },
  {
    order: MAX_ORDER + 6,
    ...IS_OFFICIAL,
  },
  {
    order: MAX_ORDER + 4,
    ...TEXT,
  },
];
