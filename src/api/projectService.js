//import config from '../config'
import axios from 'axios'
export default {
    listProject() {
        return new Promise(function (resolve, reject) {
            axios.get('/static/test/project-list.json', {}).then(response=>{
                 resolve(response)
            }).catch(function(err){
                reject(err);
            });
        });
    },
    listTagOptions() {
        return new Promise(function (resolve, reject) {
            axios.get('/static/test/project-tags.json', {}).then(response=>{
                 resolve(response)
            }).catch(function(err){
                reject(err);
            });
        });
    },
    getProject(id) {
        return new Promise(function (resolve, reject) {
            axios.post('/user', {
                firstName: 'Fred',
                lastName: 'Flintstone'
            }).then(function (response) {
                console.log(response);
            }).catch (function (response) {
                console.log(response);
            });
        });
    }
}