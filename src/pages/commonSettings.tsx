import type { ProColumns } from '@ant-design/pro-table';
import { formatTime } from '@/scripts/utils';

export const CREATE_BY: ProColumns = {
  title: '创建人',
  dataIndex: 'create_by',
  hideInSearch: true,
};

export const UPDATE_BY: ProColumns = {
  title: '更新人',
  dataIndex: 'update_by',
  hideInSearch: true,
};

export const OPERATIONS: ProColumns = {
  title: '操作',
  dataIndex: 'operations',
  hideInSearch: true,
};

export const NAME: ProColumns = {
  title: '昵称',
  dataIndex: 'name',
};

export const CONTENT_COLLECT: ProColumns = {
  title: '发布内容',
  dataIndex: 'content_collect',
  hideInSearch: true,
};

export const DATE_AT: ProColumns = {
  title: '日期',
  dataIndex: 'date_at',
  hideInSearch: true,
  renderText: (text) => formatTime(text),
};

export const CAT_STATUS: ProColumns = {
  title: '猫咪状态',
  dataIndex: 'cat_status',
};
