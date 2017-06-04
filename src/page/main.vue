<template>
	<div id="">
		<header class="header">
			<el-row>
				<el-col :span="24">
					<el-menu default-active="1" class="el-menu-nav" mode="horizontal" @select="" :router="true">
						<span class="header">
							Key Guardian
						</span>
						<el-menu-item index="1" :route="{name:'project'}">项目主页</el-menu-item>
						<el-menu-item index="2" :route="{name:'system'}">系统管理</el-menu-item>
						<el-menu-item class="right" index="3" :route="{name:'index'}">退出</el-menu-item>
					</el-menu>
				</el-col>
			</el-row>
		</header>
		<main>
			<router-view></router-view>
		</main>

	</div>
</template>

<script>
	export default {
		name: 'main'
	}
</script>

<style scoped>
	.el-menu-nav {
		display: flex;
	}
	
	.el-menu-nav .header {
		line-height: 60px;
		padding: 0 10px;
	}
	
	.el-menu-nav .right {
		margin-left: auto;
	}
	
	main {
		margin: 10px 0;
	}
</style>