import { createOrUpdateCommunity } from '@/services/community';
import { DrawerForm, ProFormTextArea } from '@ant-design/pro-components';

const CreateUniversity = ({ open, setCreateVisible, actionRef }: any) => {
  const handleCreate = async (newData: any) => {
    const data = {
      name: newData.university,
    };
    const success = await createOrUpdateCommunity(data);
    if (success) {
      setCreateVisible(false);
      if (actionRef.current) {
        actionRef.current.reload();
      }
    }
  };

  return (
    <DrawerForm
      title="新增学校"
      width="600px"
      open={open}
      onOpenChange={setCreateVisible}
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 19 }}
      onFinish={handleCreate}
    >
      <ProFormTextArea
        name="university"
        label="学校名"
        rules={[
          {
            required: true,
            message: '此条必填',
          },
        ]}
      />
    </DrawerForm>
  );
};

export default CreateUniversity;
