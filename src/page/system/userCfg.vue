<template>
	<div>
		<el-row type="flex" class="page-header">
			<span class="header-text">
				<i class="el-icon-setting"></i> 用户管理
			</span>
			<el-button style="margin-left: auto;" @click="addUser" size="small" icon="plus">添加</el-button>
		</el-row>
		<el-table :data="userList" style="width: 100%">
			<el-table-column prop="account" label="账号">
			</el-table-column>
			<el-table-column prop="name" label="姓名">
			</el-table-column>
			<el-table-column label="状态">
				<template scope="scope"><i :class="userStatus(scope.row)?'el-icon-check':'el-icon-close'"></i></template>
			</el-table-column>
			<el-table-column prop="decryptPass" label="二级密码">
			</el-table-column>
			<el-table-column label="功能">
				<template scope="scope">
					<el-button-group>
						<el-button @click="editUser(scope.row,scope.$index)" size="small" icon="edit" title="编辑"></el-button>
						<el-button @click="resetPass(scope.row)" size="small" icon="setting" title="密码重置"></el-button>
						<el-button @click="refreshDecryptPass(scope.row)" size="small" icon="message" title="更换二级密码"></el-button>
					</el-button-group>

				</template>
			</el-table-column>
		</el-table>

		<el-dialog title="用户信息" :visible.sync="showUserInfoDialog" @close="cleanEditForm">
			<el-row>
				<el-form :model="editForm">
					<el-col :span="14" class="user-form">

						<el-form-item label="账号" :label-width="formLabelWidth">
							<el-input v-model="editForm.account"></el-input>
						</el-form-item>
						<el-form-item label="姓名" :label-width="formLabelWidth">
							<el-input v-model="editForm.name"></el-input>
						</el-form-item>
						<el-form-item label="状态" :label-width="formLabelWidth">
							<el-switch v-model="editForm.status" on-text="启用" off-text="停用" on-color="#13ce66" off-color="#ff4949" on-value="enable" off-value="disable">
							</el-switch>
						</el-form-item>

					</el-col>
					<el-col :span="10" class="user-role">
						<el-checkbox-group v-model="editForm.roles" v-for="role in roleList" :key="role.id">
							<div>
								<el-checkbox :label="role.id">{{role.name}}</el-checkbox>
							</div>
						</el-checkbox-group>
					</el-col>
				</el-form>
			</el-row>

			<div slot="footer" class="dialog-footer">
				<el-button @click="showUserInfoDialog = false">取消</el-button>
				<el-button type="primary" @click="submitUser">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import userService from '../../api/userService'
	import roleService from '../../api/roleService'

	export default {
		name: 'userCfg',
		data() {
			return {
				showUserInfoDialog: false,
				formLabelWidth: '80px',
				userList: [],
				roleList: [],
				workStatus: '',
				editForm: {
					account: '',
					name: '',
					roles: [],
					status: ''
				}
			}
		},
		created() {
			this.fetchData()
		},
		methods: {
			fetchData() {
				userService.listUser().then(resp => {
					this.userList = resp.data
				});
				roleService.listRole().then(resp => {
					this.roleList = resp.data
				});
			},
			addUser() {
				this.showUserInfoDialog = true
				this.editForm.status = 'enable'
				this.workStatus = 'ADD'
			},
			editUser(row, index) {
				this.workStatus = 'EDIT'
				this.showUserInfoDialog = true
				this.editForm = {
					account: row.account,
					name: row.name,
					roles: row.roles,
					status: row.status,
					rowIndex: index
				}
			},
			cleanEditForm() {
				this.workStatus = ''
				this.editForm = {
					account: '',
					name: '',
					roles: [],
					status: ''
				}
			},
			submitUser() {
				this.showUserInfoDialog = false
				if(this.workStatus == 'ADD') {
					console.log('新增用户', this.editForm)
					console.log('后台设置初始密码并返回')
					//POST至后台，新增账号，初始化密码和二级密码，返回账号对象
					var currentUser = {
						"account": "luohaihong",
						"name": "罗海虹",
						"pass": "238e298hf29hf3298",
						"roles": [
							"ROLE_0003",
							"ROLE_0005"
						],
						"status": "enable",
						"decryptPass": "vwe803j"
					}
					this.$message({
						message: '新建成功！初始密码为' + currentUser.pass,
						type: 'success',
					});
				} else if(this.workStatus == 'EDIT') {
					console.log('修改用户', this.editForm)
					
					this.$message({
						message: '修改成功！',
						type: 'success',
					});
				}
				this.fetchData()
				this.cleanEditForm()
			},
			resetPass(row) {
				this.$message({
					message: '密码已重置为123456Ab！',
					type: 'success',
				});
			},
			refreshDecryptPass(row) {
				row.decryptPass = 'pf9w04j92j'
				this.$message({
					message: '已更新<' + row.account + '>账号二级密码！',
					type: 'success',
				});
			},
			userStatus(row) {
				return row.status == 'enable'
			}
		}
	}
</script>

<style scoped>
	.user-role {
		padding-left: 30px;
		min-height: 320px;
		max-height: 320px;
		overflow-y: auto;
	}
</style>