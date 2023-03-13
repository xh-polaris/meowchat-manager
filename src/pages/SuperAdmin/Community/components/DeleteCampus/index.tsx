import { deleteCommunity } from '@/services/community';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Space } from 'antd';

const DeleteCampus = ({ open, setDeleteVisible, actionRef, currentCampus }: any) => {
  const handleDelete = async () => {
    const success = await deleteCommunity({ id: currentCampus.id });
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
          删除校区
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
      确定删除该校区吗？
    </Modal>
  );
};

export default DeleteCampus;
