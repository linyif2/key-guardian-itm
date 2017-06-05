<template>
	<div id="">
		<header class="header">
			<el-row type="flex" class="login-bg" justify="center" align="middle">
				<div class="login-frame">
					<h3 style="text-align: center;">这是个神奇の系统</h3>
					<el-alert v-if="loginForm.error!=''" :title="loginForm.error" type="warning" show-icon :closable=false></el-alert>
					<el-form :model="loginForm" ref="loginForm" :rules="validateRule">
						<el-form-item label="账号" prop="account">
							<el-input type="text" v-model="loginForm.account"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="password">
							<el-input type="password" v-model="loginForm.password"></el-input>
						</el-form-item>

						<el-form-item>
							<el-button type="success" class="btn" @click="submitForm('loginForm')">登录</el-button>
						</el-form-item>
					</el-form>
				</div>
			</el-row>
		</header>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import { USER_SIGNIN } from '../store/user'
	export default {
		name: 'login',
		data() {
			var checkAccount = (rule, value, callback) => {
				if(!value) {
					return callback(new Error('请输入账号'));
				} else {
					callback();
				}
			};
			var checkPass = (rule, value, callback) => {
				if(!value) {
					callback(new Error('请输入密码'));
				} else {
					callback();
				}
			};
			return {
				loginForm: {
					account: '',
					password: '',
					error: '',
					token: ''
				},
				validateRule: {
					password: [{
						validator: checkPass,
						trigger: 'blur'
					}],
					account: [{
						validator: checkAccount,
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			...mapActions([USER_SIGNIN]),
			submitForm(formName) {
				var _this = this
				_this.loginForm.token = "FEW0F9WU92J4"
				_this.$refs[formName].validate((valid) => {
					if(valid) {
						console.log('submit:', _this.loginForm);
						_this.USER_SIGNIN({
							account: _this.loginForm.account,
							token: _this.loginForm.token
						})
						_this.$router.replace({
							path: '/main/project'
						})
					} else {
						console.log('error submit');
						_this.setErrorMessage('账号或密码错误')
						return false;
					}
				});
			},
			setErrorMessage(msg) {
				this.loginForm.error = msg
			}
		}
	}
</script>

<style scoped>
	.login-bg {
		height: 500px;
	}
	
	.login-frame {
		background-color: #f9f9f9;
		border: 1px solid #d8dee2;
		padding: 20px;
		min-width: 300px;
	}
	
	.btn {
		width: 100%;
	}
</style>