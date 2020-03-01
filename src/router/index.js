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
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '新闻统计', icon: 'dashboard' }
    }]
  },

  {
    path: '/news_category',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'news_category',
        component: () => import('@/views/news_category/index'),
        meta: { title: '新闻分类管理', icon: 'nested' }
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
      icon: 'example'
    },
    children: [
      {
        path: 'news_list',
        name: 'news_list',
        component: () => import('@/views/news_content/news_list/index'),
        meta: { title: '新闻列表', icon: 'table' }
      },
      {
        path: 'news_edit',
        name: 'news_edit',
        component: () => import('@/views/news_content/news_edit/index'),
        meta: { title: '新闻编辑', icon: 'form' }
      }
    ]
  },

  {
    path: '/news_hot',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'news_hot',
        component: () => import('@/views/news_hot/index'),
        meta: { 
          title: '热点新闻管理',
          icon: 'example'

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
      icon: 'example'
    },
    children: [
      {
        path: 'user_add',
        name: 'user_add',
        component: () => import('@/views/user/user_add/index'),
        meta: { title: '添加账号', icon: 'table' }
      },
      {
        path: 'user_account',
        name: 'user_account',
        component: () => import('@/views/user/user_account/index'),
        meta: { title: '账号角色管理', icon: 'table' }
      },
      {
        path: 'user_info',
        name: 'user_info',
        component: () => import('@/views/user/user_info/index'),
        meta: { title: '账号信息管理', icon: 'table' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

/**
 * asyncRoutes
 * 代表那些需求动态判断权限并通过 addRoutes 动态添加的页面
 */
export const asyncRoutes = [
  {
    path: '/news_category',
    component: Layout,
    meta: { roles: ['admin', 'director'] },
    children: [
      {
        path: 'index',
        name: 'news_category',
        component: () => import('@/views/news_category/index'),
        meta: {
          title: '新闻分类管理',
          icon: 'nested'
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
      roles: ['admin']
    },
    children: [
      {
        path: 'news_list',
        name: 'news_list',
        component: () => import('@/views/news_content/news_list/index'),
        meta: {
          title: '新闻列表',
          icon: 'table'
        }
      },
      {
        path: 'news_edit',
        name: 'news_edit',
        component: () => import('@/views/news_content/news_edit/index'),
        meta: {
          title: '新闻编辑',
          icon: 'form'
        }
      }
    ]
  },

  {
    path: '/news_hot',
    component: Layout,
    meta: {
      roles: ['admin']
    },
    children: [
      {
        path: 'index',
        name: 'news_hot',
        component: () => import('@/views/news_hot/index'),
        meta: {
          title: '热点新闻管理',
          icon: 'example'
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
      icon: 'example',
      roles: ['admin']
    },
    children: [
      {
        path: 'user_add',
        name: 'user_add',
        component: () => import('@/views/user/user_add/index'),
        meta: {
          title: '添加账号',
          icon: 'table'
        }
      },
      {
        path: 'user_account',
        name: 'user_account',
        component: () => import('@/views/user/user_account/index'),
        meta: {
          title: '账号角色管理',
          icon: 'table'
        }
      },
      {
        path: 'user_info',
        name: 'user_info',
        component: () => import('@/views/user/user_info/index'),
        meta: {
          title: '账号信息管理',
          icon: 'table'
        }
      }
    ]
  },

  {
    path: '*',
    redirect: '/404',
    hidden: true,
    meta: {
      roles: ['admin']
    }
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
