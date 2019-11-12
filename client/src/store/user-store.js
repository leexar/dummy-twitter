import Axios from "axios";

export default {
    state:{
        user:{
            id: null,
            name: null,
            email: null
        },
        token: null
    },
    mutations:{
        SET_USER(state, payload){
            state.user = payload;
        },
        SET_TOKEN(state, token){
            state.token = token;
        },
        UNSET_USER(state){
            state.user = null;
            state.token = null;
        }
    },
    actions:{
        SIGN_IN({ commit }, {type, data}){
            return new Promise((resolve, reject) => {
                commit('SET_LOADING', true);
                axios({
                    method: 'post',
                    url: `http://localhost:3000/users/${type}`,
                    data: data
                })
                    .then(response => {
                        let token = response.data.token;
                        commit('SET_USER', response.data.user);
                        commit('SET_TOKEN',  token);
                        localStorage.setItem('token', token);
                        axios.defaults.headers.common['Authorization'] = "Bearer " + token
                        commit('SET_LOADING', false);
                        resolve();
                    })
                    .catch(error => {
                        commit('SET_ERROR', error.response.data.message);
                        localStorage.removeItem('token');
                        commit('SET_LOADING', false);
                        reject(error);
                    });
                commit('SET_LOADING', false);
            })
        },
        RELOAD_USER({ commit }){
            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: `http://localhost:3000/users/reload`,
                })
                    .then(response => {
                        commit('SET_USER', response.data.user);
                        commit('SET_TOKEN', { token: localStorage.getItem('token') });
                        resolve();
                    })
                    .catch(error => {
                        commit('SET_ERROR', error.response.data.message);
                        localStorage.removeItem('token');
                        commit('SET_LOADING', false);
                        reject(error);
                    })
            })
        },
        LOG_OUT({ commit }){
            return new Promise((resolve, reject) => {
                commit('UNSET_USER');
                localStorage.removeItem('token');
                resolve();
            })
        }
    },
    getters:{
        isLogged: (state) => !!state.token
    }
}