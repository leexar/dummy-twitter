import Vue from 'vue'
import Vuex from 'vuex'
import general from './store/general'
import user from './store/user-store'

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        general,
        user
    }
})