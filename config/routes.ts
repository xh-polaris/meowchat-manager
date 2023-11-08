/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,title 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/login',
    layout: false,
    name: '登录',
    component: './Login',
  },
  {
    path: '/welcome',
    name: '欢迎使用',
    icon: 'smile',
    component: './Welcome',
  },
  {
    name: '猫咪管理',
    icon: 'profile',
    path: '/cat',
    component: './Cat',
  },
  {
    name: '动态管理',
    icon: 'shake',
    path: '/moments',
    component: './Moments',
  },
  {
    name: '公告管理',
    icon: 'notification',
    path: '/notice',
    component: './Notice',
  },
  {
    name: '联系人管理',
    icon: 'mail',
    path: '/contact',
    component: './Contact',
  },
  {
    name: '社区管理员功能',
    icon: 'rocket',
    path: 'community-admin',
    access: 'canCommunityAdmin',
    routes: [
      {
        path: '/community-admin',
        redirect: '/community-admin/carousel',
      },
      {
        name: '社区轮播图管理',
        path: '/community-admin/carousel',
        component: './Carousel',
      },
      {
        name: '小鱼干计划管理',
        path: '/community-admin/dried-fish',
        component: './CommunityAdmin/DriedFish',
      },
    ],
  },
  {
    name: '超级管理员功能',
    icon: 'crown',
    path: 'super-admin',
    access: 'canSuperAdmin',
    routes: [
      {
        path: '/super-admin',
        redirect: '/super-admin/community',
      },
      {
        name: '社区管理',
        path: '/super-admin/community',
        component: './SuperAdmin/Community',
      },
      {
        name: '帖子管理',
        path: '/super-admin/post',
        component: './SuperAdmin/Posts',
      },
      {
        name: '社区轮播图管理',
        path: '/super-admin/carousel',
        component: './Carousel',
      },
      // {
      //   name: '管理员管理',
      //   icon: 'bank',
      //   path: '/super-admin/admin',
      //   component: './SuperAdmin/Community',
      // },
      {
        name: '社区管理员管理',
        path: '/super-admin/community-admin',
        component: './SuperAdmin/CommunityAdmin',
      },
      {
        name: '超级管理员管理',
        path: '/super-admin/super-admin',
        component: './SuperAdmin/SuperAdmin',
      },
      {
        name: '小鱼干计划管理',
        path: '/super-admin/dried-fish',
        component: './CommunityAdmin/DriedFish',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
