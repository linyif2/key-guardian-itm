import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		component: App,
		children: [{
				path: '/login', //登录
				meta: {
					auth: false
				},
				component: resolve => require(['@/page/login'], resolve)
			},
			{
				path: '/',
				component: resolve => require(['@/page/main'], resolve),
				meta: {
					requireAuth: true,
				},
				children: [{
						path: 'project',
						component: resolve => require(['@/page/project/project'], resolve)
					},
					{
						path: 'project/:pid',
						name: 'singleProject',
						component: resolve => require(['@/page/project/singleProject'], resolve)
					},
					{
						path: 'system',
						component: resolve => require(['@/page/system/system'], resolve)
					},
					{
						path: 'system/menuCfg',
						component: resolve => require(['@/page/system/menuCfg'], resolve)
					},
					{
						path: 'system/userCfg',
						component: resolve => require(['@/page/system/userCfg'], resolve)
					},
					{
						path: 'system/roleCfg',
						component: resolve => require(['@/page/system/roleCfg'], resolve)
					}

				]
			},
			{
				path: '*', //其他页面，强制跳转到登录页面
				redirect: '/login'
			}
		]
	}]
})