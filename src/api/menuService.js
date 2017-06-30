import ajaxService from './ajaxService'

export default {
	getMenuTree() {
		var param = {
			url:'/static/test/menu-tree.json',
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