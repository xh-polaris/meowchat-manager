import { createOrUpdateCommunity } from '@/services/community';
import { DrawerForm, ProFormTextArea } from '@ant-design/pro-components';

const CreateCampus = ({ open, setCreateVisible, actionRef, currentUniversity }: any) => {
  const handleCreate = async (newData: any) => {
    const data = {
      name: newData.campus,
      parentId: currentUniversity.id,
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
      title="新增校区"
      width="600px"
      open={open}
      onOpenChange={setCreateVisible}
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 19 }}
      onFinish={handleCreate}
    >
      <ProFormTextArea
        name="campus"
        label="校区名"
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

export default CreateCampus;
