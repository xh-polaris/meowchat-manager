import { deleteCommunityAdmin } from '@/services/community-admin';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Space } from 'antd';

const Delete = ({ open, setDeleteVisible, actionRef, currentId }: any) => {
  const handleDelete = async () => {
    const success = await deleteCommunityAdmin({
      id: currentId,
    });
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
          取消超级管理员
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
      确定取消其超级管理员身份吗？
    </Modal>
  );
};

export default Delete;
