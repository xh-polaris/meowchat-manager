import { request } from '@umijs/max';

const DEFAULT_URL = 'https://meowchat.xhpolaris.com';

/**
 * 获取联系人信息列表
 * @param params
 * @returns
 */
export const fetchContactList = async (
  params: {
    current?: number;
    pageSize?: number;
    communityId?: string;
  },
  options?: { [key: string]: any },
) =>
  request(`${DEFAULT_URL}/notice/get_admins`, {
    method: 'GET',
    params: {
      ...params,
      page: (params.current || 1) - 1,
    },
    ...(options || {}),
  });

/**
 * 新增联系人
 * @param params
 * @returns
 */
export const createContact = async (data: any, options?: { [key: string]: any }) => {
  return request(`${DEFAULT_URL}/notice/new_admin`, {
    method: 'POST',
    data: {
      ...data,
      avatarUrl: data?.avatarUrl?.[0],
    },
    ...(options || {}),
  });
};

/**
 * 删除联系人
 * @param params
 * @returns
 */
export const deleteContact = async (data: any, options?: { [key: string]: any }) => {
  return request(`${DEFAULT_URL}/notice/delete_admin`, {
    method: 'POST',
    data: {
      ...data,
    },
    ...(options || {}),
  });
};

/**
 * 编辑联系人
 * @param params
 * @returns
 */
export const editContact = async (data: any, options?: { [key: string]: any }) => {
  return request(`${DEFAULT_URL}/notice/new_admin`, {
    method: 'POST',
    data: {
      ...data,
      avatarUrl: data?.avatarUrl?.[0],
    },
    ...(options || {}),
  });
};
