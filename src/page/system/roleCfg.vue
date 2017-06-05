<template>
	<div>
		<el-row>
			<el-col :span="6" class="role-list">
				<h4>角色列表</h4>
				<li>超级管理员</li>
				<li>项目负责人</li>
				<li>开发人员</li>
				<li>运维人员</li>
				<li>游客</li>
			</el-col>
			<el-col :span="13" class="role-content">
				<h4>菜单树</h4>
				<el-tree :data="data2" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]" :props="defaultProps">
				</el-tree>
			</el-col>
			<el-col :span="5" class="auth-list">
				<h4>权限列表</h4>
				<el-checkbox-group v-model="checkList">
					<h5>项目管理</h5>
					<el-checkbox label="编辑账号"></el-checkbox>
					<el-checkbox label="查看密码"></el-checkbox>
					<h5>菜单管理</h5>
					<el-checkbox label="编辑菜单"></el-checkbox>
					<h5>角色管理</h5>
					<el-checkbox label="编辑角色"></el-checkbox>
					<h5>人员管理</h5>
					<el-checkbox label="编辑人员"></el-checkbox>
				</el-checkbox-group>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'roleCfg',
		data() {
			return {
				checkList: [],
				data2: [{
					id: 1,
					label: '一级 1',
					children: [{
						id: 4,
						label: '二级 1-1',
						children: [{
							id: 9,
							label: '三级 1-1-1'
						}, {
							id: 10,
							label: '三级 1-1-2'
						}]
					}]
				}, {
					id: 2,
					label: '一级 2',
					children: [{
						id: 5,
						label: '二级 2-1'
					}, {
						id: 6,
						label: '二级 2-2'
					}]
				}, {
					id: 3,
					label: '一级 3',
					children: [{
						id: 7,
						label: '二级 3-1'
					}, {
						id: 8,
						label: '二级 3-2'
					}]
				}],
				defaultProps: {
					children: 'children',
					label: 'label'
				}
			};
		}
	}
</script>

<style scoped>
	*{list-style: none;}
	.role-list li{
		height: 35px;
		line-height: 35px;
		padding:0 5px;
		font-size: 15px;
	}
	.role-list li:hover{
		background-color: #e5e5e5;
		cursor: pointer;
	}
	.auth-list h5 {
		margin: 10px;
	}
	
	.auth-list .el-checkbox {
		margin: 0 10px;
		display: block;
	}
</style>