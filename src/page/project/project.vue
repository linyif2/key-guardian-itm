<template>
	<div class="project-main">
		<el-table :data="tableData" border style="width: 100%" highlight-current-row @row-click="handleCurrentChange">
			<el-table-column prop="name" label="名称" width="200">
			</el-table-column>
			<el-table-column prop="tag" label="标签" width="100" :filters="[{ text: 'ITSM', value: 'ITSM' }, { text: 'ITMP', value: 'ITMP' }, { text: '公共', value: '公共' }]" :filter-method="filterTag" filter-placement="bottom-end">
				<template scope="scope">
					<el-tag :type="scope.row.tag === 'ITSM' ? 'primary' : 'success'" close-transition>{{scope.row.tag}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="desc" label="说明">
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		name: 'project',
		data() {
			return {
				tableData: [{
					id: '111',
					name: '广东ITSM',
					desc: '略',
					tag: 'ITSM'
				}, {
					id: '112',
					name: '吉林ITSM',
					desc: '略',
					tag: 'ITSM'
				}, {
					id: '113',
					name: '北京ITSM',
					desc: '略',
					tag: 'ITSM'
				}, {
					id: '114',
					name: '集团电渠',
					desc: '略',
					tag: 'ITSM'
				}, {
					id: '115',
					name: '审计平台',
					desc: '略',
					tag: '公共'
				}, {
					id: '116',
					name: '内部项目',
					desc: '略',
					tag: '公共'
				}, {
					id: '117',
					name: 'IT监控系统',
					desc: '略',
					tag: 'ITMP'
				}, {
					id: '118',
					name: 'CMDB',
					desc: '略',
					tag: 'CMDB'
				}]
			}
		},
		methods: {
			filterTag(value, row) {
				return row.tag === value;
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

<style>

</style>