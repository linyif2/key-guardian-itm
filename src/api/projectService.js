import ajaxService from './ajaxService'
export default {
	listProject() {
		var param = {
			url:'/static/test/project-list.json',
			data:{}
		}
		return new Promise(function(resolve, reject) {
			ajaxService.get(param).then(response => {
				resolve(response)
			}).catch(function(err) {
				reject(err);
			});
		});
	},
	listTagOptions() {
		var param = {
			url:'/static/test/project-tags.json',
			data:{}
		}
		return new Promise(function(resolve, reject) {
			ajaxService.get(param).then(response => {
				resolve(response)
			}).catch(function(err) {
				reject(err);
			});
		});
	},
	getProject(id) {
		var param = {
			url:'/static/test/project-single.json',
			data:{
				id: id
			}
		}
		return new Promise(function(resolve, reject) {
			ajaxService.get(param).then(response => {
				resolve(response)
			}).catch(function(err) {
				reject(err);
			});
		});
	}
}