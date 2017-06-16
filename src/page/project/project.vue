<template>
	<div class="project-main">
		<el-row type="flex" class="page-header">
			<span class="header-text">
				<i class="el-icon-menu"></i> 项目一览
			</span>
		</el-row>
		<el-table :data="projectList" border style="width: 100%" highlight-current-row @row-click="handleCurrentChange">
			<el-table-column prop="name" label="名称" width="200">
			</el-table-column>
			<el-table-column prop="desc" label="说明">
			</el-table-column>
			<el-table-column prop="tag" label="标签" width="200" :filters="filterTagOptions" :filter-method="filterByTag" filter-placement="bottom-end">
				<template scope="scope">
					<el-tag v-for="(item,index) in scope.row.tag" :type="tagsType[index%3]" close-transition>{{item}}</el-tag>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import projectService from '../../api/projectService'
	export default {
		name: 'project',
		data() {
			return {
				tagsType: ['primary', 'success', 'warning'],
				filterTagOptions: [],
				projectList: []
			}
		},
		created() {
			projectService.listProject().then(resp => {
				//console.log(resp.data)
				this.projectList = resp.data
			});
			projectService.listTagOptions().then(resp => {
				//console.log(resp.data)
				this.filterTagOptions = resp.data
			});
		},
		methods: {
			filterByTag(value, row) {
				return row.tag.indexOf(value) >= 0;
			},
			handleCurrentChange(val) {
				console.log(val.name + "-" + val.id);
				this.$router.push({
					name: 'singleProject',
					params: {
						pid: val.id,
						pname: val.name
					}
				});
			}
		}
	}
</script>

<style scoped>
	.el-tag {
		margin: 2px;
	}
</style>