import { AVATAR_IMG, NAME } from '@/pages/commonSettings';
import { ProColumns } from '@ant-design/pro-components';

const MAX_ORDER = 10;

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

export const CAT_COLUMNS = [
  {
    order: MAX_ORDER + 10,
    ...AVATAR_IMG,
    width: 80,
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
