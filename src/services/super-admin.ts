import { request } from '@umijs/max';
import { DEFAULT_URL } from '.';

/**
 * 获取超级管理员列表
 * @param params
 * @returns
 */
export const fetchSuperAdminList = async (params: any) =>
  request(`${DEFAULT_URL}/role/get_user_by_role`, {
    method: 'GET',
    params: {
      ...params,
      roleType: 3,
      communityId: '1',
    },
  });

/**
 * 新增超级管理员
 * @param params
 * @returns
 */
export const createSuperAdmin = async (data: any) => {
  return request(`${DEFAULT_URL}/role/update_super_admin`, {
    method: 'POST',
    data: {
      ...data,
    },
  });
};

/**
 * 删除超级管理员
 * @param params
 * @returns
 */
export const deleteSuperAdmin = async (data: any) => {
  return request(`${DEFAULT_URL}/role/update_super_admin`, {
    method: 'POST',
    data: {
      userId: data.id,
      isRemove: true,
    },
  });
};
