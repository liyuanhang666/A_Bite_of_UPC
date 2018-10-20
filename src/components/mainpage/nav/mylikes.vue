<template>
  <div id="main">
    <div class="favors" v-for='favor in favors' :key="favor.num">
      <div class="favor">
        <div class="imge">
          <router-link class="router" :to="{path:'/food',query: {foodid: favor.id}}">
            <img :src="favor.imgurl" class="foodimg">
          </router-link>
        </div>
        <div class="foodinfos">
          <div class="foodname">{{favor.name}}</div>
          <div class="foodinfo">
            <span class="price" style="float:left;font-size:1.4rem;color:red"><i class="fa fa-jpy fa-1x" aria-hidden="true"
                style="color:red"></i>{{favor.price}}</span>
            <span class="address"><i class="fa fa-map-marker fa-1x" aria-hidden="true" style="color:none"></i>{{favor.address}}</span>
            <span class="cancel" style="float:right" id="cancelike" @click="cancellike(favor.id)"><i class="fa fa-heart fa-lg"
                aria-hidden="true" style="color:red"></i>取消点赞</span>
          </div>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>
<script>
  import mainpage from '../../mainpage'

  export default {
    name: "mylikes", //点赞的菜品
    data() {
      return {
        token: mainpage.token,
        favors: []
      }
    },
    mounted() {
      document.title = '我赞过的';
      let _token = sessionStorage.getItem("token")
      let url = 'http://yb.upc.edu.cn:8084/foodshare/food/getlike'
      this.$axios.get(url, {
          params: {
            Authorization: _token
          }
        })
        .then(res => {
          // 使用ajax请求数据获取到users（数组）,所以this.users是数组
          this.favors = res.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    methods: {
      cancellike(foodid) {
        let url = 'http://yb.upc.edu.cn:8084/foodshare/food/like'
        let _token = sessionStorage.getItem("token")
        let _foodId = foodid
        this.$axios.get(url, {
          params: {
            Authorization: _token,
            foodId: _foodId
          }
        }).then(rsp => {
          if (rsp.data.code === 1) {
            alert("取消点赞成功！")
            location.reload()
          } else {
            alert("服务器忙，请稍后刷新查看！")
          }
        })
      }
    }
  };

</script>

<style scoped>
  .foodinfos {
    width: 100%;
    height: 45%;
  }

  .foodname {
    width: 100%;
    height: 40%;
    text-align: center;
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 1.1rem;
  }

  .foodinfo {
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 0.9rem;
  }

  .foodinfo span {
    color: white;
    word-wrap: break-word;
  }

  .foodinfo i {
    color: white;
    margin-right: 0.1rem;
  }

  #main {
    width: 100%;
    height: 100%;
    background: url(./myfavorites/个人中心底图.png) no-repeat;
    background-size: 100%, 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    overflow-y: scroll;
    align-content: flex-start;
  }

  .favors {
    width: 50%;
    height: 15rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to left, white, white) left top no-repeat,
      linear-gradient(to bottom, white, white) left top no-repeat,
      linear-gradient(to left, white, white) right top no-repeat,
      linear-gradient(to bottom, white, white) right top no-repeat,
      linear-gradient(to left, white, white) left bottom no-repeat,
      linear-gradient(to bottom, white, white) left bottom no-repeat,
      linear-gradient(to left, white, white) right bottom no-repeat,
      linear-gradient(to left, white, white) right bottom no-repeat;
    background-size: 1px 5px, 5px 1px, 1px 5px, 5px 1px;
  }

  .router {
    width: 100%;
    height: 100%;
  }

  .favor {
    width: 95%;
    height: 95%;
    border: 1px rgb(79, 79, 79) dashed;
    border-radius: 1rem;
  }

  .imge {
    width: 90%;
    height: 65%;
    border-bottom: 1px rgb(79, 79, 79) dashed;
    position: relative;
    left: 5%;
    top: 3%;
  }

  .foodimg {
    width: 100%;
    height: 95%;
    border-radius: 0.5rem;
  }

  .price {
    max-width: 23%;
    word-break: break-all;
  }

  .address {
    word-break: break-all;
    max-width: 32%;
  }

  .cancel {
    word-break: break-all;
    max-width: 45%;
  }

  @media screen and (max-width:321px) {
    .foodinfo {
      font-size: 0.8rem;
    }
  }

</style>
