import { request } from '@umijs/max';
import { DEFAULT_URL } from '.';

/**
 * 获取轮播图列表
 * @param params
 * @returns
 */
export const fetchDriedFishList = async (
  params: {
    page?: number;
  },
  options?: { [key: string]: any },
) =>
  request(`${DEFAULT_URL}/plan/get_plan_previews`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });

/**
 * 新增轮播图
 * @param params
 * @returns
 */
// export const createCarousel = async (data: any, options?: { [key: string]: any }) => {
//   return request(`${DEFAULT_URL}/notice/new_news`, {
//     method: 'POST',
//     data: {
//       ...data,
//     },
//     ...(options || {}),
//   });
// };

/**
 * 删除轮播图
 * @param params
 * @returns
 */
// export const deleteCarousel = async (data: any, options?: { [key: string]: any }) => {
//   return request(`${DEFAULT_URL}/notice/remove_news`, {
//     method: 'POST',
//     data: {
//       ...data,
//     },
//     ...(options || {}),
//   });
// };

/**
 * 编辑轮播图
 * @param params
 * @returns
 */
// export const editCarousel = async (data: any, options?: { [key: string]: any }) => {
//   return request(`${DEFAULT_URL}/notice/new_news`, {
//     method: 'POST',
//     data: {
//       ...data,
//     },
//     ...(options || {}),
//   });
// };

/**
 * 获取小鱼干计划具体信息
 * @param params
 * @returns
 */
export const fetchCurrentDriedFish = async (
  params: {
    planId: string;
  },
  options?: { [key: string]: any },
) => {
  return request(`${DEFAULT_URL}/plan/get_plan_detail`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
};
