<template>
	<b-container id="app">
		<nav class="navbar navbar-expand navbar-light fixed-top bg-light">
			<div class="container-fluid">
				<router-link to="/" class="navbar-brand">Home</router-link>
				<div class="collapse navbar-collapse">
					<ul v-if="!user" class="navbar-nav ml-auto">
						<li class="nav-item">
							<router-link to="login" class="nav-link">Login</router-link>
						</li>
						<li class="nav-item">
							<router-link to="signup" class="nav-link">Sign Up</router-link>
						</li>
					</ul>
					<ul v-else class="navbar-nav ml-auto">
						<li class="nav-item">
							<a href="javascript:void(0);" @click="handleLogout" class="nav-link">Logout</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		<router-view></router-view>
	</b-container>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import { getCurrent } from '@/api/user'

	export default {
		methods: {
			...mapActions({
				'setUser': 'user/set',
				'clearUser': 'user/clear'
			}),
			async handleLogout() {
				await this.clearUser();
				this.$router.push("/login");
			},
		},
		computed: {
			...mapGetters({
				'user': 'user/get'
			}),
		},
		mounted() {
		},
		async created() {
			await getCurrent().then(async (rsp) => {
				const user = rsp.data.user;
				await this.setUser(user);
			});
		},
	}
</script>

<style>
	body {
		background-color: grey !important;
	}
	.container {
		margin-top: 56px;
		background-color: white;
	}
</style>
