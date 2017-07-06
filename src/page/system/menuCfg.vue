<template>
	<div>
		<el-row type="flex" class="page-header">
			<span class="header-text">
				<i class="el-icon-setting"></i> 菜单配置
			</span>
		</el-row>
		<el-row>
			<el-col :span="12" class="menu-tree">
				<h4><el-input size="small" placeholder="输入关键字" v-model="filterText">
				</el-input></h4>

				<el-tree class="filter-tree" :data="menuTree" :props="defaultProps" default-expand-all :expand-on-click-node="false" :filter-node-method="filterNode" ref="menu" :render-content="renderContent" @node-click="clickNode($event)">
				</el-tree>
			</el-col>
			<el-col :span="12" class="menu-info">
				<h4>信息<el-button size="small" class="right" :style="{ visibility: showMenuForm!=null?'visible':'hidden'}">保存</el-button></h4>
				<div class="menu-info-content">
					<div :style="{ visibility: showMenuForm!=null?'visible':'hidden'}">
						<el-form :rules="menuRules" label-position="left" label-width="60px" :model="menuForm">
							<el-form-item label="名称" prop="name">
								<el-input v-model="menuForm.name"></el-input>
							</el-form-item>
							<el-form-item label="描述" prop="desc">
								<el-input type="textarea" :autosize="{ minRows: 3, maxRows: 3}" placeholder="请输入内容" v-model="menuForm.desc">
								</el-input>
							</el-form-item>
							<el-form-item label="排序" prop="order">
								<el-input v-model.number="menuForm.order"></el-input>
							</el-form-item>
							<el-form-item label="URL" prop="url">
								<el-input type="textarea" :autosize="{ minRows: 3, maxRows: 3}" placeholder="请输入内容" v-model="menuForm.url">
								</el-input>
							</el-form-item>
							<el-form-item label="标签">
								<el-tag :key="tag" class="menu-form-tag" v-for="(tag, index) in menuForm.tags" :type="tagsType[index%3]" :closable="true" :close-transition="false" @close="handleClose(tag)">
									{{tag}}
								</el-tag>
								<el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm()" @blur="handleInputConfirm()">
								</el-input>
								<el-button v-else class="button-new-tag" size="mini" @click="showInput">+ 自定义</el-button>
							</el-form-item>

						</el-form>
						<div style="display: flex;justify-content: flex-end;">

						</div>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import menuService from '../../api/menuService'

	export default {
		name: 'menuCfg',
		watch: {
			filterText(val) {
				this.$refs.menu.filter(val);
			}
		},

		methods: {
			fetchData() {
				menuService.getMenuTree().then(resp => {
					this.menuTree = resp.data
				});
			},
			clickNode(event) {
				this.showMenuForm = event.id
				this.menuForm = {
					id: event.id,
					name: event.name,
					url: event.url,
					order: event.order,
					desc: event.desc,
					tags: event.tags
				}
			},
			filterNode(value, data) {
				if(!value) return true;
				return data.label.indexOf(value) !== -1;
			},
			append(store, data, event) {
				event.stopPropagation();
				//				store.append({
				//					id: id++,
				//					label: 'testtest',
				//					children: []
				//				}, data);
			},
			remove(store, data, event) {
				event.stopPropagation();
				store.remove(data);
			},
			renderContent(h, {
				node,
				data,
				store
			}) {
				if(!node.data.noChild) {
					return(<span>
            <span>
              <span>{node.label}</span>
            </span>
            <span style="float: right; margin-right: 20px">
              <el-button size="mini" on-click={ () => this.append(store, data, event) } >New Child</el-button>
            </span>
          </span>);
				} else {
					return(<span>
            <span>
              <span>{node.label}</span>
            </span>
          </span>);
				}
			},
			handleClose(tag) {
				this.menuForm.tags.splice(this.menuForm.tags.indexOf(tag), 1);
			},

			showInput() {
				this.inputVisible = true;
				this.$nextTick(_ => {
					this.$refs.saveTagInput.$refs.input.focus();
				});
			},
			handleInputConfirm() {
				let inputValue = this.inputValue;
				if(this.menuForm.tags.indexOf(inputValue)<0 && inputValue) {
					this.menuForm.tags.push(inputValue);
				}
				this.inputVisible = false;
				this.inputValue = '';
			}
		},
		created() {
			this.fetchData()
		},
		data() {
			var checkOrder = (rule, value, callback) => {
				if(!value) {
					callback(new Error('不能为空'));
				} else if(!Number.isInteger(value)) {
					callback(new Error('请输入数字值'));
				} else {
					callback();
				}

			};
			return {
				showMenuForm: null,
				filterText: '',
				tagsType: ['primary', 'success', 'warning'],
				menuForm: {},
				menuTree: [],
				defaultProps: {
					children: 'children',
					label: 'name'
				},
				menuRules: {
					order: [{
						validator: checkOrder,
						trigger: 'blur'
					}]
				},
				inputVisible: false,
				inputValue: ''
			};
		}
	}
</script>

<style scoped>
	h4 {
		padding: 5px 10px;
		margin: 0;
		background-color: #eef1f6;
		color: #48576a;
		border-bottom: 1px solid #d1dbe5;
		height: 28px;
		display: flex;
		align-items: center;
	}
	
	h4 .right {
		margin-left: auto;
	}
	
	.menu-tree {
		border: 1px solid #d1dbe5;
		border-right: 0;
	}
	
	.menu-tree .el-tree {
		height: 450px;
		border: 0;
	}
	
	.menu-info {
		border: 1px solid #d1dbe5;
	}
	
	.menu-info h5 {
		margin: 10px;
	}
	
	.menu-info .menu-info-content {
		padding: 0 20px;
		height: 450px;
		overflow-y: auto;
	}
	
	.menu-info .menu-form-tag {
		margin: 2px;
	}
	
	.menu-info .el-form-item {
		margin-top: 5px;
	}
	.menu-info .input-new-tag{
		width:80px
	}
</style>