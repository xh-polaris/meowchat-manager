import { request } from '@umijs/max';

const DEFAULT_URL = 'https://meowchat.xhpolaris.com';

/**
 * 获取社区列表
 * @param params
 * @param options
 * @returns
 */
export const fetchCommunityList = async (
  params: {
    parentId?: string;
  },
  options?: Record<string, any>,
) =>
  request(`${DEFAULT_URL}/community/list_community`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });

/**
 * 创建或更新社区信息
 * @returns
 * @param data
 * @param options
 */
export const createOrUpdateCommunity = async (
  data: {
    id?: string;
    name: string;
    parentId?: string;
  },
  options?: Record<string, any>,
) => {
  console.log('here');
  return request(`${DEFAULT_URL}/community/new_community`, {
    method: 'POST',
    data: {
      ...data,
    },
    ...(options || {}),
  });
};

/**
 * 删除社区
 * @returns
 * @param data
 * @param options
 */
export const deleteCommunity = async (
  data: {
    id: string;
  },
  options?: Record<string, any>,
) =>
  request(`${DEFAULT_URL}/community/delete_community`, {
    method: 'POST',
    data: {
      ...data,
    },
    ...(options || {}),
  });
