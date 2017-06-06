<template>
	<div>
		<el-row type="flex" class="page-header">
			<span class="header-text">
				<i class="el-icon-setting"></i> 用户管理
			</span>
			<el-button style="margin-left: auto;" @click="addUser" size="small" icon="plus">添加</el-button>
		</el-row>
		<el-table :data="tableData" style="width: 100%">
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
						<el-button @click="editUser(scope.row)" size="small" icon="edit" title="编辑"></el-button>
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
						<el-checkbox-group v-model="editForm.roles">
							<div>
								<el-checkbox label="超管"></el-checkbox>
							</div>
							<div>
								<el-checkbox label="倒三角项目管理"></el-checkbox>
							</div>
							<div>
								<el-checkbox label="支点项目管理"></el-checkbox>
							</div>
							<div>
								<el-checkbox label="CMDB项目开发"></el-checkbox>
							</div><div>
								<el-checkbox label="CMDB项目开发"></el-checkbox>
							</div><div>
								<el-checkbox label="CMDB项目开发"></el-checkbox>
							</div><div>
								<el-checkbox label="CMDB项目开发"></el-checkbox>
							</div><div>
								<el-checkbox label="CMDB项目开发"></el-checkbox>
							</div><div>
								<el-checkbox label="CMDB项目开发"></el-checkbox>
							</div><div>
								<el-checkbox label="CMDB项目开发"></el-checkbox>
							</div><div>
								<el-checkbox label="CMDB项目开发"></el-checkbox>
							</div><div>
								<el-checkbox label="CMDB项目开发"></el-checkbox>
							</div><div>
								<el-checkbox label="CMDB项目开发"></el-checkbox>
							</div><div>
								<el-checkbox label="CMDB项目开发"></el-checkbox>
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
	export default {
		name: 'userCfg',
		data() {
			return {
				showUserInfoDialog: false,
				formLabelWidth: '80px',
				tableData: [{
					account: 'root',
					name: 'ROOT',
					pass: '',
					roles: ['超管'],
					status: 'enable',
					decryptPass: 'i3i2o4u'
				}, {
					account: 'lide',
					name: '李德',
					pass: '',
					roles: ['超管'],
					status: 'enable',
					decryptPass: 'i3i2o4u'
				}, {
					account: 'liangnuan',
					name: '梁暖',
					pass: '',
					roles: ['倒三角项目管理', '支点项目管理'],
					status: 'enable',
					decryptPass: 'i3i2o4u'
				}, {
					account: 'hufang',
					name: '胡芳',
					pass: '',
					roles: ['CMDB项目开发'],
					status: 'disable',
					decryptPass: 'i3i2o4u'
				}],
				editForm: {
					account: '',
					name: '',
					roles: [],
					status: ''
				}
			}
		},
		methods: {
			addUser() {
				this.showUserInfoDialog = true
				this.editForm.status='enable'
			},
			editUser(row) {
				this.showUserInfoDialog = true
				this.editForm = {
					account: row.account,
					name: row.name,
					roles: row.roles,
					status: row.status
				}
			},
			cleanEditForm() {
				this.editForm = {
					account: '',
					name: '',
					roles: [],
					status: ''
				}
			},
			submitUser() {
				this.showUserInfoDialog = false
				console.log('userCfg.submitUser')
				this.cleanEditForm()
			},
			resetPass(row) {
				this.$message({
					message: '密码已重置为123456Ab！',
					type: 'success',
				});
			},
			refreshDecryptPass(row) {
				row.decryptPass = 'NEW123'
				this.$message({
					message: '已更新<' + row.account + '>账号二级密码！',
					type: 'success',
				});
			},
			userStatus(row) {
				return row.status == 'enable'
			}
		},
		computed: {

		}
	}
</script>

<style scoped>
	
	
	.user-role {
		padding-left: 30px;
		max-height: 300px;
	}
</style>