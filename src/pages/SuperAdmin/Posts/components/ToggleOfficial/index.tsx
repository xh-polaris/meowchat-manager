import { setOfficial } from '@/services/posts';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Space } from 'antd';

const ToggleOfficial = ({ open, setToggleOfficialVisible, actionRef, currentPost, data }: any) => {
  const handleDelete = async () => {
    const success = await setOfficial({ postId: currentPost, isRemove: data.isOfficial });
    if (success) {
      setToggleOfficialVisible(false);
      if (actionRef.current) {
        actionRef.current.reload();
      }
    }
  };

  const handleCancel = () => {
    setToggleOfficialVisible(false);
  };

  return (
    <Modal
      title={
        <Space>
          <ExclamationCircleOutlined />
          <span>{data.isOfficial ? '不' : ''}设为官方</span>
        </Space>
      }
      open={open}
      okText="确认"
      cancelText="取消"
      centered
      onOk={handleDelete}
      onCancel={handleCancel}
    >
      确定将这条帖子{data.isOfficial ? '不' : ''}设为官方吗？
    </Modal>
  );
};

export default ToggleOfficial;
