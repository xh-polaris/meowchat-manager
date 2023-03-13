import PhotoAlbum from '@/components/PhotoAlbum';
import { formatTime } from '@/scripts/utils';
import { getPostDetail } from '@/services/posts';
import { Avatar, Button, Descriptions, Modal, Space } from 'antd';
import { useEffect, useState } from 'react';

const View = ({ open, setViewVisible, currentPost }: any) => {
  const [data, setData] = useState<any>({});

  const handleOk = () => {
    setViewVisible(false);
  };

  const handleCancel = () => {
    setViewVisible(false);
  };

  useEffect(() => {
    if (open) {
      getPostDetail({ postId: currentPost }).then((res) => setData(res));
    }
  }, [open]);

  const { post = {} } = data;
  const { createAt, title, text, user = {}, coverUrl } = post;
  const { nickname, avatarUrl } = user;

  const footer = [
    <Button key="ok" type="primary" onClick={handleOk}>
      好的
    </Button>,
  ];

  return (
    <Modal title="帖子详情" open={open} onCancel={handleCancel} footer={footer}>
      <Descriptions column={2}>
        <Descriptions.Item label="头像">
          <Avatar src={avatarUrl ?? ''} />
        </Descriptions.Item>
        <Descriptions.Item label="发布者">{nickname ?? ''}</Descriptions.Item>
        <Descriptions.Item label="发布时间">{formatTime(createAt ?? '')}</Descriptions.Item>
        <Descriptions.Item label="标题">{title ?? ''}</Descriptions.Item>
        <Descriptions.Item label="封面">
          {coverUrl === '' ? (
            <div>无</div>
          ) : (
            <Space>
              <PhotoAlbum photos={[coverUrl]} />
            </Space>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="发布内容">{text ?? ''}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default View;
