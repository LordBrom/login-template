<template>
	<b-form-group
		:label="label"
		:description="description"
	>
		<b-input v-model="data" :type="type" :state="state" />

		<b-form-invalid-feedback id="input-live-feedback">
			{{ invalidFeedback }}
		</b-form-invalid-feedback>
		<br />
	</b-form-group>
</template>

<script>
	export default {
		name: 'Field',
		props: {
			"label": {
				type: String
			},
			"description": {
				type: String
			},
			"value": {
				type: String
			},
			"type": {
				type: String
			},
			"state": {
				type: Boolean,
				default: null
			},
			"invalidFeedback": {
				type: String
			},
		},
		computed: {
			"data": {
				set(val) {
					this.$emit("input", val);
				},
				get() {
					return this.value;
				}
			}
		}
	}
</script>
