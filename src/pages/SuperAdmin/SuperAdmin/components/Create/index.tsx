import UserList from '@/components/UserList';
import UserSearch from '@/components/UserSearch';
import { createSuperAdmin } from '@/services/super-admin';
import { Modal } from 'antd';
import { useState } from 'react';

const Create = ({ open, setCreateVisible, actionRef }: any) => {
  const [users, setUsers] = useState([]);

  const handleCancel = () => {
    setCreateVisible(false);
  };
  // 弹出确认添加框
  // 添加成功后重新请求刷新 List
  const handleCreate = async (userId: string) => {
    const data = {
      userId: userId,
    };
    const success = await createSuperAdmin(data);
    if (success) {
      setCreateVisible(false);
      if (actionRef.current) {
        actionRef.current.reload();
      }
    }
  };

  return (
    <Modal title="新增超级管理员" width="600px" open={open} footer={null} onCancel={handleCancel}>
      <UserSearch setUsers={setUsers} />
      <UserList users={users} handleCreate={handleCreate} />
    </Modal>
  );
};

export default Create;
