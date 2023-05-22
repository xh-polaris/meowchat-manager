import { AVATAR_IMG, NAME } from '@/pages/commonSettings';

export const SUPER_ADMIN_COLUMNS = [
  {
    ...AVATAR_IMG,
    title: '头像',
  },
  {
    ...NAME,
    dataIndex: 'nickname',
  },
];
