import axios from 'axios'
export default {
	post(param) {
		return new Promise(function(resolve, reject) {
			axios.post(param.url, param.data).then(response => {
				resolve(response)
			}).catch(function(err) {
				reject(err);
			});
		});
	},
	get(param) {
		return new Promise(function(resolve, reject) {
			axios.get(param.url, param.data).then(response => {
				resolve(response)
			}).catch(function(err) {
				reject(err);
			});
		});
	}
}