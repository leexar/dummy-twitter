<template>
    <div>
        <div class="form-container">
                <div class="form-field">
                    <input type="text" placeholder="Name" v-model="name">
                </div>
                <div class="form-field">
                    <input type="text" placeholder="Id" v-model="userId">
                </div>
                <div class="form-field">
                    <input type="text" placeholder="Email" v-model="email">
                </div>
                <div class="form-field">
                    <input type="password" placeholder="Password" v-model="password">
                </div>
                <div class="form-field">
                    <input type="password" placeholder="Confirm password" v-model="confirmPassword">
                </div>
                <div class="form-field">
                    <input type="submit" value="Send" @click="send()">
                </div>
                <div class="form-field">
                    <router-link to="/login">
                        to login
                    </router-link>
                </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            name: null,
            userId: null,
            email: null,
            password: null,
            confirmPassword: null
        }
    },
    methods:{
        send(){
            if(this.password === this.confirmPassword){
                this.$store.dispatch('SIGN_IN', {type: 'reg', data: {name: this.name, userId: this.userId, email: this.email, password: this.password}})
                    .then(() => this.$router.push('/'));
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>