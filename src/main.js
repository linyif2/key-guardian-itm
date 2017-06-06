// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import routes from './router'
import store from './store'
Vue.config.productionTip = false
Vue.use(ElementUI)
const router = routes
router.beforeEach((to, from, next) => {
	var {
		auth = true
	} = to.meta
	var token = store.state.user.token
	if(auth) { // 判断该路由是否需要登录权限
		if(token) { // 通过vuex state获取当前的token是否存在
			next();
		} else {
			next({
				path: '/login'
			})
		}
	} else {
		next();
	}
})
new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: {
		App
	}
})