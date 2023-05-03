import { changePassword } from '@/services/auth';
import { changeAvatar } from '@/services/user';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Col, Divider, Form, Modal, Row, Space } from 'antd';
import UploadImagesFormItem from '../UploadImagesFormItem';
import { history } from '@umijs/max';

const PersonalDataModal = ({ isSettingsOpen, setIsSettingsOpen }: any) => {
  const handleCancel = () => {
    setIsSettingsOpen(false);
  };

  const handleChangePassword = async (value: any) => {
    const success = await changePassword(value);
    if (success) {
      setIsSettingsOpen(false);
      localStorage.clear();
      history.replace({
        pathname: '/login',
      });
    }
  };

  const handleChangeAvatar = async (value: any) => {
    const { avatarUrl } = value;
    const data = {
      avatarUrl: avatarUrl[0],
    };
    const success = await changeAvatar(data);
    if (success) {
      setIsSettingsOpen(false);
      location.reload();
    }
  };

  return (
    <Modal title="修改个人信息" open={isSettingsOpen} onCancel={handleCancel} footer={null}>
      <Divider plain style={{ margin: '0 0 16px 0' }}>
        <span>修改密码</span>
      </Divider>
      <ProForm
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 19 }}
        submitter={{
          render: (props, doms) => {
            return (
              <Row justify="center">
                <Col span={8} style={{ display: 'flex', justifyContent: 'center' }}>
                  <Space>{doms}</Space>
                </Col>
              </Row>
            );
          },
        }}
        onFinish={handleChangePassword}
      >
        <ProFormText.Password
          rules={[
            {
              required: true,
              message: '此条必填',
            },
          ]}
          name="password"
          label="新密码"
        />
      </ProForm>
      <Divider plain>
        <span>修改头像</span>
      </Divider>
      <ProForm
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 19 }}
        submitter={{
          render: (props, doms) => {
            return (
              <Row justify="center">
                <Col span={8} style={{ display: 'flex', justifyContent: 'center' }}>
                  <Space>{doms}</Space>
                </Col>
              </Row>
            );
          },
        }}
        onFinish={handleChangeAvatar}
      >
        <Form.Item
          name="avatarUrl"
          label="头像"
          rules={[
            {
              required: true,
              message: '此条必填',
            },
          ]}
        >
          <UploadImagesFormItem limit={1} />
        </Form.Item>
      </ProForm>
    </Modal>
  );
};

export default PersonalDataModal;
