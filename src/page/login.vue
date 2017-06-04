<template>
	<div id="">
		<header class="header">
			<el-row type="flex" class="login-bg" justify="center" align="middle">
				<div class="login-frame">
					<h3 style="text-align: center;">神奇の系统</h3>
					<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2">
						<el-form-item label="账号" prop="account">
							<el-input type="text" v-model="ruleForm2.account"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="password">
							<el-input type="password" v-model="ruleForm2.password"></el-input>
						</el-form-item>
						<br>
						<el-form-item>
							<el-button type="success" class="btn" @click="submitForm('ruleForm2')">登录</el-button>
						</el-form-item>
					</el-form>
				</div>
			</el-row>
		</header>
	</div>
</template>

<script>
	export default {
		name: 'login',
		data() {
			var checkAccount = (rule, value, callback) => {
				if(!value) {
					return callback(new Error('请输入账号'));
				}
				//				setTimeout(() => {
				//					if(!Number.isInteger(value)) {
				//						callback(new Error('请输入数字值'));
				//					} else {
				//						if(value < 18) {
				//							callback(new Error('必须年满18岁'));
				//						} else {
				//							callback();
				//						}
				//					}
				//				}, 1000);
				else {
					callback();
				}
			};
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else {
					//					if(this.ruleForm2.password !== '') {
					//						this.$refs.ruleForm2.validateField('password');
					//					}
					callback();
				}
			};
			return {
				ruleForm2: {
					password: '',
					account: ''
				},
				rules2: {
					password: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					account: [{
						validator: checkAccount,
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						console.log('submit!');
						this.$router.push({
							name: 'project'
						});
					} else {
						console.log('error submit!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
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