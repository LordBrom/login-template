import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
	namespaced: true,
	state: {
		user: null,
	},
	getters: {
		get: state => state.user,
	},
	mutations: {
		set: function(state, user){
			state.user = user;
		},
	},
	actions: {
		set: function (state, user) {
			state.commit('set', user);
			localStorage.setItem('token', user.token);
		},
		clear: function (state) {
			state.commit('set', null);
			localStorage.removeItem('token');
		},
	}
}
