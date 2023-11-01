import { request } from '@umijs/max';
import { DEFAULT_URL } from '.';

/**
 * 查询用户信息
 * @param params
 * @returns
 */
export const searchUserInfo = async (params: any, options?: { [key: string]: any }) =>
  request(`${DEFAULT_URL}/user/search_user`, {
    method: 'GET',
    params: {
      keyword: '',
      ...params,
    },
    ...(options || {}),
  }).catch((e) => console.error(e));

/**
 * 更新用户昵称头像
 * @param params
 * @returns
 */
export const changeAvatar = async (data: any) =>
  request(`${DEFAULT_URL}/user/update_user_info`, {
    method: 'POST',
    data: {
      ...data,
    },
  }).catch((e) => console.error(e));
