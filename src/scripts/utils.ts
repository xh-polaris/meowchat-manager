import moment from 'moment';

/**
 * 格式化时间
 */
export const formatTime = (secondTimestamp?: string | number, rule = 'YYYY-MM-DD HH:mm:ss') => {
  if (!secondTimestamp) return '';

  if (typeof secondTimestamp === 'number') {
    if (secondTimestamp.toString().length === 10) {
      return moment(secondTimestamp * 1000).format(rule);
    } else {
      return moment(secondTimestamp).format(rule);
    }
  }

  return moment(secondTimestamp, 'YYYYMMDDHHmmss').format(rule);
};
