import UploadImagesFormItem from '@/components/UploadImagesFormItem';
import { editCarousel } from '@/services/carousel';
import { DrawerForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Form, Radio } from 'antd';
import { useEffect } from 'react';

const Edit = ({ open, setEditVisible, actionRef, currentCarousel }: any) => {
  const [form] = Form.useForm();
  const access = localStorage.getItem('access');

  const handleEdit = async (value: any) => {
    const data = {
      linkUrl: '',
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
      <ProFormSelect
        rules={[
          {
            required: true,
            message: '此条必填',
          },
        ]}
        valueEnum={{
          article: '外部跳转',
          inner: '内部跳转',
          picture: '无跳转',
        }}
        name="type"
        label="公示类型"
      />
      {access === 'superAdmin' && (
        <Form.Item
          name="isPublic"
          label="是否全局"
          rules={[
            {
              required: true,
              message: '此条必填',
            },
          ]}
        >
          <Radio.Group
            options={[
              {
                label: '是',
                value: 1,
              },
              {
                label: '否',
                value: 0,
              },
            ]}
          />
        </Form.Item>
      )}
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
