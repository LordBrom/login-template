<template>
	<div class="row">
		<div class="offset-md-3 col-12 col-md-6 mt-5 mb-5">
			<b-card>
				<form @submit.prevent="handleSubmit">
					<h1>Login</h1>
					<span style="color: red">{{ msg }}</span>

					<field
						label="Login"
						type="text"
						v-model="username"
						:state="('email' in errors ? false : null)"
						:invalidFeedback="errors.email"
					></field>

					<field
						label="Password"
						type="password"
						v-model="password"
						:state="('password' in errors ? false : null)"
						:invalidFeedback="errors.password"
					></field>
					<br />
					<b-button @click="handleSubmit">Submit</b-button>
				</form>
			</b-card>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import { login } from '@/api/user'

	export default {
		name: 'Login',
		data() {
			return {
				username: "",
				password: "",
				errors: {},
				msg: null,
			}
		},
		methods: {
			...mapActions({
				'setUser': 'user/set'
			}),
			handleSubmit() {
				this.errors = {};
				this.msg = null;

				if (this.username.length == 0) {
					this.errors.email = 'is required';
				}
				if (this.password.length == 0) {
					this.errors.password = 'is required';
				}
				if (Object.keys(this.errors).length !== 0) {
					return;
				}
				login(this.username, this.password).then((rsp) => {
					this.setUser(rsp.data.user);
					this.$router.push("/");
				})
				.catch(err => {
					switch (err.response.status) {
						case 500:
							this.msg = "Invalid Login"
							break;

						case 422:
							this.errors = err.response.data.errors;
							break;

						default:
							break;
					}
				});
			}
		},
	}
</script>

<style>
</style>
