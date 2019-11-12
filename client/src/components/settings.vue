<template>
    <div>
        <div class="settings__title title">
            <div class="settings__title_text">
                Settings
            </div>
        </div>
        <div class="settings__main">
            <div class="settings__main_field">
                <input type="text" readonly @blur="closeInput" v-model="name">
                <button class="site-button" @click="openInput">
                    change
                </button>
            </div>
            <div class="settings__main_field">
                <input type="text" readonly @blur="closeInput"  v-model="email">
                <button class="site-button" @click="openInput">
                    change
                </button>
            </div>
            <div class="settings__main_field">
                <input type="password" placeholder="Current password" v-model="currentPassword">
            </div>
            <div class="settings__main_field">
                <input type="submit" value="Save changes" class="site-button" @click="send">
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data(){
        return{
            name: undefined,
            email: undefined, 
            currentPassword: undefined
        }
    },
    computed: {
        ...mapState({
            storeId: state => state.user.user.id,
            storeEmail: state => state.user.user.email,
            storeName: state => state.user.user.name,
        })
    },
    beforeMount(){
        this.name = this.storeName;
        this.email = this.storeEmail;
        this.userId = this.storeId;
    },
    methods:{
        openPasswordChange(e){
            if(!e.currentTarget.getAttribute('readonly'))
                this.passwordChange = true;
        },
        openInput(e){
            let input = e.currentTarget.previousElementSibling;
            if(input.hasAttribute('readonly'))
            {
                input.removeAttribute('readonly');
                input.focus();
            }
        },
        closeInput(e){
            e.currentTarget.setAttribute('readonly', '');
        },
        send(){
            let data = {
                email: this.email,
                name: this.name,
                id: this.storeId,
                currentPassword: this.currentPassword
            }

            axios({
                method: 'put',
                url: `http://localhost:3000/users/${this.storeId}`,
                data: data
            })
                .then(response => {

                })
                .catch(err => {
                    this.$store.commit('SET_ERROR', error.response.data.message);
                })
        }
    }
}
</script>

<style lang="scss" scoped>
.settings__main{
    height: 100%;
}
.settings__main_form{
    display: flex;
    flex-direction: column;
    align-items: center;

    @include media-breakpoint-down(md){
        height: 94%;
    }
}
.settings__main_field{
    display: flex;
    margin-bottom: 15px;
    justify-content: center;

    @include media-breakpoint-down(md){
        display: block;
        &:nth-last-child(3){
            margin-bottom: auto;
        }

        button{
            margin: 0 auto;
        }
    }

    input{
        padding: 3px;
        margin: 0 10px 0 0;

        @include media-breakpoint-down(md){
            margin: 0 0 8px 0;
        }
    }
}
</style>