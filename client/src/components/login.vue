<template>
    <div>
        <div class="form-container">
            <form action="" class="form" @submit.prevent>
                <div class="form-field">
                    <input type="text" placeholder="Email" v-model="email">
                </div>
                <div class="form-field">
                    <input type="password" placeholder="Password" v-model="password">
                </div>
                <div class="form-field">
                    <input type="submit" value="Send" @click="send">
                </div>
                <div class="form-field">
                    <router-link to="/registration">
                        to registration
                    </router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            email: null,
            password: null
        }
    },
    methods:{
        send(){
            this.$store.dispatch('SIGN_IN', {type: 'login', data:{email: this.email, password: this.password}})
                .then(() => this.$router.push('/'));
        }
    }
}
</script>

<style lang="scss" scoped>

</style>