import Footer from '@/components/Footer';
// import { login } from '@/services/auth';
// import { LockOutlined, UserOutlined } from '@ant-design/icons';
// import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { message } from 'antd';
import { flushSync } from 'react-dom';
import queryString from 'query-string';
import styles from './index.less';
import { weixinLogin } from '@/services/auth';

const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const code: string = queryString.parse(location.search).code as string;

  if (code) {
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

    const handleSubmit = async () => {
      try {
        // 登录
        const msg = await weixinLogin(code);
        if (msg.code === 0) {
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
    handleSubmit();
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
            <a
              href={
                'https://open.weixin.qq.com/connect/qrconnect?appid=wx40ab73e6ebd6e636&redirect_uri=https://manager.meowchat.cn/login&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect'
              }
              className={styles.link}
            >
              微信登陆
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};

export default Login;
