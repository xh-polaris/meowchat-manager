import PhotoAlbum from '@/components/PhotoAlbum';
import { fetchCurrentDriedFish } from '@/services/dried-fish';
import { Avatar, Button, Descriptions, Modal, Space, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { PLAN_COLOR, PLAN_STATE_MAP, transferType } from '../../settings';
import { formatTime } from '@/scripts/utils';

const View = ({ open, setViewVisible, currentDriedFish }: any) => {
  const [data, setData] = useState<any>({});

  const handleOk = () => {
    setViewVisible(false);
  };

  const handleCancel = () => {
    setViewVisible(false);
  };

  const { plan = {} } = data;
  const {
    name,
    coverUrl,
    description,
    planType,
    instruction,
    startTime,
    endTime,
    cat,
    user = {},
    imageUrls,
    createAt,
    maxFish,
    nowFish,
    summary,
    planState,
  } = plan;
  const { nickname, avatarUrl } = user;
  const { avatars: catAvatar, name: catName } = cat || {};

  useEffect(() => {
    if (open) {
      fetchCurrentDriedFish({ planId: currentDriedFish }).then((res) => setData(res));
    }
  }, [open]);

  const footer = [
    <Button key="ok" type="primary" onClick={handleOk}>
      好的
    </Button>,
  ];

  return (
    <Modal title="小鱼干计划详情" open={open} onCancel={handleCancel} footer={footer}>
      <Descriptions column={2}>
        <Descriptions.Item label="计划名">{name ?? ''}</Descriptions.Item>
        <Descriptions.Item label="发起人">
          <Space>
            <Avatar src={avatarUrl ?? ''} size={30}></Avatar>
            {nickname ?? ''}
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="计划类型">
          {<Tag color={PLAN_COLOR.get(planType)}>{transferType(planType)}</Tag> ?? ''}
        </Descriptions.Item>
        <Descriptions.Item label="目标猫咪">
          {catName ? (
            <Space>
              <Avatar src={catAvatar?.[0] ?? ''} size={30}></Avatar>
              {catName ?? ''}
            </Space>
          ) : (
            <>暂无</>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="开始时间">{formatTime(startTime) ?? ''}</Descriptions.Item>
        <Descriptions.Item label="结束时间">{formatTime(endTime) ?? ''}</Descriptions.Item>
        <Descriptions.Item label="创建时间">{formatTime(createAt) ?? ''}</Descriptions.Item>
        <Descriptions.Item label="小鱼干进度">
          <span style={{ color: 'red' }}>
            {nowFish ?? ''}/{maxFish ?? ''}
          </span>
        </Descriptions.Item>
        <Descriptions.Item label="计划状态" span={2}>
          {PLAN_STATE_MAP.get(planState) ?? ''}
        </Descriptions.Item>
        <Descriptions.Item label="计划详情" span={2}>
          {description ?? ''}
        </Descriptions.Item>
        <Descriptions.Item label="计划封面图" span={2}>
          <PhotoAlbum photos={[coverUrl]} />
        </Descriptions.Item>
        <Descriptions.Item label="执行说明" span={2}>
          {instruction ? instruction : <>暂无</>}
        </Descriptions.Item>
        <Descriptions.Item label="执行返图" span={2}>
          {imageUrls?.length ? (
            <Space>
              <PhotoAlbum photos={imageUrls} />
              <div>共 {imageUrls?.length ?? ''} 张</div>
            </Space>
          ) : (
            <>暂无</>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="计划总结" span={2}>
          {summary ? summary : <>暂无</>}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default View;
