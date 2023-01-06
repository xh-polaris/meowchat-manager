import { request } from '@umijs/max';

const DEFAULT_URL = 'https://meowchat.xhpolaris.com';

/**
 * 获取猫咪信息列表
 * @param params
 * @returns
 */
export const fetchCatList = async (
  params: {
    current?: number;
    pageSize?: number;
    communityId?: string;
  },
  options?: { [key: string]: any },
) =>
  request(`${DEFAULT_URL}/collection/get_cat_previews`, {
    method: 'GET',
    params: {
      ...params,
      page: (params.current || 1) - 1,
    },
    ...(options || {}),
  });

/**
 * 获取猫咪具体信息
 * @param params
 * @returns
 */
export const fetchCurrentCatInfo = async (
  params: {
    catId: string;
  },
  options?: { [key: string]: any },
) => {
  return request(`${DEFAULT_URL}/collection/get_cat_detail`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
};

/**
 * 新增猫咪
 * @param params
 * @returns
 */
export const createCatInfo = async (data: any, options?: { [key: string]: any }) => {
  return request(`${DEFAULT_URL}/collection/new_cat`, {
    method: 'POST',
    data: {
      ...data,
    },
    ...(options || {}),
  });
};

/**
 * 删除猫咪
 * @param params
 * @returns
 */
export const deleteCatInfo = async (data: any, options?: { [key: string]: any }) => {
  return request(`${DEFAULT_URL}/collection/delete_cat`, {
    method: 'POST',
    data: {
      ...data,
    },
    ...(options || {}),
  });
};

/**
 * 编辑猫咪
 * @param params
 * @returns
 */
export const editCatInfo = async (data: any, options?: { [key: string]: any }) => {
  return request(`${DEFAULT_URL}/collection/new_cat`, {
    method: 'POST',
    data: {
      ...data,
    },
    ...(options || {}),
  });
};
