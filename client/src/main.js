import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router/index'
import Field from './components/Field'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.component('Field', Field);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

new Vue({
  render: h => h(App),
	store,
	router,
}).$mount('#app')
