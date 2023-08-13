/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: any } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canSuperAdmin: currentUser && currentUser.roleType === 3,
    canCommunityAdmin: currentUser && currentUser.roleType === 2,
    canAdmin: currentUser && currentUser.roleType === 1,
  };
}
