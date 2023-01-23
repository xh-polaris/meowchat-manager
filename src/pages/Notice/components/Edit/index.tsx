import { editNotice } from '@/services/notice';
import { DrawerForm, ProFormTextArea } from '@ant-design/pro-components';
import { Form } from 'antd';
import { useEffect } from 'react';

const Edit = ({ open, setEditVisible, actionRef, currentNotice }: any) => {
  const [form] = Form.useForm();

  const handleEdit = async (value: any) => {
    const data = {
      ...value,
      id: currentNotice?.id,
      communityId: '',
    };
    const success = await editNotice(data);
    if (success) {
      setEditVisible(false);
      if (actionRef.current) {
        actionRef.current.reload();
      }
    }
  };

  useEffect(() => {
    if (currentNotice) {
      form.setFieldsValue(currentNotice);
    }
  }, [currentNotice]);

  return (
    <DrawerForm
      title="编辑公告"
      width="600px"
      open={open}
      onOpenChange={setEditVisible}
      layout="horizontal"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 17 }}
      onFinish={handleEdit}
      form={form}
    >
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
    </DrawerForm>
  );
};

export default Edit;
