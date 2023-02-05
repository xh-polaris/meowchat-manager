import { AVATAR_IMG, NAME } from '@/pages/commonSettings';
import { ProColumns } from '@ant-design/pro-components';

const MAX_ORDER = 10;

export const WECHAT: ProColumns = {
  title: '微信号',
  dataIndex: 'wechat',
  width: 100,
  hideInSearch: true,
};

export const PHONE: ProColumns = {
  title: '手机号',
  dataIndex: 'phone',
  width: 100,
  hideInSearch: true,
};

export const TITLE: ProColumns = {
  title: '头衔',
  dataIndex: 'title',
  width: 200,
  hideInSearch: true,
};

export const CONTACT_COLUMNS = [
  {
    order: MAX_ORDER + 10,
    ...AVATAR_IMG,
    title: '头像',
    width: 60,
  },
  {
    order: MAX_ORDER + 8,
    ...NAME,
    title: '名字',
    hideInSearch: true,
    width: 100,
  },
  {
    order: MAX_ORDER + 6,
    ...WECHAT,
  },
  {
    order: MAX_ORDER + 4,
    ...PHONE,
  },
  {
    order: MAX_ORDER + 2,
    ...TITLE,
  },
];
