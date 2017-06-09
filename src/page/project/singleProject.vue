<template>
	<div>
		<el-row type="flex" class="page-header">
			<span class="header-text">
				<i class="el-icon-menu"></i> 项目一览 > {{pname}}
			</span>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-collapse v-model="activeNames" @change="handleChange">
					<el-collapse-item title="132.121.92.165" name="1">
						<el-col :span="18" class="project-content">
							<p>作用：广东ITSM负载均衡域</p>
							<p>配置：centos 6.2</p>
						</el-col>
						<el-col :span="6" style="text-align: right;">
							<el-button size="small" data-cur-project="165" @click="handleNew($event)">新增</el-button>
						</el-col>
						<el-col :span="24" class="account-table">
							<el-table :data="tableData">
								<el-table-column type="expand">
									<template scope="props">
										<el-form label-position="left" inline class="table-expand">
											<el-form-item :label="item.label" v-for="item in json2obj(props.row.desc)" :key="item.label">
												<span>{{item.text}}</span>
											</el-form-item>
										</el-form>
									</template>
								</el-table-column>
								<el-table-column prop="account" label="账号">
								</el-table-column>
								<el-table-column prop="tag" label="标签" :filters="[{ text: '主应用', value: '主应用' }, { text: '数据库', value: '数据库' },{ text: '接口', value: '接口' },{ text: '进程', value: '进程' }]" :filter-method="filterTag" filter-placement="bottom-end">
									<template scope="scope">
										<el-tag :type="scope.row.tag === 'ITSM' ? 'primary' : 'success'" close-transition>{{scope.row.tag}}</el-tag>
									</template>
								</el-table-column>
								<el-table-column label="操作">
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
							<el-button size="small" data-cur-project="166" @click="handleNew">新增</el-button>
						</el-col>
					</el-collapse-item>
				</el-collapse>
			</el-col>
		</el-row>
		<el-dialog title="添加账号" :visible.sync="showNewDialog" @close="handleFlagInit" top="10%">
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
					<el-table :data="form.desc" style="width: 100%" class="inner-desc">
						<el-table-column label="标签">
							<template scope="scope">
								<el-input size="small" v-model="scope.row.label"></el-input>
							</template>
						</el-table-column>
						<el-table-column label="值">
							<template scope="scope">
								<el-input size="small" v-model="scope.row.text"></el-input>
							</template>
						</el-table-column>
						<el-table-column label="" width="30px">
							<template scope="scope">
								<el-button @click="removeNewDesc(scope.row)" size="small" type="text" icon="close"></el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-button @click="addNewDesc" size="small" icon="plus">新增标签</el-button>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="showNewDialog = false">取消</el-button>
				<el-button type="primary" @click="submitNew">确定</el-button>
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
					<el-table :data="editform.desc" style="width: 100%" class="inner-desc">
						<el-table-column label="标签">
							<template scope="scope">
								<el-input size="small" v-model="scope.row.label"></el-input>
							</template>
						</el-table-column>
						<el-table-column label="值">
							<template scope="scope">
								<el-input size="small" v-model="scope.row.text"></el-input>
							</template>
						</el-table-column>
						<el-table-column label="" width="30px">
							<template scope="scope">
								<el-button @click="removeEditDesc(scope.row)" size="small" type="text" icon="close"></el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-button @click="addEditDesc" size="small" icon="plus">新增标签</el-button>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="showEditDialog = false">取消</el-button>
				<el-button type="primary" @click="submitEdit">确定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="查看密码" :visible.sync="showViewDialog" @close="handleFlagInit">
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
					desc: '[{"label":"部署地址","text":"/abaw"},{"label":"注意事项","text":"重启需申请停机"},{"label":"中间件","text":"tomcat"}]',
					tag: '主应用',
					project: '165'
				}, {
					account: 'root',
					pass: 'root123',
					desc: '[{"label":"部署地址","text":"/abc/eee/d1r/aw"},{"label":"部署策略","text":"负载均衡"},{"label":"中间件","text":"weblogic"}]',
					tag: '数据库',
					project: '165'
				}, {
					account: 'test',
					pass: 'test091',
					desc: '[{"label":"部署地址","text":"/abc/eee/d1r/aw"}]',
					tag: '主应用',
					project: '165'
				}, {
					account: 'mini',
					pass: 'mini12094',
					desc: '[{"label":"别名","text":"MINI Delta"}]',
					tag: '接口',
					project: '165'
				}],
				form: {
					account: '',
					newpass: '',
					newpass2: '',
					tag: '',
					desc: []
				},
				editform: {
					account: '',
					pass: '',
					oldpass: '',
					newpass: '',
					newpass2: '',
					tag: '',
					desc: []
				},
				viewform: {
					account: '',
					pass: '',
					decryptPass: '',
					showPass: false
				},
				formLabelWidth: '100px',
				showNewDialog: false,
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
			handleNew(event) {
				this.showNewDialog = true
				this.curProject = event.currentTarget.dataset.curProject
				this.action = 'New'
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
				this.editform.desc = this.json2obj(row.desc)
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
					desc: []
				}
				this.editform = {
					account: '',
					oldpass: '',
					newpass: '',
					newpass2: '',
					tag: '',
					desc: []
				}
				this.viewform = {
					account: '',
					pass: '',
					decryptPass: '',
					showPass: false
				}
			},
			submitNew() {
				this.showNewDialog = false
			},
			submitEdit() {
				this.showEditDialog = false
			},
			confirmDecryptPass() {
				console.log(this.viewform)
				//判断用户decryptPass
				this.viewform.showPass = true
			},
			json2obj(str) {
				return JSON.parse(str);
			},
			addEditDesc() {
				this.editform.desc.push({
					label: '',
					text: ''
				})
			},
			removeEditDesc(row) {
				var index = this.editform.desc.indexOf(row)
				if(index !== -1) {
					this.editform.desc.splice(index, 1)
				}
			},
			addNewDesc() {
				this.form.desc.push({
					label: '',
					text: ''
				})
			},
			removeNewDesc(row) {
				var index = this.form.desc.indexOf(row)
				if(index !== -1) {
					this.form.desc.splice(index, 1)
				}
			}
		}
	}
</script>
<style>
	.account-table,
	.project-content {
		margin-bottom: 10px;
	}
	
	.project-content p,
	.el-dialog p {
		margin: 0;
		padding: 0;
	}
	
	.table-expand {
		font-size: 0;
	}
	
	.table-expand label {
		width: 90px;
		color: #99a9bf;
	}
	
	.table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 50%;
	}
	
	.inner-desc .cell {
		padding: 0;
	}
	
	.inner-desc td {
		height: auto;
		text-align: center;
	}
</style>