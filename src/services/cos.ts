import { request } from '@umijs/max';
import { DEFAULT_URL } from '.';

/**
 * 获取预签名 url
 * @param params
 * @returns
 */
export const applySignedUrl = async (data: any, options?: { [key: string]: any }) => {
  return request(`${DEFAULT_URL}/sts/apply_signed_url`, {
    method: 'POST',
    data: {
      ...data,
    },
    ...(options || {}),
  });
};
