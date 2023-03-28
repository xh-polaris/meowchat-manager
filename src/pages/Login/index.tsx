import Footer from '@/components/Footer';
import { weixinLogin, accountLogin } from '@/services/auth';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { message, Tabs } from 'antd';
import { flushSync } from 'react-dom';
import queryString from 'query-string';
import styles from './index.less';

const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };
  const handleSubmit = async (type: string, data: any) => {
    try {
      // 登录
      let msg;
      if (type === 'weixin') {
        msg = await weixinLogin(data);
      } else if (type === 'account') {
        msg = await accountLogin(data);
      } else {
        return;
      }
      // @ts-ignore
      if (msg.code === 0) {
        // @ts-ignore
        localStorage.setItem('accessToken', `${msg.accessToken}`);
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      message.error(defaultLoginFailureMessage);
      history.replace({
        pathname: '/',
      });
    }
  };

  const code: string = queryString.parse(location.search).code as string;
  if (code) {
    handleSubmit('weixin', code);
    return <div className={styles.center}>登陆中...</div>;
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.box} />
        <div className={styles.content}>
          <div className={styles.main}>
            <div className={styles.title}>
              <img alt="logo" src="https://static.xhpolaris.com/cat_world.jpg" />
              <span>Meowchat 管理面板</span>
            </div>
            <Tabs
              centered
              items={[
                {
                  key: 'weixin',
                  label: '微信登录',
                  children: (
                    <>
                      <div className={styles.weixinLoginFrame}>
                        <a
                          href={
                            'https://open.weixin.qq.com/connect/qrconnect?appid=wx40ab73e6ebd6e636&redirect_uri=https://manager.meowchat.cn/login&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect'
                          }
                          className={styles.link}
                        >
                          点击进入微信登录
                        </a>
                      </div>
                    </>
                  ),
                },
                {
                  key: 'account',
                  label: '账户密码登录',
                  children: (
                    <>
                      <LoginForm
                        onFinish={async (values) => {
                          await handleSubmit('account', values as API.LoginParams);
                        }}
                      >
                        <ProFormText
                          name="authId"
                          fieldProps={{
                            size: 'large',
                            prefix: <UserOutlined className={styles.prefixIcon} />,
                          }}
                          placeholder={'用户名'}
                          rules={[
                            {
                              required: true,
                              message: '请输入用户名!',
                            },
                          ]}
                        />
                        <ProFormText.Password
                          name="password"
                          fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined className={styles.prefixIcon} />,
                          }}
                          placeholder={'密码'}
                          rules={[
                            {
                              required: true,
                              message: '请输入密码！',
                            },
                          ]}
                        />
                        <div
                          style={{
                            marginBottom: 24,
                          }}
                        >
                          <ProFormCheckbox noStyle name="autoLogin">
                            自动登录
                          </ProFormCheckbox>
                          <a
                            style={{
                              float: 'right',
                            }}
                          >
                            忘记密码
                          </a>
                        </div>
                      </LoginForm>
                    </>
                  ),
                },
              ]}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};

export default Login;
