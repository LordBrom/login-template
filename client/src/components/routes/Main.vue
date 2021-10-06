<template>
	<b-row>
		<template v-if="user">
			You are logged in.
		</template>
		<template v-else>
			You must be logged in.
		</template>
	</b-row>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'

	export default {
		components: {
		},
		data() {
			return {
			}
		},
		methods: {
			...mapActions({
			}),
		},
		computed: {
			...mapGetters({
				'user': 'user/get',
			}),
		},
		mounted() {
		},
	}
</script>
