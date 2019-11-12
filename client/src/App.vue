<template>
  <div id="app">
    <div class="container-fluid">
        <navigation></navigation>
        <router-view class="page-manager"></router-view>
    </div>
  </div>
</template>

<script>
import navigation from './components/nav'
import home from './components/home'
import profile from './components/profile'
import settings from './components/settings'

export default {
  name: 'app',
  components: {
    navigation,
    home,
    profile,
    settings
  }
}
</script>

<style lang="scss">
  #app, .container-fluid{
    height: 100%;
  }
</style>
