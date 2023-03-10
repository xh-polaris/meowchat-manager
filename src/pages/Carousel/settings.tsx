import { ProColumns } from '@ant-design/pro-components';
import { Image } from 'antd';

const MAX_ORDER = 10;

const transferType = (type: string) => {
  let newType;
  switch (type) {
    case 'article':
      newType = '外部跳转';
      break;
    case 'inner':
      newType = '内部跳转';
      break;
    case 'picture':
      newType = '无跳转';
      break;
    default:
      newType = '';
  }
  return newType;
};

export const IMAGE_URL: ProColumns = {
  title: '图片',
  dataIndex: 'imageUrl',
  hideInSearch: true,
  width: 200,
  render: (_: any) => <Image src={_} />,
};

export const LINK_URL: ProColumns = {
  title: '跳转链接',
  dataIndex: 'linkUrl',
  hideInSearch: true,
  width: 100,
  render: (_: any) => (
    <a href={_} target="_blank" rel="noreferrer">
      点击跳转
    </a>
  ),
};

export const TYPE: ProColumns = {
  title: '公示类型',
  dataIndex: 'type',
  hideInSearch: true,
  width: 80,
  tooltip: '外部跳转链接请联系管理团队认证域名',
  render: (_: any) => <>{transferType(_)}</>,
};

export const CAROUSEL_COLUMNS = [
  {
    order: MAX_ORDER + 8,
    ...IMAGE_URL,
  },
  {
    order: MAX_ORDER + 6,
    ...LINK_URL,
  },
  {
    order: MAX_ORDER + 4,
    ...TYPE,
  },
];
