import { Form } from 'antd';
import { createOrUpdateCommunity } from '@/services/community';
import { useEffect } from 'react';
import { DrawerForm, ProFormTextArea } from '@ant-design/pro-components';
const EditCampus = ({ open, setEditVisible, actionRef, currentCampus }: any) => {
  const [form] = Form.useForm();
  const handleEdit = async (newData: any) => {
    // newData才是edit后的新的要提交的一些数据
    const data = {
      id: currentCampus?.id,
      name: newData.campus,
    };
    const success = await createOrUpdateCommunity(data);
    if (success) {
      setEditVisible(false);
      if (actionRef.current) {
        actionRef.current.reload();
      }
    } else {
    }
  };

  useEffect(() => {
    if (currentCampus) {
      form.setFieldsValue(currentCampus);
    }
  }, [currentCampus]);

  return (
    <DrawerForm
      title="编辑校区名"
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
        name="campus"
        label="校区名"
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

export default EditCampus;
