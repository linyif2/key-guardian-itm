<template>
	<div id="">
		<el-row type="flex" justify="center">
			<el-col :span="20">
				<header class="header">
					<el-menu theme="dark" default-active="1" class="el-menu-nav" mode="horizontal" @select="" :router="true">
						<span class="header">
							Key Guardian
						</span>
						<el-menu-item index="1" :route="{path:'/project'}">项目主页</el-menu-item>
						<el-submenu index="2">
							<template slot="title">系统管理</template>
							<el-menu-item index="2-2" :route="{path:'/system/menuCfg'}">菜单配置</el-menu-item>
							<el-menu-item index="2-3" :route="{path:'/system/roleCfg'}">角色配置</el-menu-item>
							<el-menu-item index="2-4" :route="{path:'/system/userCfg'}">用户管理</el-menu-item>
						</el-submenu>
						<el-submenu index="3" class="right user-part">
							<template slot="title">{{user.account}}</template>
							<el-menu-item index="3-1" @click="">个人中心</el-menu-item>

							<el-menu-item index="3-2" @click="logout">退出</el-menu-item>
						</el-submenu>
					</el-menu>

				</header>
				<main>
					<router-view></router-view>
				</main>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import { mapActions } from 'vuex'
	import { USER_SIGNOUT } from '../store/user'
	export default {
		name: 'main',
		computed: mapState({
			user: state => state.user
		}),
		methods: {
			...mapActions([USER_SIGNOUT]),
			logout() {
				this.USER_SIGNOUT()
				this.$router.replace({
					path: '/login'
				})
			}
		}
	}
</script>

<style>
	.el-menu-nav {
		display: flex;
	}
	
	.el-menu-nav .header {
		line-height: 60px;
		padding: 0 20px;
		background-color: #1D8CE0;
		color: #FFFFFF;
	}
	
	.el-menu-nav .user-info {
		line-height: 60px;
		padding: 0 10px;
		font-size: 14px;
	}
	
	.el-menu-nav .right {
		margin-left: auto;
	}
	
	.el-menu-nav .user-part {
		min-width: 100px;
		text-align: center;
	}
	
	.el-menu-item {
		text-align: center;
	}
	.page-header{
		padding: 5px 0 15px;
	}
	.page-header .header-text {
		font-size: 18px;
		font-weight: 600;
	}
	
	main {
		margin: 10px 0;
	}
</style>