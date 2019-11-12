import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

import home from './components/home'
import profile from './components/profile'
import settings from './components/settings'
import login from './components/login'
import registration from './components/registration'

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes:[
        {
            path: '/',
            name: 'home',
            component: home
        },
        {
            path: '/profile/:id',
            name: 'profile',
            component: profile,
            props: true
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/registration',
            name: 'registration',
            component: registration
        },
        {
            path: '/settings',
            name: 'settings',
            component: settings
        },
        {
            path: '*',
            component: home
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLogged) {
            next()
            return
        }
        next('/login')
    } else {
        next()
    }
});

export default router;