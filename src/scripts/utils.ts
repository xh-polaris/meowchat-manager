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

/**
 * 获取 communityId 对应的 communityName
 */
export const findCommunityName = (communityId: string) => {
  const communityList = JSON.parse(localStorage.getItem('communityList') || '');
  let name = '';
  for (let i = 0; i < communityList.length; i++) {
    if (communityList[i].id === communityId) {
      name = communityList[i].name;
      break;
    } else {
      for (let j = 0; j < communityList[i].children.length; j++) {
        if (communityList[i].children[j].id === communityId) {
          name = communityList[i].children[j].name;
          break;
        }
      }
    }
  }
  return name;
};
