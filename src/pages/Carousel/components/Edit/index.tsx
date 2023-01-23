import UploadImagesFormItem from '@/components/UploadImagesFormItem';
import { editCarousel } from '@/services/carousel';
import { DrawerForm, ProFormText } from '@ant-design/pro-components';
import { Form } from 'antd';
import { useEffect } from 'react';

const Edit = ({ open, setEditVisible, actionRef, currentCarousel }: any) => {
  const [form] = Form.useForm();

  const handleEdit = async (value: any) => {
    const data = {
      ...value,
      id: currentCarousel?.id,
      communityId: '',
      imageUrl: value?.imageUrl?.[0],
    };
    const success = await editCarousel(data);
    if (success) {
      setEditVisible(false);
      if (actionRef.current) {
        actionRef.current.reload();
      }
    }
  };

  useEffect(() => {
    if (currentCarousel) {
      const formData = {
        ...currentCarousel,
        imageUrl: [currentCarousel?.imageUrl],
      };
      form.setFieldsValue(formData);
    }
  }, [currentCarousel]);

  return (
    <DrawerForm
      title="编辑轮播图"
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
        name="linkUrl"
        label="跳转链接"
      />
      <ProFormText
        rules={[
          {
            required: true,
            message: '此条必填',
          },
        ]}
        name="type"
        label="公示类型"
      />
      <Form.Item
        name="imageUrl"
        label="图片"
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
