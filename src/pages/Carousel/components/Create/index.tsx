import UploadImagesFormItem from '@/components/UploadImagesFormItem';
import { createCarousel } from '@/services/carousel';
import { DrawerForm, ProFormText } from '@ant-design/pro-components';
import { Form } from 'antd';

const Create = ({ open, setCreateVisible, actionRef }: any) => {
  const handleCreate = async (value: any) => {
    const data = {
      ...value,
      id: '',
      communityId: '637ce159b15d9764c31f9c84',
      imageUrl: value?.imageUrl?.[0],
    };
    const success = await createCarousel(data);
    if (success) {
      setCreateVisible(false);
      if (actionRef.current) {
        actionRef.current.reload();
      }
    }
  };

  return (
    <DrawerForm
      title="新增轮播图"
      width="600px"
      open={open}
      onOpenChange={setCreateVisible}
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 19 }}
      onFinish={handleCreate}
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

export default Create;
