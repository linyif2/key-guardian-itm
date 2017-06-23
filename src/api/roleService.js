import ajaxService from './ajaxService'

export default {
	listRole() {
		var param = {
			url:'/static/test/role-list.json',
			data:{}
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