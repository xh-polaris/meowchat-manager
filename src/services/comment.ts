import { request } from '@umijs/max';
import { DEFAULT_URL } from '.';

/**
 * 获取当前评论
 * @param params
 * @returns
 */
export const fetchCurrentComments = async (params: any) => {
  return request(`${DEFAULT_URL}/comment/get_comments`, {
    method: 'GET',
    params: {
      ...params,
    },
  });
};
