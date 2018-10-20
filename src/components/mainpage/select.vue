<template>
  <div class="mpselect" align="center">
    <transition name="slideinleft">
      <div v-show="p1" class="mp1">
        <div><img :src="huicui" alt=""></div>
        <div><img :src="yulan" alt=""></div>
        <div><img :src="tangdaowan" alt=""></div>
        <div><img :src="mincan" alt=""></div>
        <div><img :src="xiaowai" alt=""></div>
      </div>
    </transition>

    <transition name="slideinright">
      <table v-show="p2" class="mp2">
        <th>
          <tr><img :src="jiachang" alt=""></tr>
          <tr><img :src="guoyin" alt=""></tr>
          <tr><img :src="xiaochi" alt=""></tr>
          <tr><img :src="tianpin" alt=""></tr>
        </th>
        <th>
          <tr><img :src="fenmian" alt=""></tr>
          <tr><img :src="zaocan" alt=""></tr>
          <tr><img :src="huohai" alt=""></tr>
          <tr><img :src="zixuan" alt=""></tr>
        </th>
      </table>
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
    }
  }

</script>
<style>
  .mp1 {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }

  .mp1 div {
    width: 16%;
    height: 10rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .mp1 img {
    height: 90%;
    width: auto;
  }

  .mp2 {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    position: absolute;
    left: 0rem;
    top: 0rem;
  }

  .mp2 th {
    width: 50%;
  }

  .mp2 tr {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }

  .mp2 img {
    width: 75%;
    margin-top: 0.5rem;
  }

  .mptran {
    width: 100%;
    height: 1rem;
    position: absolute;
    left: 0;
    bottom: 0rem;
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
    transition: all .2s linear;
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
    transition: all .2s linear;
  }

  .slideinright-enter,
  .slideinright-leave-to

  /* .slide-fade-leave-active for below version 2.1.8 */
    {
    transform: translateX(5rem);
    opacity: 0;
  }

</style>
