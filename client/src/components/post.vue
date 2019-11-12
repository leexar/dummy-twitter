<template>
    <div class="post">
        <div class="post__image">
            <div class="site-icon">
                <img src="../assets/default-user-image.png" alt="">
            </div>
        </div>
        <div class="post__main">
            <div class="post__main_retweet" v-if="post.retweeted">
                Retweeted
            </div>
            <div class="post__main_author">
                <span class="post__main_author_link">
                    <router-link :to="`/profile/${this.post.author}`">
                        <span class="post__main_author_name">
                            {{ post.author }}
                        </span>
                        <span class="post__main_author_verified">
                            &#8730;
                        </span>
                        <span class="post__main_author_id">
                            @{{ post.author }}
                        </span>
                    </router-link>
                </span>
                <span  class="post__options" v-if="author === post.author" @click="deletePost">
                    delete
                </span>
            </div>
            <div class="post__main_text">
                {{ post.text }}
            </div>
            <div class="post__main_manage">
                <div class="post__main_manage_retweet">
                    <div class="site-icon">
                        <font-awesome-icon :icon="['fas', 'retweet']"/>
                    </div>
                </div>
                <div  class="post__main_manage_like">
                    <div class="site-icon">
                        <font-awesome-icon :icon="['fas', 'heart']"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props:{
        post: Object
    },
    computed:{
        ...mapState({
            author: state => state.user.user.id,
            authorAlias: 'author',
        }),
    },
    methods:{
        deletePost(){
            let router = this.$router;

            axios({
                method: 'delete',
                url: `http://localhost:3000/posts/${this.post.id}`
            })
                .then(response => {
                    if(response.data.success){
                        router.go();
                    }
                })
                .catch(err => {
                    this.$store.commit('SET_ERROR', error.response.data.message);
                })
        }
    }
    
}
</script>

<style lang="scss" scoped>
.post{
    display: flex;
    margin-bottom: 15px;
}
.post__image{
    margin-right: 20px;
}
.post__main{
    width: 96%;
    flex: 1;
}
.post__main_retweet{
    font-size: 13px;
}
.post__main_author{
    margin-bottom: 10px;
}
.post__main_author_link{
    margin-right: 8px;
}
.post__main_author_name{
    font-weight: bold;
}
.post__main_author_verified{
    color: $main-color;
    font-weight: bold;
}
.post__options{
    color: $light_grey;
    font-size: 13px;
}

.post__main_manage{
    display: flex;
    justify-content: space-between;
}

@media (hover: hover){
    .site-icon:hover{
        cursor: pointer;
        color: $main-color;
    }

    .post__main_author_link a:hover{
        text-decoration: underline;
    }

    .post__options:hover{
        text-decoration: underline;
        color: $main-color;
        cursor: pointer;
    }
}
</style>