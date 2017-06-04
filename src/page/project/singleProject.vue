<template>
	<div>
		<header>
			<h4>{{pname}}</h4></header>
		<main>
			<el-row>
				<el-col :span="20">
					<el-collapse v-model="activeNames" @change="handleChange">
						<el-collapse-item title="132.121.92.165" name="1">
							<el-col :span="18">
								<p>作用：广东ITSM负载均衡域</p>
								<p>配置：centos 6.2</p>
							</el-col>
							<el-col :span="6" style="text-align: right;">
								<el-button size="small" data-cur-project="165" @click="handleAdd($event)">新增</el-button>
							</el-col>
							<el-col :span="24" class="account-table">
								<el-table :data="tableData">
									<el-table-column prop="account" label="账号" width="100">
									</el-table-column>
									<el-table-column prop="desc" label="说明">
									</el-table-column>
									<el-table-column prop="tag" label="标签" width="100" :filters="[{ text: '应用1', value: '应用1' }, { text: '数据库', value: '数据库' },{ text: '应用2', value: '应用2' }]" :filter-method="filterTag" filter-placement="bottom-end">
										<template scope="scope">
											<el-tag :type="scope.row.tag === 'ITSM' ? 'primary' : 'success'" close-transition>{{scope.row.tag}}</el-tag>
										</template>
									</el-table-column>
									<el-table-column label="操作" width="200">
										<template scope="scope">
											<el-button @click="handleView(scope.$index, scope.row)" size="small">查看</el-button>
											<el-button @click="handleEdit(scope.$index, scope.row)" size="small">修改</el-button>
											<el-button @click="handleDelete(scope.$index, scope.row)" :plain="true" type="danger" size="small">删除</el-button>
										</template>
									</el-table-column>
								</el-table>
							</el-col>
						</el-collapse-item>
						<el-collapse-item title="132.121.92.166" name="2">
							<el-col :span="18">
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
		<el-dialog title="账号信息" :visible.sync="showEditDialog" @close="handleFlagInit">
			<el-form :model="form">
				<el-form-item label="账号" :label-width="formLabelWidth">
					<el-input v-model="form.account" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" :label-width="formLabelWidth">
					<el-input type="password" v-model="form.password" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="重复密码" :label-width="formLabelWidth">
					<el-input type="password" v-model="form.dbpassword" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="标签" :label-width="formLabelWidth">
					<el-select v-model="form.tag" placeholder="选择标签">
						<el-option label="数据库" value="应用"></el-option>
						<el-option label="应用" value="数据库"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="说明" :label-width="formLabelWidth">
					<el-input type="textarea" v-model="form.desc" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="showEditDialog = false">取 消</el-button>
				<el-button type="primary" @click="showEditDialog = false">确 定</el-button>
			</div>
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
					desc: '普通账号',
					tag: '应用1',
					project: '165'
				}, {
					account: 'root',
					desc: '超级账号超级账号超级账号超级账号超级账号超级账号超级账号超级账号超级账号超级账号超级账号超级账号超级账号超级账号超级账号超级账号超级账号超级账号超级账号超级账号超级账号',
					tag: '数据库',
					project: '165'
				}, {
					account: 'test',
					desc: '测试账号',
					tag: '应用2',
					project: '165'
				}, {
					account: 'mini',
					desc: '迷你账号',
					tag: '数据库',
					project: '165'
				}],
				form: {
					account: '',
					password: '',
					dbpassword: '',
					tag: '',
					desc: ''
				},
				formLabelWidth: '100px',
				showEditDialog: false,
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
				this.showEditDialog = true
				this.curProject = event.currentTarget.dataset.curProject
				this.action = 'add'
			},
			handleView(index, row) {
				this.curAccount = row.account
				this.curProject = row.project
				this.action = 'view'
			},
			handleEdit(index, row) {
				this.showEditDialog = true
				this.curAccount = row.account
				this.curProject = row.project
				this.action = 'edit'
			},
			handleDelete(index, row) {
				console.log(event.currentTarget)
				this.curAccount = row.account
				this.curProject = row.project
				this.action = 'delete'
				this.$confirm('删除账号 ' + this.curAccount + ', 是否确认?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
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
				this.form = {
					account: '',
					password: '',
					dbpassword: '',
					tag: '',
					desc: ''
				}
			}
		}
	}
</script>
<style scoped>
	.account-table {
		margin: 10px 0;
	}
	
	p {
		margin: 0;
		padding: 0;
	}
</style>