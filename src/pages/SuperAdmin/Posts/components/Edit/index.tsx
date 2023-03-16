import UploadImagesFormItem from '@/components/UploadImagesFormItem';
import { getPostDetail } from '@/services/posts';
import { DrawerForm, ProFormRadio, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Form } from 'antd';
import { useEffect } from 'react';
import { newPost } from '@/services/posts';

const Edit = ({ open, setEditVisible, actionRef, currentPost }: any) => {
  const [form] = Form.useForm();

  const handleEdit = async (value: any) => {
    const tags = [];
    if (value.tag1 !== undefined) tags.push(value.tag1);
    if (value.tag2 !== undefined) tags.push(value.tag2);
    if (value.tag3 !== undefined) tags.push(value.tag3);
    if (value.tag4 !== undefined) tags.push(value.tag4);
    if (value.tag5 !== undefined) tags.push(value.tag5);
    const data = {
      title: value.title,
      text: value.text,
      isOfficial: value.isOfficial,
      coverUrl: undefined,
      tags: tags,
      id: '',
    };
    if (value.photos !== undefined) data.coverUrl = value.photos[0];
    const success = await newPost(data);
    if (success) {
      setEditVisible(false);
      if (actionRef.current) {
        actionRef.current.reload();
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (currentPost) {
        const data = await getPostDetail({ postId: currentPost });
        const post = data.post;
        // eslint-disable-next-line prefer-const
        let tags = [undefined, undefined, undefined, undefined, undefined];
        if (post.tags) {
          post.tags.map((tag: string, index: number) => {
            // @ts-ignore
            tags[index] = tag;
          });
        }
        const fieldsValue = {
          title: post.title,
          isOfficial: post.isOfficial,
          text: post.text,
          photos: [post.coverUrl],
          tag1: tags[0],
          tag2: tags[1],
          tag3: tags[2],
          tag4: tags[3],
          tag5: tags[4],
        };
        form.setFieldsValue(fieldsValue);
      }
    })();
  }, [currentPost]);

  return (
    <DrawerForm
      title="编辑帖子"
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
      <ProFormRadio.Group
        rules={[
          {
            required: true,
            message: '此条必填',
          },
        ]}
        name="isOfficial"
        label="是否官方"
        options={[
          {
            label: '是',
            value: true,
          },
          {
            label: '否',
            value: false,
          },
        ]}
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

export default Edit;
