<template>
	<div class="row">
		<div class="offset-md-3 col-12 col-md-6 mt-5 mb-5">
			<b-card>
				<form @submit.prevent="handleSubmit">
					<h1>Sign Up</h1>
					{{msg}}

					<field
						label="Username"
						type="text"
						v-model="username"
						:state="('username' in errors ? false : null)"
						:invalidFeedback="errors.username"
					></field>

					<field
						label="Password"
						type="password"
						v-model="password"
						:state="('password' in errors ? false : null)"
						:invalidFeedback="errors.password"
					></field>

					<field
						label="Confirm"
						type="password"
						v-model="confirm"
						:state="('confirm' in errors ? false : null)"
						:invalidFeedback="errors.confirm"
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

	import { signUp } from '@/api/user'

	export default {
		name: 'SignUp',
		data() {
			return {
				username: "",
				password: "",
				confirm: "",
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
					this.errors.username = 'is required';
				}
				if (this.password.length == 0) {
					this.errors.password = 'is required';
				}
				if (this.confirm.length == 0) {
					this.errors.confirm = 'is required';
				}
				if (this.password !== this.confirm) {
					this.errors.confirm = 'doesn\'t match';
				}
				if (Object.keys(this.errors).length !== 0) {
					return;
				}
				signUp(this.username, this.password)
				.then((rsp) => {
					this.setUser(rsp.data.user);
					this.$router.push("/");
				})
				.catch(err => {
					switch (err.response.status) {
						case 500:
							this.msg = "Oh No"
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
