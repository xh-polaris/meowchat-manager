import { request } from '@umijs/max';

const DEFAULT_URL = 'https://meowchat.xhpolaris.com';

/**
 * 获取当前的用户
 * @param params
 * @returns
 */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    user: API.CurrentUser;
  }>(`${DEFAULT_URL}/user/get_user_info`, {
    method: 'GET',
    ...(options || {}),
  });
}

/**
 * 获取当前的用户权限
 * @param params
 * @returns
 */
export async function currentUserAccess(options?: { [key: string]: any }) {
  return request(`${DEFAULT_URL}/role/get_user_roles`, {
    method: 'GET',
    ...(options || {}),
  });
}

/**
 * 登录接口
 * @param params
 * @returns
 */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>(`${DEFAULT_URL}/auth/sign_in`, {
    method: 'POST',
    data: {
      ...body,
      authType: 'email',
    },
    ...(options || {}),
  });
}

/**
 * 退出登录接口
 * @param params
 * @returns
 */
export async function outLogin() {
  return {
    data: {},
    success: true,
  };
}
