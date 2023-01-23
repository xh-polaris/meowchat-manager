import { request } from '@umijs/max';

const DEFAULT_URL = 'https://meowchat.xhpolaris.com';

/**
 * 获取轮播图列表
 * @param params
 * @returns
 */
export const fetchCarouselList = async (
  params: {
    current?: number;
    pageSize?: number;
    communityId?: string;
  },
  options?: { [key: string]: any },
) =>
  request(`${DEFAULT_URL}/notice/get_news`, {
    method: 'GET',
    params: {
      ...params,
      page: (params.current || 1) - 1,
    },
    ...(options || {}),
  });

/**
 * 新增轮播图
 * @param params
 * @returns
 */
export const createCarousel = async (data: any, options?: { [key: string]: any }) => {
  return request(`${DEFAULT_URL}/notice/new_news`, {
    method: 'POST',
    data: {
      ...data,
    },
    ...(options || {}),
  });
};

/**
 * 删除轮播图
 * @param params
 * @returns
 */
export const deleteCarousel = async (data: any, options?: { [key: string]: any }) => {
  return request(`${DEFAULT_URL}/notice/remove_news`, {
    method: 'POST',
    data: {
      ...data,
    },
    ...(options || {}),
  });
};

/**
 * 编辑轮播图
 * @param params
 * @returns
 */
export const editCarousel = async (data: any, options?: { [key: string]: any }) => {
  return request(`${DEFAULT_URL}/notice/new_news`, {
    method: 'POST',
    data: {
      ...data,
    },
    ...(options || {}),
  });
};
