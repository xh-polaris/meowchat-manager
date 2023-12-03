import { NAME, USER } from '@/pages/commonSettings';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { Progress, Tag } from 'antd';

const MAX_ORDER = 10;

export const transferType = (type: number) => {
  let newType;
  switch (type) {
    case 0:
      newType = '其他';
      break;
    case 1:
      newType = '绝育计划';
      break;
    case 2:
      newType = '生理健康';
      break;
    case 3:
      newType = '零食奖励';
      break;
    case 4:
      newType = '物资补给';
      break;
    default:
      newType = '';
  }
  return newType;
};

export const PLAN_COLOR = new Map([
  [0, '#108ee9'],
  [1, '#f50'],
  [2, '#87d068'],
  [3, 'default'],
]);

export const PLAN_STATE_MAP = new Map([
  [
    0,
    <Tag color="warning" icon={<ExclamationCircleOutlined />}>
      未知
    </Tag>,
  ],
  [
    1,
    <Tag color="default" icon={<ClockCircleOutlined />}>
      募集中
    </Tag>,
  ],
  [
    2,
    <Tag color="processing" icon={<SyncOutlined spin />}>
      执行中
    </Tag>,
  ],
  [
    3,
    <Tag color="success" icon={<CheckCircleOutlined />}>
      已完成
    </Tag>,
  ],
]);

export const PLAN_TYPE: ProColumns = {
  title: '计划类型',
  dataIndex: 'planType',
  hideInSearch: true,
  render: (_: any) => <Tag color={PLAN_COLOR.get(_)}>{transferType(_)}</Tag>,
};

export const PLAN_PROGRESS: ProColumns = {
  title: '小鱼干进度',
  dataIndex: 'planType',
  hideInSearch: true,
  render: (_, record) => (
    <div style={{ paddingRight: 20 }}>
      <Progress percent={(record.nowFish / record.maxFish) * 100} size="small" showInfo={false} />
      {`${record.nowFish} / ${record.maxFish}`}
    </div>
  ),
};

export const PLAN_STATE: ProColumns = {
  title: '计划状态',
  dataIndex: 'planState',
  hideInSearch: true,
  render: (_: any) => PLAN_STATE_MAP.get(_),
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
    width: 80,
  },
  {
    order: MAX_ORDER + 4,
    ...PLAN_PROGRESS,
    width: 180,
  },
  {
    order: MAX_ORDER + 2,
    ...PLAN_STATE,
    width: 180,
  },
  {
    order: MAX_ORDER,
    ...USER,
    width: 100,
  },
];
