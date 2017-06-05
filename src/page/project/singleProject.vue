<template>
	<div>
		<header>
			<h4>{{pname}}</h4></header>
		<main>
			<el-row>
				<el-col :span="24">
					<el-collapse v-model="activeNames" @change="handleChange">
						<el-collapse-item title="132.121.92.165" name="1">
							<el-col :span="18" class="project-content">
								<p>作用：广东ITSM负载均衡域</p>
								<p>配置：centos 6.2</p>
							</el-col>
							<el-col :span="6" style="text-align: right;">
								<el-button size="small" data-cur-project="165" @click="handleAdd($event)">新增</el-button>
							</el-col>
							<el-col :span="24" class="account-table">
								<el-table :data="tableData">
									<el-table-column prop="account" label="账号" width="150">
									</el-table-column>
									<el-table-column prop="desc" label="说明">
									</el-table-column>
									<el-table-column prop="tag" label="标签" width="100" :filters="[{ text: '主应用', value: '主应用' }, { text: '数据库', value: '数据库' },{ text: '接口', value: '接口' },{ text: '进程', value: '进程' }]" :filter-method="filterTag" filter-placement="bottom-end">
										<template scope="scope">
											<el-tag :type="scope.row.tag === 'ITSM' ? 'primary' : 'success'" close-transition>{{scope.row.tag}}</el-tag>
										</template>
									</el-table-column>
									<el-table-column label="操作" width="250">
										<template scope="scope">
											<el-button @click="handleView(scope.$index, scope.row)" size="small">查看密码</el-button>
											<el-button @click="handleEdit(scope.$index, scope.row)" size="small">修改</el-button>
											<el-button @click="handleDelete(scope.$index, scope.row)" :plain="true" type="danger" size="small">删除</el-button>
										</template>
									</el-table-column>
								</el-table>
							</el-col>
						</el-collapse-item>
						<el-collapse-item title="132.121.92.166" name="2">
							<el-col :span="18" class="project-content">
								<p>作用：广东ITSM应用域</p>
								<p>配置：centos 6.2</p>
							</el-col>
							<el-col :span="6" style="text-align: right;">
								<el-button size="small" data-cur-project="166" @click="handleAdd">新增</el-button>
							</el-col>
						</el-collapse-item>
					</el-collapse>
				</el-col>
			</el-row>
		</main>
		<el-dialog title="添加账号" :visible.sync="showAddDialog" @close="handleFlagInit" top="10%">
			<el-form :model="form">
				<el-form-item label="账号" :label-width="formLabelWidth">
					<el-input v-model="form.account" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" :label-width="formLabelWidth">
					<el-input type="password" v-model="form.newpass" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="重复密码" :label-width="formLabelWidth">
					<el-input type="password" v-model="form.newpass2" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="标签" :label-width="formLabelWidth">
					<el-select v-model="form.tag" placeholder="选择标签">
						<el-option label="数据库" value="应用"></el-option>
						<el-option label="应用" value="数据库"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="说明" :label-width="formLabelWidth">
					<el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 4}"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="showAddDialog = false">取消</el-button>
				<el-button type="primary" @click="submitAdd">确定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="编辑账号" :visible.sync="showEditDialog" @close="handleFlagInit" top="2%">
			<el-form :model="editform">
				<el-form-item label="账号" :label-width="formLabelWidth">
					<el-input v-model="editform.account" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="旧密码" :label-width="formLabelWidth">
					<el-input type="password" v-model="editform.oldpass" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" :label-width="formLabelWidth">
					<el-input type="password" v-model="editform.newpass" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="重复密码" :label-width="formLabelWidth">
					<el-input type="password" v-model="editform.newpass2" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="标签" :label-width="formLabelWidth">
					<el-select v-model="editform.tag" placeholder="选择标签">
						<el-option label="数据库" value="数据库"></el-option>
						<el-option label="进程" value="进程"></el-option>
						<el-option label="接口" value="接口"></el-option>
						<el-option label="主应用" value="主应用"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="说明" :label-width="formLabelWidth">
					<el-input type="textarea" v-model="editform.desc" :autosize="{ minRows: 4, maxRows: 4}"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="showEditDialog = false">取消</el-button>
				<el-button type="primary" @click="submitEdit">确定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="查看密码" :visible.sync="showViewDialog" @close="handleFlagInit" :close-on-click-modal=false>
			<el-form :model="viewform">
				<el-form-item label="账号" :label-width="formLabelWidth">
					<p>{{viewform.account}}</p>
				</el-form-item>
				<el-form-item label="密码" :label-width="formLabelWidth">
					<el-col :span="10">
						<p v-if="viewform.showPass">{{viewform.pass}}</p>
						<el-input v-else placeholder="请输入二级密码" v-model="viewform.decryptPass">
						</el-input>
					</el-col>
					<!--<el-button v-if="!viewform.showPass" :disabled="!canVerify" @click="confirmVerificationCode">生成验证码（{{verifyInterval}}）</el-button>-->
					<el-button v-if="!viewform.showPass" type="primary" @click="confirmDecryptPass">确定</el-button>
				</el-form-item>
			</el-form>

		</el-dialog>
	</div>

</template>

<script>
	export default {
		name: 'singleProject',
		data() {
			return {
				pid: null,
				pname: null,
				activeNames: ['1'],
				tableData: [{
					account: 'itsm',
					pass: 'itsm8392',
					desc: '普通账号',
					tag: '主应用',
					project: '165'
				}, {
					account: 'root',
					pass: 'root123',
					desc: '超级账号超级账号超级账号超级账号超级账号超级账号超级账号超级账号超级账号超级账号超级账号超级账号超级账号超级账号超级账号超级账号超级账号超级账号超级账号超级账号超级账号',
					tag: '数据库',
					project: '165'
				}, {
					account: 'test',
					pass: 'test091',
					desc: '测试账号',
					tag: '主应用',
					project: '165'
				}, {
					account: 'mini',
					pass: 'mini12094',
					desc: '迷你账号',
					tag: '接口',
					project: '165'
				}],
				form: {
					account: '',
					newpass: '',
					newpass2: '',
					tag: '',
					desc: ''
				},
				editform: {
					account: '',
					pass: '',
					oldpass: '',
					newpass: '',
					newpass2: '',
					tag: '',
					desc: ''
				},
				viewform: {
					account: '',
					pass: '',
					decryptPass: '',
					showPass: false
				},
				formLabelWidth: '100px',
				showAddDialog: false,
				showEditDialog: false,
				showViewDialog: false,
				canVerify: true,
				verifyInterval: 60,
				curProject: null,
				curAccount: null,
				action: null
			}
		},
		created() {
			this.fetchData()
		},
		methods: {
			fetchData() {
				this.pid = this.$route.params.pid
				this.pname = this.$route.params.pname
			},
			filterTag(value, row) {
				return row.tag === value;
			},
			handleChange() {

			},
			handleAdd(event) {
				this.showAddDialog = true
				this.curProject = event.currentTarget.dataset.curProject
				this.action = 'add'
			},
			handleView(index, row) {
				this.showViewDialog = true
				this.curAccount = row.account
				this.curProject = row.project
				this.action = 'view'

				this.viewform.account = row.account
				this.viewform.pass = row.pass
			},
			handleEdit(index, row) {
				this.showEditDialog = true
				this.curAccount = row.account
				this.curProject = row.project
				this.action = 'edit'

				this.editform.account = row.account
				this.editform.pass = row.pass
				this.editform.tag = row.tag
				this.editform.desc = row.desc
			},
			handleDelete(index, row) {
				this.curAccount = row.account
				this.curProject = row.project
				this.action = 'delete'
				this.$confirm('删除账号 ' + this.curAccount + ', 是否确定?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: this.curAccount + '账号删除成功'
					});
					this.handleFlagInit()
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消删除'
					});
					this.handleFlagInit()
				});

			},
			handleFlagInit() {
				this.action = null
				this.curProject = null
				this.curAccount = null
				this.canVerify = true
				this.verifyInterval = 60
				this.form = {
					account: '',
					newpass: '',
					newpass2: '',
					tag: '',
					desc: ''
				}
				this.editform = {
					account: '',
					oldpass: '',
					newpass: '',
					newpass2: '',
					tag: '',
					desc: ''
				}
				this.viewform = {
					account: '',
					pass: '',
					decryptPass: '',
					showPass: false
				}
			},
			submitAdd(){
				this.showAddDialog = false
			},
			submitEdit(){
				this.showEditDialog = false
			},
			confirmDecryptPass() {
				console.log(this.viewform)
				//判断用户decryptPass
				this.viewform.showPass = true
			}
		}
	}
</script>
<style scoped>
	.account-table,
	.project-content {
		margin-bottom: 10px;
	}
	
	p {
		margin: 0;
		padding: 0;
	}
</style>