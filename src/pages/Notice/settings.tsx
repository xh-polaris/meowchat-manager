import { CREATE_AT, USER } from '@/pages/commonSettings';
import { ProColumns } from '@ant-design/pro-components';

const MAX_ORDER = 10;

export const TEXT: ProColumns = {
  title: '详细内容',
  dataIndex: 'text',
  hideInSearch: true,
  width: 200,
};

export const NOTICE_COLUMNS = [
  {
    order: MAX_ORDER + 10,
    ...USER,
  },
  {
    order: MAX_ORDER + 8,
    ...TEXT,
  },
  {
    order: MAX_ORDER + 6,
    ...CREATE_AT,
  },
];
