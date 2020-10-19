<template>
  <div id="app">
    <div id="nav" class="container">
      <router-view name='login' v-if="isRouterAlive"></router-view>
      <router-view name='header' v-if="isRouterAlive"></router-view>
      <router-view name='content' v-if="isRouterAlive"></router-view>
      <router-view name='footer' v-if="isRouterAlive"></router-view>
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
      return {
        isRouterAlive: true
      }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function() {
         this.isRouterAlive = true
      })
    }
  }
}
</script>
<style lang="scss" src='./main.scss'>

</style>
