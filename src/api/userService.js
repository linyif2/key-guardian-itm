import ajaxService from './ajaxService'

export default {
	listUser() {
		var param = {
			url:'/static/test/user-list.json',
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