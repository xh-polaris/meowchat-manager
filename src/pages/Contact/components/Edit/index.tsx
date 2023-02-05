import UploadImagesFormItem from '@/components/UploadImagesFormItem';
import { editContact } from '@/services/contact';
import { DrawerForm, ProFormText } from '@ant-design/pro-components';
import { Form } from 'antd';
import { useEffect } from 'react';

const Edit = ({ open, setEditVisible, actionRef, currentContact }: any) => {
  const [form] = Form.useForm();

  const handleEdit = async (value: any) => {
    const data = {
      ...value,
      id: currentContact.id,
      communityId: '637ce159b15d9764c31f9c84',
    };
    const success = await editContact(data);
    if (success) {
      setEditVisible(false);
      if (actionRef.current) {
        actionRef.current.reload();
      }
    }
  };

  useEffect(() => {
    if (currentContact) {
      const newCurrentContact = {
        ...currentContact,
        avatarUrl: [currentContact.avatarUrl],
      };
      form.setFieldsValue(newCurrentContact);
    }
  }, [currentContact]);

  return (
    <DrawerForm
      title="编辑联系人"
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
        name="name"
        label="名字"
      />
      <ProFormText
        rules={[
          {
            required: true,
            message: '此条必填',
          },
        ]}
        name="wechat"
        label="微信号"
      />
      <ProFormText
        rules={[
          {
            required: true,
            message: '此条必填',
          },
        ]}
        name="phone"
        label="手机号"
      />
      <ProFormText
        rules={[
          {
            required: true,
            message: '此条必填',
          },
        ]}
        name="title"
        label="头衔"
      />
      <Form.Item
        name="avatarUrl"
        label="头像"
        rules={[
          {
            required: true,
            message: '此条必填',
          },
        ]}
      >
        <UploadImagesFormItem limit={1} />
      </Form.Item>
    </DrawerForm>
  );
};

export default Edit;
