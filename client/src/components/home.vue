<template>
    <div>
        <div class="home__title title">
            <div class="home__title_text">
                Home
            </div>
        </div>
        <div class="home__tweet">
            <div class="home__tweet_img">
                <div class="site-icon">
                    <img src="../assets/default-user-image.png" alt="">
                </div>
            </div>
            <div class="home__tweet_main">
                <div class="home__tweet_main_input">
                    <textarea cols="30" rows="10" placeholder="Type something.." v-model="text"></textarea>
                </div>
                <div class="home__tweet_main_manage">
                    <div class="home__tweet_main_manage_icons">

                    </div>
                    <div class="home__tweet_main_manage_btn">
                        <button class="site-button" :disabled="disableButton" @click="send">
                            tweet
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="home__posts">
            <post v-for="(post, index) in posts" :key="`post#${index}`" :post="post"></post>
        </div>
    </div>
</template>

<script>
import post from './post'
import { mapState } from 'vuex';

export default {
    data(){
        return{
            text: null,
            posts: null
        }
    },
    computed:{
        disableButton(){
            return !Boolean(this.text);
        },
        ...mapState({
            author: state => state.user.user.id,
            authorAlias: 'author',
        }),
    },
    methods:{
        send(){
            let data = { text: this.text, author: this.author };
            let router = this.$router;

            axios({
                method: 'post',
                url: 'http://localhost:3000/posts/',
                data: data
            })
                .then(response => {
                    router.go();
                })
                .catch(err => {
                    this.$store.commit('SET_ERROR', error.response.data.message);
                })
        }
    },
    created(){
        axios({
                method: 'get',
                url: 'http://localhost:3000/posts/'
            })
                .then(response => {
                    this.posts = response.data.posts;
                })
                .catch(err => {
                    this.$store.commit('SET_ERROR', error.response.data.message);
                })
    },
    components:{
        post
    }
}
</script>

<style lang="scss" scoped>
    .home__tweet{
        display: flex;
        height: 6.5rem;
        padding: 10px 0;
        border-bottom: 3px solid $light-grey;
        margin-bottom: 20px;
    }

    .home__tweet_img{
        margin-right: 25px;
    }
    .home__tweet_main{
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .home__tweet_main_input{
        height: 100%;
        margin-bottom: 5px;
    }
    .home__tweet_main_manage{
        display: flex;
        justify-content: space-between;
    }
</style>