import UploadImagesFormItem from '@/components/UploadImagesFormItem';
import { newPost } from '@/services/posts';
import { DrawerForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Form } from 'antd';

const Create = ({ open, setCreateVisible, actionRef }: any) => {
  const handleCreate = async (value: any) => {
    // 太晚了 后面再查这个有什么其他办法做。。。
    const tags = [];
    if (value.tag1 !== undefined) tags.push(value.tag1);
    if (value.tag2 !== undefined) tags.push(value.tag2);
    if (value.tag3 !== undefined) tags.push(value.tag3);
    if (value.tag4 !== undefined) tags.push(value.tag4);
    if (value.tag5 !== undefined) tags.push(value.tag5);
    const data = {
      title: value.title,
      text: value.text,
      coverUrl: undefined,
      tags: tags,
      id: '',
    };
    if (value.photos !== undefined) data.coverUrl = value.photos[0];
    const success = await newPost(data);
    if (success) {
      setCreateVisible(false);
      if (actionRef.current) {
        actionRef.current.reload();
      }
    }
  };

  return (
    <DrawerForm
      title="新增帖子"
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
        name="title"
        label="标题"
      />
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
      <Form.Item name="photos" label="封面">
        <UploadImagesFormItem limit={1} />
      </Form.Item>
      <Form.Item name="tags" label="标签">
        <ProFormText name="tag1" label="1" />
        <ProFormText name="tag2" label="2" />
        <ProFormText name="tag3" label="3" />
        <ProFormText name="tag4" label="4" />
        <ProFormText name="tag5" label="5" />
      </Form.Item>
    </DrawerForm>
  );
};

export default Create;
