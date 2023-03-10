import { request } from '@umijs/max';
import { DEFAULT_URL } from '.';

/**
 * 获取公告列表
 * @param params
 * @returns
 */
export const fetchNoticeList = async (
  params: {
    current?: number;
    pageSize?: number;
    communityId?: string;
  },
  options?: { [key: string]: any },
) =>
  request(`${DEFAULT_URL}/notice/get_notices`, {
    method: 'GET',
    params: {
      ...params,
      page: (params.current || 1) - 1,
    },
    ...(options || {}),
  });

/**
 * 新增公告
 * @param params
 * @returns
 */
export const createNotice = async (data: any, options?: { [key: string]: any }) => {
  return request(`${DEFAULT_URL}/notice/new_notice`, {
    method: 'POST',
    data: {
      ...data,
    },
    ...(options || {}),
  });
};

/**
 * 删除公告
 * @param params
 * @returns
 */
export const deleteNotice = async (data: any, options?: { [key: string]: any }) => {
  return request(`${DEFAULT_URL}/notice/remove_notice`, {
    method: 'POST',
    data: {
      ...data,
    },
    ...(options || {}),
  });
};

/**
 * 编辑公告
 * @param params
 * @returns
 */
export const editNotice = async (data: any, options?: { [key: string]: any }) => {
  return request(`${DEFAULT_URL}/notice/new_notice`, {
    method: 'POST',
    data: {
      ...data,
    },
    ...(options || {}),
  });
};
