import { request } from '@umijs/max';
import { DEFAULT_URL } from '.';

/**
 * 查询用户信息
 * @param params
 * @returns
 */
export const searchUserInfo = async (params: any, options?: { [key: string]: any }) =>
  request(`${DEFAULT_URL}/user/search_user_for_admin`, {
    method: 'GET',
    params: {
      keyword: '',
      ...params,
    },
    ...(options || {}),
  }).catch((e) => console.error(e));
