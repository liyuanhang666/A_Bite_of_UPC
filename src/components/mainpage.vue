<template>
  <main id="mainpage" align="center">
    <div class="overmain" v-show="mp" @click="close"></div>
    <div class="main">
      <img :src="menu" id="menu" @click="shownav">
      <router-link to="/search">
        <img :src="searchi" id="searchi">
      </router-link>
      <img :src="logo" id="logo">
      <transition name="slideinright">
        <div id="plusf" v-show="pshow">
          <router-link to="upload" style="text-decoration:none;"><span id="pinf">美食我来说</span></router-link>
        </div>
      </transition>
      <img :src="plus" id="plus" @click="showud">
    </div>
    <mpselect id="mpselect"></mpselect>
    <mpnav v-show="navshow" @close="close"></mpnav>
  </main>
</template>
<script>
  import mpnav from './mainpage/nav'
  import mpselect from './mainpage/select'
  import axios from 'axios'

  export default {
    name: 'Mainpage',
    components: {
      mpnav,
      mpselect,
    },
    data() {
      return {
        pshow: false,
        navshow: false,
        mp: false,
        menu: require('../assets/images/首页-个人中心.png'),
        searchi: require('../assets/images/主页搜索.png'),
        plus: require('../assets/images/添加 (2).png'),
        logo: require('../assets/images/logo.png'),

      }
    },
    methods: {
      showud() {
        this.pshow = !this.pshow;
        this.navshow = false;
        this.mp = !this.mp;
        if (this.pshow == true) {
          this.mp = true;
        }
      },
      shownav() {
        this.navshow = !this.navshow;
        this.pshow = false;
        if (this.navshow == true) {
          this.mp = true;
        }
      },
      close() {
        this.pshow = false;
        this.navshow = false;
        this.mp = !this.mp;
      },
      funcUrlDel(name) {
        var loca = window.location;
        var baseUrl = loca.origin + loca.pathname + "?";
        var query = loca.search.substr(1);
        if (query.indexOf(name) > -1) {
          var obj = {}
          var arr = query.split("&");
          for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].split("=");
            obj[arr[i][0]] = arr[i][1];
          };
          delete obj[name];
          var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g, "").replace(/\:/g, "=").replace(/\,/g, "&");
          return url
        };
      },
      GetQueryString(name) {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
      }
    },
    created() {
      document.title = '舌尖上的石大';
      var _this = this
      var VQ = this.GetQueryString("verify_request")
      if (sessionStorage.getItem("Vq") === 'null'){
        location.href="https://oauth.yiban.cn/code/html?client_id=14a69e60117cbef1&redirect_uri=http://f.yiban.cn/iapp96853&state=5050"
      }
      sessionStorage.setItem("Vq", VQ)
      let _vq = VQ
      if (VQ != '') {
        localStorage.setItem("VQ", VQ)
        this.funcUrlDel("verify_request")
      } else {
        _vq = localStorage.getItem("VQ")
      }
      var _isfirst = null
      let url = 'http://yb.upc.edu.cn:8084/auth'
      let data = {
        appName: '舌尖上的石大',
        vq: _vq,
        device: '5050'
      }
      this.$axios.post(url, data)
        .then(res => {
          sessionStorage.setItem("token", res.data.token)
        })
        .catch(function (error) {
          console.log(error)
        })
      let _token = sessionStorage.getItem("token")
      url = 'http://yb.upc.edu.cn:8084/foodshare/user/exist'
      this.$axios.get(url, {
          params: {
            Authorization: _token
          }
        })
        .then(res => {
          sessionStorage.setItem("isfirst", res.data)
        })
      _isfirst = sessionStorage.getItem("isfirst")
      if (_isfirst === 'false') {
        let url = 'http://yb.upc.edu.cn:8084/foodshare/user/sign'
        let data = {
          Authorization: sessionStorage.getItem("token")
        }
        this.$axios.post(url, data)
          .then(res => {
            console.log(res)
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }

</script>
<style scoped>
  @import '../assets/css/animate.css';
  #mainpage {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: url('../assets/images/主页背景.png') no-repeat;
    background-size: 100% 100%;
  }

  .main {
    width: 100%;
    height: 60%;
  }

  .overmain {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 3;
  }

  #menu {
    position: absolute;
    left: 1rem;
    top: 1.5rem;
    height: 2rem;
  }

  #searchi {
    position: absolute;
    right: 1rem;
    top: 1.5rem;
    height: 2rem;
  }

  #logo {
    position: relative;
    top: 7rem;
    height: 18rem;
    width: auto;
  }

  .slideinright-enter-active {
    transition: all .5s ease;
  }

  .slideinright-leave-active {
    transition: all .5s ease;
  }

  .slideinright-enter,
  .slideinright-leave-to

  /* .slide-fade-leave-active for below version 2.1.8 */
    {
    transform: translateX(5.5rem);
    opacity: 0;
  }

  .slideinleft-enter-active {
    transition: all .2s linear;
  }

  .slideinleft-leave-active {
    transition: all .1s linear;
  }

  .slideinleft-enter,
  .slideinleft-leave-to

  /* .slide-fade-leave-active for below version 2.1.8 */
    {
    transform: translateX(-50px);
    opacity: 0;
  }

  #plus {
    z-index: 3;
    position: absolute;
    right: 1rem;
    top: 5rem;
    height: 2rem;
    display: block;
  }

  #plusf {
    background-color: rgba(255, 255, 255, 0.1);
    z-index: 4;
    position: absolute;
    top: 4.8rem;
    right: 0.8rem;
    height: 2.2rem;
    width: 9.5rem;
    border: 2px;
    border-radius: 1.4rem;
    border-style: dashed;
    border-color: white;
    font-size: 1.3rem;
    font-family: KaiTi;
    color: aliceblue;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
  }

  #pinf {
    color: white;
  }

  #mpselect {
    position: relative;
    top: 0rem;
    height: 15rem;
    width: 100%;
  }

  @media screen and (max-width:321px) {
    .main {
      height: 60%;
    }

    #mpselect {
      height: 13rem;
    }

    #mainpage {
      overflow-y: scroll;
    }

    #logo {
      top: 5rem;
      height: 15rem;
    }
  }

</style>
