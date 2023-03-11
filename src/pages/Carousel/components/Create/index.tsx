import UploadImagesFormItem from '@/components/UploadImagesFormItem';
import { createCarousel } from '@/services/carousel';
import { DrawerForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Form } from 'antd';

const Create = ({ open, setCreateVisible, actionRef }: any) => {
  const handleCreate = async (value: any) => {
    const data = {
      linkUrl: '',
      ...value,
      id: '',
      communityId: localStorage.getItem('communityId'),
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
      <ProFormText name="linkUrl" label="跳转链接" />
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
