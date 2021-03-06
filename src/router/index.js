import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/modules/user/'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * 代表那些不需要动态判断权限的路由，如登录页、404、等通用页面
 * 所有的权限都可以访问
 */
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/login',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '欢迎回来', icon: 'people' }
    }]
  },

  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

/**
 * asyncRoutes
 * 代表那些需求动态判断权限并通过 addRoutes 动态添加的页面
 */
export const asyncRoutes = [
  {
    path: '/news_count',
    component: Layout,
    meta: {
      title: '新闻统计',
      icon: 'chart',
      roles: ['1']
    },
    children: [
      {
        path: 'index',
        name: 'news_count',
        component: () => import('@/views/news_count/index'),
        meta: {
          title: '新闻统计',
          icon: 'chart',
          roles: ['1']
        }
      }
    ]
  },

  {
    path: '/slider',
    component: Layout,
    meta: {
      title: '轮播图管理',
      icon: 'nested',
      roles: ['1']
    },
    children: [
      {
        path: 'index',
        name: 'slider',
        component: () => import('@/views/slider/index'),
        meta: {
          title: '轮播图管理',
          icon: 'slider',
          roles: ['1']
        }
      }
    ]
  },

  {
    path: '/news_category',
    component: Layout,
    meta: {
      title: '新闻分类管理',
      icon: 'list',
      roles: ['1']
    },
    children: [
      {
        path: 'index',
        name: 'news_category',
        component: () => import('@/views/news_category/index'),
        meta: {
          title: '新闻分类管理',
          icon: 'list',
          roles: ['1']
        }
      }
    ]
  },

  {
    path: '/news_content',
    component: Layout,
    redirect: '/news_content/news_list',
    name: 'news_list',
    meta: {
      title: '新闻内容管理',
      icon: 'tree-table',
      roles: ['1', '2', '3']
    },
    children: [
      {
        path: 'news_add',
        name: 'news_add',
        component: () => import('@/views/news_content/news_add/index'),
        meta: {
          title: '发布新闻',
          icon: 'form',
          roles: ['1', '2', '3']
        }
      }
    ]
  },
  {
    path: '/news_content',
    component: Layout,
    redirect: '/news_content/news_list',
    name: 'news_list',
    meta: {
      title: '新闻内容管理',
      icon: 'example',
      roles: ['1', '2']
    },
    children: [
      {
        path: 'news_list',
        name: 'news_list',
        component: () => import('@/views/news_content/news_list/index'),
        meta: {
          title: '新闻列表',
          icon: 'table',
          roles: ['1', '2']
        }
      },
      {
        path: 'news_edit/:newsMessage',
        name: 'news_edit',
        component: () => import('@/views/news_content/news_edit/index')
      }
    ]
  },

  {
    path: '/news_hot',
    component: Layout,
    meta: {
      title: '热点新闻管理',
      icon: 'dashboard',
      roles: ['1', '2']
    },
    children: [
      {
        path: 'index',
        name: 'news_hot',
        component: () => import('@/views/news_hot/index'),
        meta: {
          title: '热点新闻管理',
          icon: 'dashboard',
          roles: ['1', '2']
        }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/user_account',
    name: 'user_account',
    meta: {
      title: '用户账号管理',
      icon: 'peoples',
      roles: ['1']
    },
    children: [
      {
        path: 'user_add',
        name: 'user_add',
        component: () => import('@/views/user/user_add/index'),
        meta: {
          title: '添加账号',
          icon: 'adduser',
          roles: ['1']
        }
      },
      {
        path: 'user_account/:user_id',
        name: 'user_account',
        component: () => import('@/views/user/user_account/index'),
        meta: {
          title: '账号角色管理',
          icon: 'role',
          roles: ['1']
        }
      },
      {
        path: 'user_info',
        name: 'user_info',
        component: () => import('@/views/user/user_info/index'),
        meta: {
          title: '账号信息管理',
          icon: 'info',
          roles: ['1']
        }
      }
    ]
  },

  {
    path: '/personal_center',
    component: Layout,
    meta: {
      title: '个人信息',
      icon: 'user',
      roles: ['1', '2', '3']
    },
    children: [
      {
        path: 'index',
        name: 'personal_center',
        component: () => import('@/views/personal_center/index'),
        meta: {
          title: '个人信息',
          icon: 'user',
          roles: ['1', '2', '3']
        }
      }
    ]
  },

  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

// 实例化vue时只挂载通用的路由表
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
