import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.teal.light.compact.css';
import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')