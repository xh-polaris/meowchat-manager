import { request } from '@umijs/max';
import { DEFAULT_URL } from '.';

/**
 * 获取动态信息列表
 * @param params
 * @returns
 */
export const fetchMomentList = async (
  params: {
    current?: number;
    pageSize?: number;
    communityId?: string;
  },
  options?: { [key: string]: any },
) =>
  request(`${DEFAULT_URL}/moment/get_moment_previews`, {
    method: 'GET',
    params: {
      ...params,
      page: (params.current || 1) - 1,
    },
    ...(options || {}),
  });

/**
 * 获取动态具体信息
 * @param params
 * @returns
 */
export const fetchCurrentMoment = async (
  params: {
    momentId: string;
  },
  options?: { [key: string]: any },
) => {
  return request(`${DEFAULT_URL}/moment/get_moment_detail`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
};

/**
 * 新增动态
 * @param params
 * @returns
 */
export const createMoment = async (data: any, options?: { [key: string]: any }) => {
  return request(`${DEFAULT_URL}/moment/new_moment`, {
    method: 'POST',
    data: {
      ...data,
    },
    ...(options || {}),
  });
};

/**
 * 删除动态
 * @param params
 * @returns
 */
export const deleteMoment = async (data: any, options?: { [key: string]: any }) => {
  return request(`${DEFAULT_URL}/moment/delete_moment`, {
    method: 'POST',
    data: {
      ...data,
    },
    ...(options || {}),
  });
};

/**
 * 编辑动态
 * @param params
 * @returns
 */
export const editMoment = async (data: any, options?: { [key: string]: any }) => {
  return request(`${DEFAULT_URL}/moment/new_moment`, {
    method: 'POST',
    data: {
      ...data,
    },
    ...(options || {}),
  });
};
