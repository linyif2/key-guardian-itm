<template>
	<div class="block">
		<router-link to="/main/system/accountCfg">
			<el-button size="large" :plain="true">账号配置</el-button>
		</router-link>
		<router-link to="/main/system/menuCfg">
			<el-button size="large" :plain="true">菜单配置</el-button>
		</router-link>
		<router-link to="/main/system/roleCfg">
			<el-button size="large" :plain="true">角色配置</el-button>
		</router-link>
		<router-link to="/main/system/userCfg">
			<el-button size="large" :plain="true">人员配置</el-button>
		</router-link>
	</div>

</template>

<script>
	export default {
		name: 'system'
	}
</script>

<style>

</style>