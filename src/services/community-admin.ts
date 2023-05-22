import { request } from '@umijs/max';
import { DEFAULT_URL } from '.';

/**
 * 获取社区管理员列表
 * @param params
 * @returns
 */
export const fetchCommunityAdminList = async (params: any) =>
  request(`${DEFAULT_URL}/role/get_user_by_role`, {
    method: 'GET',
    params: {
      ...params,
      roleType: 'communityAdmin',
    },
  });

/**
 * 新增社区管理员
 * @param params
 * @returns
 */
export const createCommunityAdmin = async (data: any) => {
  return request(`${DEFAULT_URL}/role/update_community_admin`, {
    method: 'POST',
    data: {
      ...data,
    },
  });
};

/**
 * 删除社区管理员
 * @param params
 * @returns
 */
export const deleteCommunityAdmin = async (data: any) => {
  return request(`${DEFAULT_URL}/role/update_community_admin`, {
    method: 'POST',
    data: {
      userId: data.id,
      communityId: localStorage.getItem('communityId'),
      isRemove: true,
    },
  });
};
