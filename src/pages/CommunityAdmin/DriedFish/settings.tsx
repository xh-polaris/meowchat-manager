import { NAME, USER } from '@/pages/commonSettings';
import type { ProColumns } from '@ant-design/pro-components';
import { Progress, Tag } from 'antd';

const MAX_ORDER = 10;

const transferType = (type: number) => {
  let newType;
  switch (type) {
    case 0:
      newType = '加餐';
      break;
    case 1:
      newType = '绝育';
      break;
    case 2:
      newType = '治病';
      break;
    case 3:
      newType = '其他';
      break;
    default:
      newType = '';
  }
  return newType;
};

const PLAN_COLOR = new Map([
  [0, '#108ee9'],
  [1, '#f50'],
  [2, '#87d068'],
  [3, 'default'],
]);

export const PLAN_TYPE: ProColumns = {
  title: '计划类型',
  dataIndex: 'planType',
  hideInSearch: true,
  render: (_: any) => <Tag color={PLAN_COLOR.get(_)}>{transferType(_)}</Tag>,
};

export const PLAN_PROGRESS: ProColumns = {
  title: '计划进度',
  dataIndex: 'planType',
  hideInSearch: true,
  render: (_, record) => (
    <div style={{ paddingRight: 20 }}>
      <Progress percent={record.nowFish / record.maxFish} size="small" />
    </div>
  ),
};

export const CAROUSEL_COLUMNS = [
  {
    order: MAX_ORDER + 8,
    ...NAME,
    title: '计划名',
    width: 80,
  },
  {
    order: MAX_ORDER + 6,
    ...PLAN_TYPE,
    width: 50,
  },
  {
    order: MAX_ORDER + 4,
    ...PLAN_PROGRESS,
    width: 180,
  },
  {
    order: MAX_ORDER + 2,
    ...USER,
    width: 100,
  },
];
