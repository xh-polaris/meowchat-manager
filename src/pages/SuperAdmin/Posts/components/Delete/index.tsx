import { deletePost } from '@/services/posts';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Space } from 'antd';

const Delete = ({ open, setDeleteVisible, actionRef, currentPost }: any) => {
  const handleDelete = async () => {
    const success = await deletePost({ id: currentPost });
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
          删除帖子
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
      确定删除这条帖子吗？
    </Modal>
  );
};

export default Delete;
