<template>
	<div>
		<el-row type="flex" class="page-header">
			<span class="header-text">
				<i class="el-icon-setting"></i> 角色配置
			</span>
		</el-row>
		<el-row>
			<el-col :span="7" class="role-list">
				<h4>角色列表 <el-button type="" size="small" icon="plus">新增</el-button></h4>
				<ul>
					<div v-for="role in roleList" :key="role.id">
						<li v-show="roleRename!=role.id" :class="{active:roleActive==role.id}" @click="selectRole(role)">{{role.name}}
							<a type="text" class="func" @click="rename(role)">重命名</a>

						</li>
						<li v-show="roleRename==role.id" :class="{active:roleActive==role.id}" @click="selectRole(role)">
							<el-input :id="roleRenameInputId(role.id)" v-model="role.name" placeholder="请输入内容" @blur="roleRename=''" size="small"></el-input>
						</li>
					</div>

				</ul>
			</el-col>
			<el-col :span="10" class="menu-tree">
				<h4>菜单树</h4>
				<el-tree :data="menuTree" show-checkbox node-key="id" :default-expanded-keys="[ 3]" :default-checked-keys="[5]" :props="defaultProps">
				</el-tree>
			</el-col>
			<el-col :span="7" class="auth-list">
				<h4>权限列表</h4>
				<el-checkbox-group v-model="checkList">
					<h5>项目管理</h5>
					<el-checkbox label="AUTH_0001">账号新增/修改</el-checkbox>
					<el-checkbox label="AUTH_0002">账号删除</el-checkbox>
					<el-checkbox label="AUTH_0003">密码查看</el-checkbox>
					<h5>菜单管理</h5>
					<el-checkbox label="AUTH_0004">菜单编辑</el-checkbox>
					<h5>角色管理</h5>
					<el-checkbox label="AUTH_0005">角色编辑</el-checkbox>
					<h5>用户管理</h5>
					<el-checkbox label="AUTH_0006">用户信息编辑</el-checkbox>
				</el-checkbox-group>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import roleService from '../../api/roleService'
	export default {
		name: 'roleCfg',
		data() {
			return {
				roleActive: '',
				roleRename: '',
				checkList: [],
				roleList: [],
				authList: [],
				menuTree: [{
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
		},
		created() {
			this.fetchData()
		},
		methods: {
			fetchData() {
				roleService.listRole().then(resp => {
					this.roleList = resp.data
				});
			},
			selectRole(row) {
				this.roleActive = row.id
				this.checkList = row.auth
			},
			rename(row) {
				var renameInput = document.getElementById("INPUT-" + row.id).getElementsByTagName("input")[0]
				this.roleRename = row.id
				setTimeout(function(e) {
					renameInput.focus()
				}, 250)
			},
			roleRenameInputId(id) {
				return 'INPUT-' + id
			}
		},
		mounted() {
			let _this = this
			document.addEventListener('keyup', function(e) {
				if(e.keyCode == 13) {
					_this.roleRename = ''
				}
			})
		}
	}
</script>

<style scoped>
	* {
		list-style: none;
	}
	
	h4 {
		padding: 5px 10px;
		margin: 0;
		background-color: #eef1f6;
		color: #48576a;
		border-bottom: 1px solid #d1dbe5;
		line-height: 28px;
	}
	
	h4 button {
		float: right;
	}
	
	.role-list {
		border: 1px solid #d1dbe5;
		border-right: 0;
	}
	
	.role-list ul {
		height: 450px;
		overflow-y: auto;
		padding: 0 10px;
		margin: 0;
	}
	
	.role-list li {
		height: 35px;
		line-height: 35px;
		padding: 0 10px;
		font-size: 15px;
		display: flex;
		align-items: center;
	}
	
	.role-list li .func {
		display: none;
		margin-left: auto;
		font-size: 10px;
	}
	
	.role-list li .rename {
		display: none;
	}
	
	.role-list li:hover {
		background-color: #e4e8f1;
		cursor: pointer;
	}
	
	.role-list li:hover .func {
		display: inline-block;
	}
	
	.role-list li.active {
		background-color: #20a0ff;
		border-color: #0190fe;
		color: #FFFFFF;
	}
	
	.menu-tree {
		border: 1px solid #d1dbe5;
		border-right: 0;
	}
	
	.menu-tree .el-tree {
		height: 450px;
		border: 0;
	}
	
	.auth-list {
		border: 1px solid #d1dbe5;
	}
	
	.auth-list h5 {
		margin: 10px;
	}
	
	.auth-list .el-checkbox-group {
		padding: 0 10px;
		height: 450px;
		overflow-y: auto;
	}
	
	.auth-list .el-checkbox {
		margin: 0 10px;
		display: block;
	}
</style>