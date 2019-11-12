export default {
    state: {
        loading: false,
        error: null
    },
    mutations: {
        SET_LOADING(state, value) {
            state.loading = value;
        },
        SET_ERROR(state, value) {
            state.error = value;
        },
        CLEAR_ERROR(state) {
            state.error = null;
        }
    },
    getters: {
        getLoadingState: (state) => state.loading,
        getError: (state) => state.error
    }
}