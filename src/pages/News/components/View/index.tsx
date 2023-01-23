import PhotoAlbum from '@/components/PhotoAlbum';
import { formatTime } from '@/scripts/utils';
import { fetchCurrentNewInfo } from '@/services/news';
import { Avatar, Button, Descriptions, Modal, Space } from 'antd';
import { useEffect, useState } from 'react';

const View = ({ open, setViewVisible, currentNew }: any) => {
  const [data, setData] = useState<any>({});

  const handleOk = () => {
    setViewVisible(false);
  };

  const handleCancel = () => {
    setViewVisible(false);
  };

  useEffect(() => {
    if (open) {
      fetchCurrentNewInfo({ momentId: currentNew }).then((res) => setData(res));
    }
  }, [open]);

  const { moment = {} } = data;
  const { createAt, title, text, user = {}, photos } = moment;
  const { nickname, avatarUrl } = user;

  const footer = [
    <Button key="ok" type="primary" onClick={handleOk}>
      好的
    </Button>,
  ];

  return (
    <Modal title="动态详情" open={open} onCancel={handleCancel} footer={footer}>
      <Descriptions column={2}>
        <Descriptions.Item label="头像">
          <Avatar src={avatarUrl ?? ''} />
        </Descriptions.Item>
        <Descriptions.Item label="发布者">{nickname ?? ''}</Descriptions.Item>
        <Descriptions.Item label="发布时间">{formatTime(createAt ?? '')}</Descriptions.Item>
        <Descriptions.Item label="标题">{title ?? ''}</Descriptions.Item>
        <Descriptions.Item label="图片">
          <Space>
            <PhotoAlbum photos={photos} />
            <div>共 {photos?.length ?? ''} 张</div>
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="发布内容">{text ?? ''}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default View;
