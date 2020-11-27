import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './form-style.css'
import { ValidationProvider } from 'vee-validate'
import { ValidationObserver } from 'vee-validate'
import './_validations/validations'

import router from './router'
import store from './_store'
import Vuelidate from 'vuelidate'


Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuelidate)

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')