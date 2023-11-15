import UploadImagesFormItem from '@/components/UploadImagesFormItem';
import { editCat, fetchCurrentCat } from '@/services/cat';
import {
  DrawerForm,
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
      communityId: localStorage.getItem('communityId'),
    };
    const success = await editCat(data);
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
        const data = await fetchCurrentCat({ catId: currentCat });
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
