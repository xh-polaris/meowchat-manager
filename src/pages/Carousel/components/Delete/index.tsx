import { deleteCarousel } from '@/services/carousel';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Space } from 'antd';

const Delete = ({ open, setDeleteVisible, actionRef, currentCarousel }: any) => {
  const handleDelete = async () => {
    const success = await deleteCarousel({ id: currentCarousel?.id });
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
          删除轮播图
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
      确定删除这张轮播图吗？
    </Modal>
  );
};

export default Delete;
