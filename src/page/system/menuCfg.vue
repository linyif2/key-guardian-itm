<template>
	<div>
		<el-row type="flex" class="page-header">
			<span class="header-text">
				<i class="el-icon-setting"></i> 菜单配置
			</span>
		</el-row>
		<el-row>
			<el-col :span="12" class="menu-tree">
				<h4><el-input size="small" placeholder="输入关键字进行过滤" v-model="filterText">
				</el-input></h4>

				<el-tree class="filter-tree" :data="data2" :props="defaultProps" default-expand-all :filter-node-method="filterNode" ref="tree2" :expand-on-click-node="false" :render-content="renderContent" @node-click="clickNode($event)">
				</el-tree>
			</el-col>
			<el-col :span="12" class="menu-info">
				<h4>信息<el-button size="small" class="right" :style="{ visibility: showMenuForm!=''?'visible':'hidden'}">编辑</el-button></h4>
				<div class="menu-info-content">
					<div :style="{ visibility: showMenuForm!=''?'visible':'hidden'}">

						<el-form label-position="left" label-width="60px" :model="menuForm">
							<el-form-item label="名称">
								<span>{{menuForm.name}}</span>
							</el-form-item>
							<el-form-item label="标签">
								<span v-for="(tag, index) in menuForm.tags">
									<el-tag class="menu-form-tag" :type="tagsType[index%5]">{{tag}}</el-tag>
								</span>
							</el-form-item>
							<el-form-item label="URL">
								<span>{{menuForm.url}}</span>
							</el-form-item>
							<el-form-item label="描述">
								<span>{{menuForm.desc}}</span>
							</el-form-item>
							<el-form-item label="排序">
								<span>{{menuForm.order}}</span>
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
	export default {
		name: 'menuCfg',
		watch: {
			filterText(val) {
				this.$refs.tree2.filter(val);
			}
		},

		methods: {
			clickNode(event) {
				console.log(event)
			},
			filterNode(value, data) {
				if(!value) return true;
				return data.label.indexOf(value) !== -1;
			},
			append(store, data) {
				store.append({
					id: id++,
					label: 'testtest',
					children: []
				}, data);
			},

			remove(store, data) {
				store.remove(data);
			},
			renderContent(h, {
				node,
				data,
				store
			}) {
				return(<span>
            <span>
              <span>{node.label}</span>
            </span>
            <span style="float: right; margin-right: 20px">
              <el-button size="mini" on-click={ () => this.append(store, data) } >添加子节点</el-button>
              <el-button size="mini" on-click={ () => this.remove(store, data) } >删除</el-button>
            </span>
          </span>);
			}
		},
		data() {
			return {
				showMenuForm: 'testing',
				filterText: '',
				tagsType: ['', 'gray', 'primary', 'success', 'warning'],
				menuForm: {
					name: '菜单1',
					url: '/aofwejio.faw.ewfe/fawe',
					order: '100',
					desc: '描述',
					tags: ['谜团', '节点', '谜团', '节点', '谜团', '节点']
				},
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
		margin-bottom: 5px;
	}
</style>