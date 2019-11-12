<template>
    <header class="">
        <div class="header__container">
            <div class="header__head">
                <router-link to="/home">
                    <div class="site-icon">
                        <font-awesome-icon :icon="['fab', 'react']" class="icon"/>
                    </div>
                </router-link>
            </div>
            <nav class="header__navigation" role="navigation">
                <router-link :to="`/profile/${this.id}`" :class="[currentPage.includes(`/profile/${this.id}`) ? linkActiveClass : '','header__navigation_item_link']">
                    <div class="header__navigation_item_container">
                        <div class="header__navigation_item site-icon">
                            <img src="../assets/default-user-image.png" alt="">
                        </div>
                        <div class="header__navigation_item_text">
                            Profile
                        </div>
                    </div>
                </router-link>
                <router-link v-for="link in navigationLinks" :key="link.to" :to="link.to" :class="[currentPage.includes(link.to) ? linkActiveClass : '','header__navigation_item_link']">
                    <div class="header__navigation_item_container">
                        <div class="header__navigation_item site-icon">
                            <font-awesome-icon :icon="link.icon" class="icon"/>
                        </div>
                        <div class="header__navigation_item_text">
                            {{ link.text }}
                        </div>
                    </div>
                </router-link>
                <div class="header__navigation_item_link" @click.prevent="logOut">
                    <div class="header__navigation_item_container">
                        <div class="header__navigation_item site-icon">
                            <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="icon"/>
                        </div>
                        <div class="header__navigation_item_text">
                            Exit
                        </div>
                    </div>
                </div>
            </nav>
            <div class="header__bottom">
                <div class="header__bottom_btn">
                    <button class="site-button">
                        tweet
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data(){
        return{
            linkActiveClass: 'active'
        }
    },
    computed:{
        ...mapState({
            id: state => state.user.user.id,
            idAlias: 'id',
        }),
        navigationLinks(){
            return [
                {
                    to: '/home',
                    text: 'Home',
                    icon: ['fas', 'home']
                },
                {
                    to: '/settings',
                    text: 'Settings',
                    icon: ['fas', 'cog']
                }
            ]
        },
        currentPage(){
            return this.$route.path;
        }
    },
    methods:{
        logOut(){
            this.$store.dispatch("LOG_OUT").then(() => this.$router.push('/'));
        }
    }
}
</script>

<style lang="scss" scoped>
    header{
        position: fixed !important;
        top: 0;
        bottom: 0;
        left: 0;
        border-right: 1px solid $light-grey;
        overflow-y: auto;
    }
    .header__container{
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 5px 20px;
        width: 275px;
    }

    .header__head{
        padding-bottom: 10px;
        margin-bottom: 10px;
        border-bottom: 1px solid $light-grey;
        width: 100%;

        a{
            color: $main-color;
        }
        .site-icon{
            margin: 0 auto;
        }
    }

    .header__navigation{
        display: flex;
        flex-direction: column;
        margin-bottom: auto;
    }
    .header__navigation_item{
        width: 2rem;
        height: 2rem;
    }
    .header__navigation_item_link{
        flex: 1;
        display: flex;
        margin-bottom: 15px;
        border-radius: 9999px;

        &.active{
            color: $main-color;

            img{
                border: 2px solid $main-color;
                border-radius: 50%;
            }
        }
    }
    .header__navigation_item_container{
        padding: 10px;
        display: flex;
        align-items: center;
    }
    .header__navigation_item_text{
        margin-left: 15px;
    }

    .header__bottom{
        width: 100%;

        .header__bottom_btn{
            width: 100%;

            button{
                margin: 0 auto;
            }
        }
    }

    @include media-breakpoint-down(md){
        .header__navigation_item_text{
            display: none;
        }
        .header__container{
            width: 68px;
            align-items: center;
        }
        .header__bottom{
            width: auto;
        }
    }

    @media (hover: hover){
        .header__navigation_item_link:not(.active):hover{
            color: white;
            background-color: $main-color;
        }
    }
</style>