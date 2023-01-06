import { createCatInfo } from '@/services/cat';
import {
  DrawerForm,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';

const Create = ({ open, setCreateVisible, actionRef }: any) => {
  const handleCreate = async (value: any) => {
    const data = {
      ...value,
      id: '',
      communityId: '637ce159b15d9764c31f9c84',
      avatars: ['https://static.xhpolaris.com/cat_world.jpg'],
    };
    const success = await createCatInfo(data);
    if (success) {
      setCreateVisible(false);
      if (actionRef.current) {
        actionRef.current.reload();
      }
    }
  };

  return (
    <DrawerForm
      title="新增猫咪"
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
        name="name"
        label="昵称"
      />
      <ProFormText
        rules={[
          {
            required: true,
            message: '此条必填',
          },
        ]}
        name="color"
        label="花色"
      />
      <ProFormText
        rules={[
          {
            required: true,
            message: '此条必填',
          },
        ]}
        name="age"
        label="年龄"
      />
      <ProFormSelect
        name="sex"
        label="性别"
        valueEnum={{
          公: '公',
          母: '母',
        }}
        rules={[{ required: true, message: '此条必填' }]}
      />
      <ProFormText
        rules={[
          {
            required: true,
            message: '此条必填',
          },
        ]}
        name="area"
        label="出没区域"
      />
      <ProFormDigit
        rules={[
          {
            required: true,
            message: '此条必填',
          },
        ]}
        label="人气值"
        name="popularity"
      />
      <ProFormRadio.Group
        rules={[
          {
            required: true,
            message: '此条必填',
          },
        ]}
        name="isSnipped"
        label="是否剪耳"
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
      <ProFormRadio.Group
        rules={[
          {
            required: true,
            message: '此条必填',
          },
        ]}
        name="isSterilized"
        label="是否绝育"
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
        name="details"
        label="介绍"
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
