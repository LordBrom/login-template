import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/components/routes/Main'
import Login from '@/components/routes/Login'
import SignUp from '@/components/routes/SignUp'
//import Settings from '@/components/routes/Settings'

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: "/",
			component: Main
		},
		{
			path: "/login",
			component: Login
		},
		{
			path: "/signup",
			component: SignUp
		},
	]
})
