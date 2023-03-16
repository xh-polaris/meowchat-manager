import { request } from '@@/exports';
import { DEFAULT_URL } from '@/services/index';

export const getPostPreviews = async (
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: Record<string, any>,
) =>
  request(`${DEFAULT_URL}/post/get_post_previews`, {
    // method: 'GET',
    method: 'POST',
    data: {
      ...params,
      page: (params.current || 1) - 1,
    },
    // params: {
    //   ...params,
    //   page: (params.current || 1) - 1,
    // },
    ...(options || {}),
  });

export const getPostDetail = async (
  params: {
    postId: string;
  },
  options?: Record<string, any>,
) => {
  return request(`${DEFAULT_URL}/post/get_post_detail`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
};

export const newPost = async (data: any, options?: Record<string, any>) => {
  return request(`${DEFAULT_URL}/post/new_post`, {
    method: 'POST',
    data: {
      ...data,
    },
    ...(options || {}),
  });
};

export const deletePost = async (data: any, options?: Record<string, any>) => {
  return request(`${DEFAULT_URL}/post/delete_post`, {
    method: 'POST',
    data: {
      ...data,
    },
    ...(options || {}),
  });
};
