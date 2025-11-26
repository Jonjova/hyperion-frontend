import Vue from 'vue'
import App from './App.vue'
import router from './../router'
import store from './store'

// PrimeVue para Vue 2
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

// Componentes PrimeVue
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Card from 'primevue/card'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import ProgressSpinner from 'primevue/progressspinner'
import Dialog from 'primevue/dialog'
import Toolbar from 'primevue/toolbar'
import Sidebar from 'primevue/sidebar'
import Menu from 'primevue/menu'

Vue.use(PrimeVue, { ripple: true })
Vue.use(ToastService)

// Registrar componentes
Vue.component('PrimeButton', Button)
Vue.component('PrimeInputText', InputText)
Vue.component('PrimePassword', Password)
Vue.component('PrimeCard', Card)
Vue.component('PrimeDataTable', DataTable)
Vue.component('PrimeColumn', Column)
Vue.component('PrimeToast', Toast)
Vue.component('PrimeProgressSpinner', ProgressSpinner)
Vue.component('PrimeDialog', Dialog)
Vue.component('PrimeToolbar', Toolbar)
Vue.component('PrimeSidebar', Sidebar)
Vue.component('PrimeMenu', Menu)

Vue.config.productionTip = false

// ⚠️ ESTA ES LA PARTE IMPORTANTE
// Esperar a que Vuex restaure token/usuario ANTES de montar Vue
store.dispatch('auth/initializeAuth').then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
