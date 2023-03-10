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
      const roles = userAccess.roles[0];
      const communityList = (await fetchCommunityList({})).communities;
      if (roles.roleType === 'superAdmin') {
        setDefaultCommunityId(communityList);
      } else {
        localStorage.setItem('communityId', roles.communityId);
      }
      localStorage.setItem('access', roles.roleType);
      localStorage.setItem('communityList', JSON.stringify(arrayToTree(communityList)));
      const user = {
        ...msg.user,
        ...roles,
      };
      return user;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // ?????????????????????????????????
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

// ProLayout ?????????api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // ????????????????????????????????? login
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
    // ???????????? loading ?????????
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
 * @name request ?????????????????????????????????
 * ????????? axios ??? ahooks ??? useRequest ????????????????????????????????????????????????????????????
 * @doc https://umijs.org/docs/max/request#??????
 */
export const request = {
  ...errorConfig,
};
