import { deletePlan } from '@/services/dried-fish';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Space } from 'antd';

const Delete = ({ open, setDeleteVisible, actionRef, currentDriedFish }: any) => {
  const handleDelete = async () => {
    const success = await deletePlan({ planId: currentDriedFish });
    if (success) {
      setDeleteVisible(false);
      if (actionRef.current) {
        actionRef.current.reload();
      }
    }
  };

  const handleCancel = () => {
    setDeleteVisible(false);
  };

  return (
    <Modal
      title={
        <Space>
          <ExclamationCircleOutlined />
          删除小鱼干计划
        </Space>
      }
      open={open}
      okText="确认"
      okType="danger"
      cancelText="取消"
      centered
      onOk={handleDelete}
      onCancel={handleCancel}
    >
      确定删除这条小鱼干计划吗？
    </Modal>
  );
};

export default Delete;
