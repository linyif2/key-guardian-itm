import Vue from 'vue'
import Router from 'vue-router'
import main from '@/page/main'
import login from '@/page/login'
import project from '@/page/project/project'
import singleProject from '@/page/project/singleProject'
import system from '@/page/system/system'
import accountCfg from '@/page/system/account/accountCfg'
import menuCfg from '@/page/system/menu/menuCfg'
import userCfg from '@/page/system/user/userCfg'
import roleCfg from '@/page/system/role/roleCfg'
Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [{
			path: '/main',
			name: 'main',
			component: main,
			children: [{
					path: 'project',
					name: 'project',
					component: project
				},
				{
					path: 'project/:pid',
					name: 'singleProject',
					component: singleProject
				},
				{
					path: 'system',
					name: 'system',
					component: system
				},
				{
					path: 'system/accountCfg',
					name: 'accountCfg',
					component: accountCfg
				},
				{
					path: 'system/menuCfg',
					name: 'menuCfg',
					component: menuCfg
				},
				{
					path: 'system/userCfg',
					name: 'userCfg',
					component: userCfg
				},
				{
					path: 'system/roleCfg',
					name: 'roleCfg',
					component: roleCfg
				}

			]
		},
		{
			path: '/',
			name: 'index',
			component: login
		},
		{
			path: '/*',
			redirect: {
				path: '/'
			}
		}
	]
})