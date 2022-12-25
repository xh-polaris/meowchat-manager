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
      // communityId: '637ce159b15d9764c31f9c84'
    },
    ...(options || {}),
  });
