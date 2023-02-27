import UploadImagesFormItem from '@/components/UploadImagesFormItem';
import { editMoment, fetchCurrentMoment } from '@/services/moments';
import { DrawerForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Form } from 'antd';
import { useEffect } from 'react';

const Edit = ({ open, setEditVisible, actionRef, currentMoment }: any) => {
  const [form] = Form.useForm();

  const handleEdit = async (value: any) => {
    const data = {
      ...value,
      id: currentMoment,
      communityId: localStorage.getItem('communityId'),
    };
    const success = await editMoment(data);
    if (success) {
      setEditVisible(false);
      if (actionRef.current) {
        actionRef.current.reload();
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (currentMoment) {
        const data = await fetchCurrentMoment({ momentId: currentMoment });
        form.setFieldsValue(data?.moment);
      }
    })();
  }, [currentMoment]);

  return (
    <DrawerForm
      title="编辑动态"
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
      <ProFormTextArea
        name="text"
        label="内容"
        rules={[
          {
            required: true,
            message: '此条必填',
          },
        ]}
      />
      <Form.Item
        name="photos"
        label="图片"
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
