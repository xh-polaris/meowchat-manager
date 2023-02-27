import { createNotice } from '@/services/notice';
import { DrawerForm, ProFormTextArea } from '@ant-design/pro-components';

const Create = ({ open, setCreateVisible, actionRef }: any) => {
  const handleCreate = async (value: any) => {
    const data = {
      ...value,
      id: '',
      communityId: localStorage.getItem('communityId'),
    };
    const success = await createNotice(data);
    if (success) {
      setCreateVisible(false);
      if (actionRef.current) {
        actionRef.current.reload();
      }
    }
  };

  return (
    <DrawerForm
      title="新增公告"
      width="600px"
      open={open}
      onOpenChange={setCreateVisible}
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 19 }}
      onFinish={handleCreate}
    >
      <ProFormTextArea
        name="text"
        label="详细内容"
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

export default Create;
