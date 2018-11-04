<template>
  <div class="mpselect" align="center">
    <transition name="slideinleft">
      <div v-show="p1" class="mp1">
        <div v-for="item in mp1">
          <router-link to="/result"><img :src="item.tabimg" @click="totype(item.value)"></router-link>
        </div>
      </div>
    </transition>
    <transition name="slideinright">
      <div v-show="p2" class="mp2">
        <div class="column">
          <div v-for="item in mp2" v-if="item.id>=0&&item.id<4" @click="totype(item.value)">
            <router-link to="/result"><img :src="item.tabimg"></router-link>
          </div>
        </div>
        <div class="column">
          <div v-for="item in mp2" v-if="item.id>=4&&item.id<8" @click="totype(item.value)">
            <router-link to="/result"><img :src="item.tabimg"></router-link>
          </div>
        </div>
      </div>
    </transition>
    <table class="mptran">
      <transition>
        <th class="t1">
          <div v-show="pt1" class="pt1" @click="show1"></div>
          <div v-show="pt1f" class="pt1f" @click="show1"></div>
        </th>
      </transition>
      <transition>
        <th class="t2">
          <div v-show="pt2f" class="pt2f" @click="show2"></div>
          <div v-show="pt2" class="pt2" @click="show2"></div>
        </th>
      </transition>
    </table>
  </div>
</template>
<script>
  export default {
    name: 'mpselect',
    data() {
      return {
        p1: true,
        p2: false,
        pt1: true,
        pt2: false,
        pt1f: false,
        pt2f: true,
        mp1: [{
            tabimg: require('./select/荟萃.png'),
            value: '荟萃'
          },
          {
            tabimg: require('./select/玉兰.png'),
            value: '玉兰'
          },
          {
            tabimg: require('./select/唐岛湾.png'),
            value: '唐岛湾'
          },
          {
            tabimg: require('./select/民族餐厅.png'),
            value: '民族餐厅'
          },
          {
            tabimg: require('./select/校外周边.png'),
            value: '校外'
          }
        ],
        mp2: [{
            tabimg: require('./select/家常菜品.png'),
            value: '家常菜品',
            id: 0
          },
          {
            tabimg: require('./select/果蔬饮品.png'),
            value: '果蔬饮品',
            id: 1
          },
          {
            tabimg: require('./select/小吃零食.png'),
            value: '小吃零食',
            id: 2
          },
          {
            tabimg: require('./select/蛋糕甜品.png'),
            value: '蛋糕甜品',
            id: 3
          },
          {
            tabimg: require('./select/暖胃粉面.png'),
            value: '暖胃粉面',
            id: 4
          },
          {
            tabimg: require('./select/营养早餐.png'),
            value: '营养早餐',
            id: 5
          },
          {
            tabimg: require('./select/火锅海鲜.png'),
            value: '火锅海鲜',
            id: 6
          },
          {
            tabimg: require('./select/自选自助.png'),
            value: '自选自助',
            id: 7
          }
        ],
        huicui: require('./select/荟萃.png'),
        yulan: require('./select/玉兰.png'),
        tangdaowan: require('./select/唐岛湾.png'),
        mincan: require('./select/民族餐厅.png'),
        xiaowai: require('./select/校外周边.png'),
        jiachang: require('./select/家常菜品.png'),
        guoyin: require('./select/果蔬饮品.png'),
        xiaochi: require('./select/小吃零食.png'),
        tianpin: require('./select/蛋糕甜品.png'),
        fenmian: require('./select/暖胃粉面.png'),
        zaocan: require('./select/营养早餐.png'),
        huohai: require('./select/火锅海鲜.png'),
        zixuan: require('./select/自选自助.png'),
      }
    },
    methods: {
      show1(e) {
        if (this.p1 == false) {
          this.p1 = true;
          this.p2 = false;
          this.pt2f = true;
          this.pt1f = false;
          this.pt1 = true;
          this.pt2 = false;
        }
      },
      show2(e) {
        if (this.p2 == false) {
          this.p2 = true;
          this.p1 = false;
          this.pt2f = false;
          this.pt1f = true;
          this.pt1 = false;
          this.pt2 = true;
        }
      },
      totype(value) {
        sessionStorage.setItem("freshed", '0')
        let _token = sessionStorage.getItem("token");
        this.$axios
          .get("http://yb.upc.edu.cn:8084/foodshare/food/kind", {
            params: {
              Authorization: _token,
              kind: value
            }
          })
          .then(response => {
            var rest1 = response.data
            if (rest1 != '') {
              Object.keys(rest1).forEach(function (key) {
                rest1[key].foodnum = key
                if (rest1[key].collection >= 99) {
                  rest1[key].collection = 99
                }
                if (rest1[key].likeCount >= 99) {
                  rest1[key].likeCount = 99
                }
                if (rest1[key].review >= 99) {
                  rest1[key].review = 99
                }
              })
            }
            var rest1 = JSON.stringify(rest1)
            console.log(rest1)
            sessionStorage.setItem('foods', rest1)
          })
          .catch(function (error) {
            console.log(error);
          })
      }
    },
    created() {
      this.$bus.$off('foods')
    }
  }

</script>
<style>
  a {
    height: 100%;
    width: 100%;
  }

  .mp1 {
    width: 90%;
    height: 80%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin-top: 10%;
  }

  .mp1 div {
    width: 16%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .mp1 a {
    height: 70%;
  }

  .mp1 img {
    height: 100%;
    width: auto;
  }

  .mp2 {
    width: 80%;
    height: 80%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 0;
    margin-top: 10%;
  }

  .column {
    height: 100%;
  }

  .column div {
    height: 25%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .column a {
    width: 80%;
  }

  .column div img {
    width: 100%;
    margin-top: 0.5rem;
  }

  .mptran {
    width: 100%;
    height: 1rem;
    position: absolute;
    left: 0;
    bottom: 5%;
  }

  .t1 {
    width: 50%;
    height: 0.5rem;
  }

  .t2 {
    width: 50%;
    height: 0.5rem;
  }

  .pt1 {
    float: right;
    background: white;
    height: 0.4rem;
    width: 3rem;
    margin-right: 0.5rem;
    opacity: 0.6;
    border-radius: 0.2rem;
  }

  .pt2f {
    float: left;
    background: grey;
    height: 0.4rem;
    width: 3rem;
    margin-left: 0.5rem;
    opacity: 0.6;
    border-radius: 0.2rem;
  }

  .pt2 {
    float: left;
    background: white;
    height: 0.4rem;
    width: 3rem;
    margin-left: 0.5rem;
    opacity: 0.6;
    border-radius: 0.2rem;
  }

  .pt1f {
    float: right;
    background: grey;
    height: 0.4rem;
    width: 3rem;
    margin-right: 0.5rem;
    opacity: 0.6;
    border-radius: 0.2rem;
  }

  .slideinleft-enter-active {
    transition: all .5s linear;
  }

  .slideinleft-leave-active {
    transition: none;
  }

  .slideinleft-enter,
  .slideinleft-leave-to

  /* .slide-fade-leave-active for below version 2.1.8 */
    {
    transform: translateX(-5rem);
    opacity: 0;
  }

  .slideinright-enter-active {
    transition: all .5s linear;
  }

  .slideinright-leave-active {
    transition: none;
  }

  .slideinright-enter,
  .slideinright-leave-to

  /* .slide-fade-leave-active for below version 2.1.8 */
    {
    transform: translateX(5rem);
    opacity: 0;
  }

  @media screen and (max-width: 321px) {
    .mp1 img {
      height: 90%;
      width: auto;
    }

    .mptran {
      bottom: 0% !important;
    }
  }

</style>
