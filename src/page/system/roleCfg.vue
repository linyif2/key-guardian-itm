<template>
	<div>
		<el-row type="flex" class="page-header">
			<span class="header-text">
				<i class="el-icon-setting"></i> 角色配置
			</span>
			<el-button style="margin-left: auto;" @click="submitData()" type="primary" size="small" icon="check">保存</el-button>
		</el-row>
		<el-row>
			<el-col :span="7" class="role-list">
				<h4>角色列表 <el-button @click="addRole()" size="small" icon="plus">新增</el-button></h4>
				<ul>
					<div v-for="role in roleList" :key="role.id">
						<li v-show="roleRename!=role.id" :class="{fix:true,active:roleActive==role.id}" @click="selectRole(role)">{{role.name}}
							<a type="text" class="func" @click="rename(role)">重命名</a>

						</li>
						<li v-show="roleRename==role.id" :class="{active:roleActive==role.id}" @click="selectRole(role)">
							<el-input :id="roleRenameInputId(role.id)" v-model="role.name" placeholder="请输入内容" @blur="saveRename(role)" size="small"></el-input>
						</li>
					</div>

				</ul>
			</el-col>
			<el-col :span="10" class="menu-tree">
				<h4>菜单树</h4>
				<el-tree v-loading="treeLoading" :data="menuTree" show-checkbox node-key="id" :default-expanded-keys="[3]" :props="defaultProps" @check-change="menuChange()" ref="menu">
				</el-tree>
			</el-col>
			<el-col :span="7" class="auth-list">
				<h4>权限列表</h4>
				<el-checkbox-group v-model="roleAuth">
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
	import menuService from '../../api/menuService'
	export default {
		name: 'roleCfg',
		data() {
			return {
				roleActive: '',
				roleRename: '',
				roleAuth: [],
				roleMenu: [],
				roleList: [],
				authList: [],
				menuTree: null,
				treeLoading: false,
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				newRoleCount: 0,
				updatingData: {
					id: null,
					name: null,
					auth: [],
					menu: []
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
				menuService.getMenuTree().then(resp => {
					this.menuTree = resp.data
				});
			},
			selectRole(row) {
				this.roleActive = row.id
				this.roleAuth = row.auth

				this.updatingData.id = row.id
				this.updatingData.name = row.name
				this.updatingData.auth = row.auth

				if(row.id.indexOf('NEW') == 0) return;
				this.treeLoading = true
				this.$refs.menu.setCheckedKeys([]);
				roleService.getRoleMenu().then(resp => {
					this.roleMenu = resp.data.menu
					this.updatingData.menu = this.roleMenu
					this.$refs.menu.setCheckedKeys(this.roleMenu);
					setTimeout(() => {
						this.treeLoading = false;
					}, 1000);
				});
			},
			rename(row) {
				var renameInput = document.getElementById("INPUT-" + row.id).getElementsByTagName("input")[0]
				this.roleRename = row.id
				setTimeout(function(e) {
					renameInput.focus()
				}, 250)
			},
			saveRename(row) {
				this.roleRename = ''
				this.updatingData.name = row.name
			},
			roleRenameInputId(id) {
				return 'INPUT-' + id
			},
			menuChange() {
				this.roleMenu = this.$refs.menu.getCheckedKeys()
			},
			addRole() {
				let newRole = {
					id: 'NEW_' + this.newRoleCount,
					name: '新建角色' + (this.newRoleCount > 0 ? '（' + this.newRoleCount + '）' : '')
				}
				this.roleList.push(newRole)
				this.newRoleCount += 1
				this.selectRole(newRole)
				this.$nextTick(function() {
					this.rename(newRole)
				})
			},
			submitData() {
				if(this.roleActive != '') {
					console.log("保存角色", this.updatingData)
					this.$message({
						message: '保存成功',
						type: 'success',
					});
					this.fetchData()
					let orientRole = {
						id: 'newid',
					}
					this.selectRole(orientRole)
				}else{
					this.$message({
						message: '请选定角色再进行编辑',
						type: 'warning',
					});
				}
			}
		},
		mounted() {
			let _this = this
			document.addEventListener('keyup', function(e) {
				if(e.keyCode == 13) {
					_this.roleRename = ''
				}
			})
		},
		watch: {
			roleAuth: function(val, old) {
				this.updatingData.auth = val
			},
			roleMenu: function(val, old) {
				this.updatingData.menu = val
			}
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
		padding: 0 5px;
		font-size: 14px;
		display: flex;
		align-items: center;
	}
	
	.role-list li.fix {
		padding: 0 10px 0 15px;
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