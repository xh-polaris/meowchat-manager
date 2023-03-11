import { request } from '@umijs/max';
import { DEFAULT_URL } from '.';

/**
 * 获取超级管理员列表
 * @param params
 * @returns
 */
export const fetchSuperAdminList = async (
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) =>
  request(`${DEFAULT_URL}/role/get_super_admin`, {
    method: 'GET',
    params: {
      ...params,
      page: (params.current || 1) - 1,
    },
    ...(options || {}),
  });

/**
 * 新增管理员
 * @param params
 * @returns
 */
export const createSuperAdmin = async (data: any, options?: { [key: string]: any }) => {
  return request(`${DEFAULT_URL}/role/update_super_admin`, {
    method: 'POST',
    data: {
      ...data,
    },
    ...(options || {}),
  });
};
