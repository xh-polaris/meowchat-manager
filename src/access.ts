/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: any } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canSuperAdmin: currentUser && currentUser.roleType === 'superAdmin',
    canCommunityAdmin: currentUser && currentUser.roleType === 'communityAdmin',
    canAdmin: currentUser && currentUser.roleType === 'admin',
  };
}
