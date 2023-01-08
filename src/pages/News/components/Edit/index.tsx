import { editNewInfo, fetchCurrentNewInfo } from '@/services/news';
import { DrawerForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Form } from 'antd';
import { useEffect } from 'react';

const Edit = ({ open, setEditVisible, actionRef, currentNew }: any) => {
  const [form] = Form.useForm();

  const handleEdit = async (value: any) => {
    const data = {
      ...value,
      id: currentNew,
      communityId: '637ce159b15d9764c31f9c84',
      avatars: ['https://static.xhpolaris.com/cat_world.jpg'],
    };
    const success = await editNewInfo(data);
    if (success) {
      setEditVisible(false);
      if (actionRef.current) {
        actionRef.current.reload();
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (currentNew) {
        const data = await fetchCurrentNewInfo({ momentId: currentNew });
        form.setFieldsValue(data?.moment);
      }
    })();
  }, [currentNew]);

  return (
    <DrawerForm
      title="编辑动态"
      width="600px"
      open={open}
      onOpenChange={setEditVisible}
      layout="horizontal"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 17 }}
      onFinish={handleEdit}
      form={form}
    >
      <ProFormText
        rules={[
          {
            required: true,
            message: '此条必填',
          },
        ]}
        name="title"
        label="标题"
      />
      <ProFormTextArea
        name="text"
        label="内容"
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

export default Edit;
