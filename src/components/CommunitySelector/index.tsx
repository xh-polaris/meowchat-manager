import { findCommunityName } from '@/scripts/utils';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Card, Cascader, Space, Tooltip, Typography } from 'antd';
import { useEffect, useState } from 'react';

const { Text } = Typography;

// 遍历社区列表，生成级联选择器 options
const forEachCommunity = (community: any, options: any[]) => {
  const children: any[] = [];
  community.children.forEach((child: any) => {
    children.push({
      value: child.id,
      label: child.name,
    });
  });
  options.push({
    value: community.id,
    label: community.name,
    children: children,
  });
};

// 生成不同权限用户的级联选择器 options
const getOptions = (communityList: any, access: string) => {
  const options: any[] = [];
  if (access === 'communityAdmin') {
    const communityId = localStorage.getItem('communityId');
    communityList.forEach((community: any) => {
      if (community.id === communityId) {
        forEachCommunity(community, options);
      }
    });
  } else if (access === 'superAdmin') {
    communityList.forEach((community: any) => {
      forEachCommunity(community, options);
    });
  }
  return options;
};

const CommunitySelector = (props: any) => {
  const [currentCommunity, setCurrentCommunity] = useState<string>('');

  const { actionRef } = props;

  const communityList = JSON.parse(localStorage.getItem('communityList') || '');
  const access = localStorage.getItem('access') || '';

  const options = getOptions(communityList, access);

  useEffect(() => {
    const communityId = localStorage.getItem('communityId');
    let name = '';
    if (communityId) {
      name = findCommunityName(communityId);
    }
    setCurrentCommunity(name);
  }, []);

  const onChange = (value: any[]) => {
    const length = value.length;
    let name = '';
    if (length === 1) {
      for (let i = 0; i < options.length; i++) {
        const parent = options[i];
        if (parent.value === value[length - 1]) {
          name = parent.label;
        }
      }
    } else if (length === 2) {
      localStorage.setItem('communityId', value[length - 1]);
      for (let i = 0; i < options.length; i++) {
        const parent = options[i];
        if (parent.value === value[length - 1]) {
          name = parent.label;
        }
        if (parent.children) {
          for (let j = 0; j < parent.children.length; j++) {
            const children = parent.children[j];
            if (children.value === value[length - 1]) {
              name = children.label;
            }
          }
        }
      }
    }
    setCurrentCommunity(name);
    if (length === 2 && actionRef.current) {
      actionRef.current.reload();
    }
  };

  const toolTipInfo = (
    <span style={{ color: '#555555' }}>更改表格信息请选择二级社区，一级社区更改无效</span>
  );

  return (
    <Card
      title={
        <Space>
          社区选择
          <Tooltip title={toolTipInfo} color="#e9f6fe" placement="right">
            <ExclamationCircleOutlined
              style={{
                color: '#448ef7',
              }}
            />
          </Tooltip>
        </Space>
      }
      style={{
        marginBottom: 10,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '40%',
          }}
        >
          <Text strong>当前社区：{currentCommunity}</Text>
        </div>
        <Cascader
          options={options}
          onChange={onChange}
          changeOnSelect
          style={{
            width: '40%',
          }}
        />
      </div>
    </Card>
  );
};

export default CommunitySelector;
