<template>
  <main id="mainpage" align="center">
    <div class="overmain" v-show="mp" @click="close"></div>
    <div class="main">
      <img :src="menu" id="menu" @click="shownav">
      <router-link to="/admin">
        <img :src="admin" id="admin" v-show="ifadmin">
      </router-link>
      <router-link to="/search">
        <img :src="searchi" id="searchi">
      </router-link>
      <transition name="slideinright">
        <div id="plusf" v-show="pshow">
          <router-link to="upload" style="text-decoration:none;"><span id="pinf">美食我来说</span></router-link>
        </div>
      </transition>
      <img :src="plus" id="plus" @click="showud">
      <img :src="logo" id="logo">
    </div>
    <mpselect id="mpselect"></mpselect>
    <mpnav v-show="navshow" @close="close" :userinfo="userinfo" :ifpass="ifpass"></mpnav>
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
        admin: require('../assets/images/admin-manage.png'),
        ifadmin: false,
        userinfo: '',
        ifpass: false
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
      GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      }
    },
    created() {
      sessionStorage.setItem('isinfoget', '0')
      document.title = '舌尖上的石大'
      var _this = this
      var VQ = this.GetQueryString("verify_request")
      if (VQ === null || VQ === '') {
        location.href =
          "https://oauth.yiban.cn/code/html?client_id=14a69e60117cbef1&redirect_uri=http://f.yiban.cn/iapp96853&state=5050"
      }
      sessionStorage.setItem("Vq", VQ)
      let _vq = VQ
      if (VQ != '') {
        localStorage.setItem("VQ", VQ)
      } else {
        _vq = localStorage.getItem("VQ")
      }
      let url = 'http://yb.upc.edu.cn:8084/auth'
      let data = {
        appName: '舌尖上的石大',
        vq: _vq,
        device: '5050'
      }
      this.$axios.post(url, data)
        .then(res => {
          console.log(res.data.token)
          sessionStorage.setItem('token', res.data.token)
          var _token = res.data.token
          if (res.data.token == 'null') {
            location.reload(true)
          } else {
            this.$axios.get('http://yb.upc.edu.cn:8084/foodshare/user/exist', {
                params: {
                  Authorization: _token
                }
              })
              .then(res => {
                console.log(res.data)
                if (res.data == false) {
                  let url = 'http://yb.upc.edu.cn:8084/foodshare/user/sign'
                  let data = {
                    Authorization: _token
                  }
                  this.$axios.post(url, data)
                    .then(res => {
                      console.log(res)
                      // 自动访问五次，如访问失败则报错
                      if (res.data.code === 0) {
                        let freshnum = sessionStorage.getItem('freshnum')
                        freshnum = Number(freshnum) + 1
                        sessionStorage.setItem('freshnum', freshnum)
                        console.log(freshnum)
                        if (freshnum <= 5) {
                          location.reload(true)
                        } else {
                          alert('网络连接有误，请联系小易(QQ:3221812415)!')
                        }
                      }
                    })
                } else {
                  this.$axios.get('http://yb.upc.edu.cn:8084/foodshare/user/info', {
                    params: {
                      Authorization: _token
                    }
                  }).then(res => {
                    console.log(res.data)
                    let obj = res.data
                    let str = JSON.stringify(obj)
                    this.userinfo = str
                    this.$emit('userinfo', this.userinfo)
                    if (str != '') {
                      this.$axios.get('http://yb.upc.edu.cn:8084/foodshare/user/new', {
                        params: {
                          Authorization: _token
                        }
                      }).then(res => {
                        console.log(res.data)
                        this.ifpass = res.data
                        this.$emit('ifpass', this.ifpass)
                        let isinfoget = sessionStorage.getItem('isinfoget')
                        if (isinfoget == '0') {
                          sessionStorage.setItem('isinfoget', '1')
                          location.reload()
                        }
                      })
                    }
                  })
                }
              })
          }
        })
    }
  }

</script>
<style scoped>

  @font-face {
    font-family: 'XinHuaKaiTi';
    src: url('./mainpage/XinHuaKaiTi.ttf');
  }

  #mainpage {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: url('../assets/images/主页背景.jpg') no-repeat;
    background-size: 100% 100%;
  }

  .main {
    width: 100%;
    height: 45%;
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
    top: 3rem;
    height: 2rem;
  }

  #admin {
    position: absolute;
    left: 1rem;
    top: 6.5rem;
    height: 2rem;
  }

  #searchi {
    position: absolute;
    right: 1rem;
    top: 3rem;
    height: 2rem;
  }

  #logo {
    position: relative;
    top: 20%;
    height: 80%;
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
    top: 6.5rem;
    height: 2rem;
    display: block;
  }

  #plusf {
    background-color: rgba(255, 255, 255, 0.1);
    z-index: 4;
    position: absolute;
    top: 6.4rem;
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
  }

  #plusf a {
    height: 100%;
    width: 100%;
  }

  #plusf a span {
    margin-left: -15%;
  }

  #pinf {
    font-family: XinHuaKaiTi;
    color: white;
  }

  #mpselect {
    position: relative;
    top: 0rem;
    height: 17rem;
    width: 100%;
  }

  @media screen and (max-width:321px) {
    .main {
      height: 55%;
    }

    #mpselect {
      height: 11rem;
    }

    #mainpage {
      overflow-y: scroll;
    }

    #logo {
      top: 5rem;
    }
  }

</style>
