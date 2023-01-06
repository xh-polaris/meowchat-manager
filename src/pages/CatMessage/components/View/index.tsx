import { fetchCurrentCatInfo } from '@/services/cat';
import { Avatar, Descriptions, Modal } from 'antd';
import { useEffect, useState } from 'react';

const View = ({ open, setViewVisible, currentCat }: any) => {
  const [data, setData] = useState<any>({});

  const handleOk = () => {
    setViewVisible(false);
  };

  const handleCancel = () => {
    setViewVisible(false);
  };

  useEffect(() => {
    if (open) {
      fetchCurrentCatInfo({ catId: currentCat }).then((res) => setData(res));
    }
  }, [open]);

  const { cat = {} } = data;
  const { age, area, avatars, color, details, isSnipped, isSterilized, name, popularity, sex } =
    cat;

  return (
    <Modal title="猫咪详情" open={open} onOk={handleOk} onCancel={handleCancel}>
      <Descriptions>
        <Descriptions.Item label="缩略图">
          <Avatar src={avatars?.[0] ?? ''} />
        </Descriptions.Item>
        <Descriptions.Item label="昵称">{name ?? ''}</Descriptions.Item>
        <Descriptions.Item label="花色">{color ?? ''}</Descriptions.Item>
        <Descriptions.Item label="年龄">{age ?? ''}</Descriptions.Item>
        <Descriptions.Item label="性别">{sex ?? ''}</Descriptions.Item>
        <Descriptions.Item label="出没区域">{area ?? ''}</Descriptions.Item>
        <Descriptions.Item label="人气值">{popularity ?? ''}</Descriptions.Item>
        <Descriptions.Item label="是否绝育">{isSterilized ?? '' ? '是' : '否'}</Descriptions.Item>
        <Descriptions.Item label="是否剪耳">{isSnipped ?? '' ? '是' : '否'}</Descriptions.Item>
        <Descriptions.Item label="介绍">{details ?? ''}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default View;
