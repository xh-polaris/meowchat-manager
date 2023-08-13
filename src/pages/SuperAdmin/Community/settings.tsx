import type { ProColumns } from '@ant-design/pro-components';

export const UNIVERSITY: ProColumns = {
  title: '学校',
  dataIndex: 'university',
};

export const COMMUNITY_COLUMNS = [
  {
    order: 1,
    ...UNIVERSITY,
  },
];
