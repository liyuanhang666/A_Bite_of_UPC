<template>
  <div id="app">

    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    //   name: 'App',
    //    data () {
    //             return {
    //                 value: ''
    //             }
    //         },
    //         methods: {
    //             setVq () {
    //                 window.sessionStorage.vq = this.value
    //             }
    //         }
  }

</script>

<style>
  @import './common/font/font.css';

  html {
    width: 100%;
    height: 100%;
  }

  body {
    width: 100%;
    height: 100%;
    background: url("./components/sousuo/sousuo.png") no-repeat;
    background-size: 100% 100%;
  }

  #app {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }
</style>
