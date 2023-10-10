import { request } from '@umijs/max';
import { DEFAULT_URL } from '.';

/**
 * 获取当前的用户
 * @param params
 * @returns
 */
export async function currentUser(options?: Record<string, any>) {
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
export async function currentUserAccess(options?: Record<string, any>) {
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
export async function accountLogin(body: API.LoginParams, options?: Record<string, any>) {
  return request<API.LoginResult>(`${DEFAULT_URL}/auth/sign_in`, {
    method: 'POST',
    data: {
      ...body,
      authType: 'email',
      appId: 2,
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

/**
 * 微信登录接口
 * code是微信登录扫二维码后微信官方返回的code
 */
export async function weixinLogin(code: string, options?: Record<string, any>) {
  return request<{
    accessToken: any;
    code: number;
    user: API.CurrentUser;
  }>(`${DEFAULT_URL}/auth/sign_in`, {
    method: 'POST',
    data: {
      authType: 'wechat',
      verifyCode: code,
      authId: 'wx40ab73e6ebd6e636', // 填wx的appid
      appId: 2,
    },
    ...(options || {}),
  });
}

/**
 * 修改密码
 * @param params
 * @returns
 */
export const changePassword = async (data: any) =>
  request(`${DEFAULT_URL}/auth/set_password`, {
    method: 'POST',
    data: {
      ...data,
    },
  }).catch((e) => console.error(e));
