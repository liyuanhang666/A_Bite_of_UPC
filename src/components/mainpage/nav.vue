<template>
  <transition name="slideinleft">
    <nav id="mpnav" v-show="navshow">
      <div class="font">
        <table class="identity">
          <th class="avatar">
            <div class="iframe-avatar">
              <div class="iavatar"><img :src="studentID.ybhead" class="ybhead"></div>
            </div>
          </th>
          <th class="idinfo">
            <div class="iID">
              <div id="Iname">{{studentID.username}}</div>
              <br>
              <div id="Inum">ID:{{studentID.userid}}</div>
            </div>
          </th>
        </table>
      </div>
      <ul class="navlist">
        <li>
          <router-link to="myfavorites">
            <img :src="foodlist" alt="" height="24px" width="auto"><span>美食清单</span>
          </router-link>
        </li>
        <li>
          <router-link to="/mypublish">
            <img :src="historyrelease" alt="" height="24px" width="auto">
            <Badge dot class="diff" :show-zero="false" :count="ok">
              <a href="#" class="demo-badge difff">
                发布历史
              </a>
            </Badge>
          </router-link>
        </li>
        <li>
          <router-link to="mylikes">
            <img :src="myfavorites" alt="" height="24px" width="auto"><span>我赞过的</span>
          </router-link>
        </li>
        <li>
          <router-link to="/commenthistory">
            <img :src="historycomment" alt="" height="24px" width="auto"><span>评论历史</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </transition>
</template>

<script>
  import myfavorites from './nav/myfavorites'
  import axios from 'axios'

  export default {
    name: 'mpnav',
    props: ['userinfo', 'ifpass'],
    components: {
      myfavorites,
    },
    data() {
      return {
        ok: 0,
        navshow: false,
        foodlist: require('./美食清单.png'),
        historyrelease: require('./发布历史.png'),
        myfavorites: require('./我赞过的.png'),
        historycomment: require('./评论历史.png'),
        studentID: {}
      }
    },
    mounted() {
      console.log(this.userinfo)
    },
    methods: {},
    created() {},
    watch: {
      userinfo: function (val, oldval) {
        if (val != '') {
          let obj = JSON.parse(val)
          sessionStorage.setItem('isinfoget', 1)
          this.studentID = obj
        }
      },
      ifpass: function (val, oldval) {
        if (val === true) {
          this.ok = 1
        }
      }
    }
  }

</script>
<style scoped>
  #mpnav {
    background: url('../sousuo/sousuo.png');
    background-size: 100%, 100%;
    position: absolute;
    left: 0;
    top: 0;
    width: 70%;
    height: 100%;
    z-index: 4;
  }

  #navbgp {
    width: 100%;
    height: 100%;
  }

  .font {
    height: 17%;
    margin-top: 4rem;
    margin-left: 1.5rem;
  }

  .identity {
    height: 100%;
    z-index: 2;
  }

  .iframe-avatar {
    overflow: hidden;
    width: 3.8rem;
    height: 3.8rem;
    border-radius: 50%;
    border: 2px dashed white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .iavatar {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    overflow: hidden;
  }

  .iID {
    height: 80px;
    margin-left: 1rem;
    position: absolute;
  }

  #Iname {
    width: 12rem;
    font-size: 1.2rem;
    font-weight: lighter;
    color: white;
    float: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
  }

  #Inum {
    margin-top: 0.5rem;
    font-size: 1rem;
    font-weight: lighter;
    color: white;
    float: left;
  }

  .navlist {
    height: 70%;
  }

  .navlist a {
    display: flex;
    align-items: flex-end;
    -webkit-transition: background-color 0.2s;
    -moz-transition: background-color 0.2s;
    transition: background-color 0.2s;
    color: white;
    width: 8rem;
    height: 2.5rem;
    border-bottom: 2px dashed rgb(180, 180, 180);
    padding-left: 0.6rem;
    text-decoration: none;
  }

  .navlist li {
    width: 13rem;
    height: 6rem;
    font-size: 1.1rem;
    font-weight: lighter;
    color: white;
    float: left;
    margin-left: 3rem;
    list-style: none;
  }

  .navlist span {
    width: 8rem;
    margin-bottom: 0.2rem;
    margin-left: 0.3rem;
  }

  @media screen and (max-width:361px) {
    .navlist li {
      font-size: 1rem;
      height: 3rem;
    }

    .navlist a {
      padding-left: 0.8rem;
    }
  }

  @media screen and (max-width:321px) {
    .identity {
      height: 6rem;
    }

    .iavatar {
      width: 2.4rem;
      height: 2.4rem;
    }

    .iframe-avatar {
      overflow: hidden;
      width: 2.5rem;
      height: 2.5rem;
      border: 1px dashed white;
    }

    .iID {
      height: 60px;
    }

    #Iname {
      font-size: 1rem;
      margin-top: 0rem;
      margin-bottom: 0.4rem;
    }

    #Inum {
      font-size: 0.8rem;
    }

    .navlist {
      margin-top: 0rem;
    }

    .navlist li {
      width: 6rem;
      height: 4rem;
    }

    .navlist img {
      width: 2rem;
      height: 2rem;
    }

    .navlist a {
      width: 8rem;
      height: 2rem;
    }
  }

  .ybhead {
    height: 100%;
    width: 100%;
  }

  .diff {
    width: 70% !important;
  }

  .difff {
    border: 0 !important;
  }

  @media screen and (max-width: 321px) {
    .diff a {
      padding-left: 0.4rem;
    }
  }

</style>
<style>
  .ivu-badge-dot {
    top: 14px !important;
  }

</style>
