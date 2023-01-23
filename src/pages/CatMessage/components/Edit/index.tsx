import UploadImagesFormItem from '@/components/UploadImagesFormItem';
import { editCatInfo, fetchCurrentCatInfo } from '@/services/cat';
import {
  DrawerForm,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Form } from 'antd';
import { useEffect } from 'react';

const Edit = ({ open, setEditVisible, actionRef, currentCat }: any) => {
  const [form] = Form.useForm();

  const handleEdit = async (value: any) => {
    const data = {
      ...value,
      id: currentCat,
      communityId: '637ce159b15d9764c31f9c84',
    };
    const success = await editCatInfo(data);
    if (success) {
      setEditVisible(false);
      if (actionRef.current) {
        actionRef.current.reload();
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (currentCat) {
        const data = await fetchCurrentCatInfo({ catId: currentCat });
        form.setFieldsValue(data?.cat);
      }
    })();
  }, [currentCat]);

  return (
    <DrawerForm
      title="编辑猫咪"
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
      <Form.Item
        name="avatars"
        label="照片"
        rules={[
          {
            required: true,
            message: '此条必填',
          },
        ]}
      >
        <UploadImagesFormItem limit={9} />
      </Form.Item>
    </DrawerForm>
  );
};

export default Edit;
