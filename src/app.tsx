import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
import {
  currentUser as queryCurrentUser,
  currentUserAccess as queryCurrentUserAccess,
} from './services/auth';
import { fetchCommunityList } from './services/community';

const loginPath = '/login';

const adminMap = new Map([
  [1, 'admin'],
  [2, 'communityAdmin'],
  [3, 'superAdmin'],
]);

function setDefaultCommunityId(communityList: any[]) {
  for (let i = communityList.length - 1; i >= 0; i--) {
    const community = communityList[i];
    if (
      community.parentId === '' ||
      community.parentId === undefined ||
      community.parentId === null
    ) {
      continue;
    }
    localStorage.setItem('communityId', community.id);
  }
}

function arrayToTree(array: any[]) {
  const result: any[] = [];
  const map = {};

  if (!Array.isArray(array)) {
    return [];
  }

  array.forEach((item) => {
    map[item.id] = item;
  });

  array.forEach((item) => {
    const parent = map[item.parentId];
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      result.push(item);
    }
  });

  return result;
}

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser({
        skipErrorHandler: true,
      });
      const userAccess = await queryCurrentUserAccess();
      let role: any;
      userAccess.roles?.forEach((r: { roleType: number }) => {
        if (!adminMap.has(r.roleType)) {
          return;
        }
        if (!role?.roleType || r.roleType > role.roleType) {
          role = r;
        }
      });
      if (!role) {
        throw new TypeError();
      }
      const communityList = (await fetchCommunityList({})).communities;
      if (role.roleType === 3) {
        setDefaultCommunityId(communityList);
      } else {
        localStorage.setItem('communityId', role.communityId);
      }
      if (!adminMap.get(role.roleType)) {
        throw new TypeError();
      }
      localStorage.setItem('access', adminMap.get(role.roleType) || '');
      localStorage.setItem('communityList', JSON.stringify(arrayToTree(communityList)));
      const user = {
        ...msg.user,
        ...role,
      };
      return user;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  if (window.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    layoutBgImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    menuHeaderRender: undefined,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};
