<template>
    <div>
        <div class="profile__title title">
            <div class="profile__title_text">
                {{ userName }}
            </div>
        </div>
        <div class="profile__main">
            <div class="profile__main_author">
                <div class="profile__main_author_bg">
                    <div class="bg">

                    </div>
                </div>
                <div class="profile__main_author_info">
                    <div class="profile__main_author_info_upper">
                        <div class="profile__main_author_info_upper_img">
                            <img src="../assets/default-user-image.png" alt="">
                        </div>
                    </div>
                    <div class="profile__main_author_info_lower">
                        <div class="profile__main_author_info_lower_name">
                            <div>
                                {{ userName }}
                            </div>
                            <div>
                                @{{ id }}
                            </div>
                        </div>
                        <div class="profile__main_author_info_lower_followers">
                            <a href="">
                                <b>
                                    {{ userFollowing }}
                                </b>
                                following
                            </a>
                            <a  href="">
                                <b>
                                    {{ userFollowers }}
                                </b>
                                followers
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="profile__main_posts">
                <div class="profile__main_posts_filter">
                    <div class="active">
                        Tweets
                    </div>
                    <div>
                        Retweets
                    </div>
                </div>
                <div class="profile__main_posts_container">
                    <post v-for="(post, index) in posts" :key="`post#${index}`" :post="post"></post>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import post from './post'

export default {
    props:{
        id: String
    },
    data(){
        return{
            userName: null,
            userFollowers: null,
            userFollowing: null,
            userPosts: null,
            posts: null
        }
    },
    components:{
        post
    },
    created(){
        axios({
            method: 'get',
            url: `http://localhost:3000/users/${this.id}`
        })
            .then(response => {
                this.userName = response.data.name;
                this.userFollowers = response.data.userFollowers;
                this.userFollowing = response.data.userFollowing;
            })
            .catch(error => {
                this.$store.commit('SET_ERROR', error);
            });

        axios({
            method: 'get',
            url: `http://localhost:3000/posts/${this.id}`
        })
            .then(response => {
                this.posts = response.data.posts;
            })
            .catch(error => {
                this.$store.commit('SET_ERROR', error);
            });
    }
}
</script>

<style lang="scss" scoped>
.profile__main_author_bg{
    position: relative;
    padding-bottom: 175px;

    @include media-breakpoint-down(sm){
        padding-bottom: 100px;
    }
}
.bg{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: $light-grey;
}
.profile__main_author_info{
    padding: 0 15px;

    @include media-breakpoint-down(sm){
        padding: 0 5px;
    }
}
.profile__main_author_info_upper{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: -8%;
    margin-bottom: 10px;

    @include media-breakpoint-down(md){
        margin-top: -16%;
    }
}
.profile__main_author_info_upper_img{
    width: 15%;
    border-radius: 50%;
    border: 3px solid $main-color;
    z-index: 1;

    @include media-breakpoint-down(md){
        width: 30%;
    }
}
.profile__main_author_info_lower{
    margin-bottom: 20px;
}
.profile__main_author_info_lower_name{
    margin-bottom: 15px;

    &>div:first-child{
        font-size: 16px;
        font-weight: bold;
    }
    &>div:last-child{
        font-size: 14px;
        color: #bbb;
    }
}
.profile__main_author_info_lower_followers{

    a:first-child{
        margin-right: 10px;
    }
}
.profile__main_posts_filter{
    margin-bottom: 15px;

    div{
        display: inline-block;
        padding: 5px;
        margin-right: 5px;
        cursor: pointer;
    }
}
.active{
    color: $main-color;
    border-bottom: 2px solid $main-color;
}

@media (hover: hover){
    .profile__main_posts_filter div:not(.active):hover{
        color: $main-color;
    }

    .profile__main_author_info_lower_followers a:hover{
        text-decoration: underline;
    }

}
</style>