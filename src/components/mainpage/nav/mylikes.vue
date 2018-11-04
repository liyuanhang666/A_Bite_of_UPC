<template>
  <div id="main">
    <div v-show="isempty" class="ifempty">
      空空如也
    </div>
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
            <div class="price" style="float:left;font-size:1.4rem;color:red"><i class="fa fa-jpy fa-1x" aria-hidden="true"
                style="color:red"></i>
              <div class="pricep">{{favor.price}}</div>
            </div>
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
        isempty: false,
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
          if (res.data == '') {
            this.isempty = true
          }
          Object.keys(res.data).forEach(function (key) {
            if (res.data[key].collection >= 99) {
              res.data[key].collection = 99
            }
            if (res.data[key].likeCount >= 99) {
              res.data[key].likeCount = 99
            }
            if (res.data[key].review >= 99) {
              res.data[key].review = 99
            }
          })
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
    background: url('../../sousuo/sousuo.png') no-repeat;
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
    width: 25%;
    word-break: break-all;
    max-height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
  }

  .pricep {
    width: 70%;
    font-size: 0.8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .address {
    word-break: break-all;
    max-width: 35%;
    max-height: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .cancel {
    word-break: break-all;
    max-width: 40%;
    font-size: 0.6rem;
  }

  @media screen and (max-width:321px) {
    .foodinfo {
      font-size: 0.8rem;
    }
  }

  .ifempty {
    position: relative;
    height: 10%;
    width: 30%;
    left: 35%;
    top: 30%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    color: lightslategrey;
  }

</style>
