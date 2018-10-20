<template>
  <div class="hello">
    <div class="table1" :key="page.foodnum" v-for="(page,index) in pages" v-if="page.state==0">
      <div :class="page.foodnum%2?classa:classb">
        <div :class="page.foodnum%2?imga:imgb">
          <div :class="page1"><img :src="page.imgurl">
            <div :class="page2">
              <img src="./grey.jpg">
              <div :class="page3">
                <i class="fa fa-star-o fa-2x"><span :class="page.star>10?star2:star1">{{page.collection}}</span></i>
                <i class="fa fa-heart-o fa-2x" style="margin-left:42%;"><span :class="page.heart>10?star2:star1">{{page.likecount}}</span></i>
                <i class="fa fa-comment-o fa-2x" style="margin-left:70%;"><span :class="page.info>10?star2:star1">{{page.review}}</span></i>
              </div>
            </div>
          </div>
        </div>
        <div :class="page.foodnum%2?fonta:fontb">
          <div class="name">{{page.name}}<span style="color:red;font-family:Arial;float:right">&yen;{{page.price}}</span>
          </div>
          <div class="des"><span>{{page.detail}}</span></div>
          <div class="icon">
            <Icon type="trash-a" @click="delate(page.id,index)" style="float:right"></Icon>
          </div>
        </div>
      </div>
    </div>
    <alert v-if="ok"></alert>
  </div>
</template>
<script>
  import alert from "./alert.vue";

  export default {
    name: "sousuojieguo",
    data() {
      return {
        msg: "",
        yeshu: 1,
        ok: true,
        pages: [],
        classa: "classa",
        classb: "classb",
        fonta: "fonta",
        fontb: "fontb",
        imga: "imga",
        imgb: "imgb",
        page1: "page1",
        page2: "page2",
        page3: "page3",
        star2: "star2",
        star1: "star1",
        icon: "icon"
      };
    },

    methods: {
      delate: function (imdex, index) {
        let _token = sessionStorage.getItem("token");
        let url = "http://yb.upc.edu.cn:8084/foodshare/user/delete";
        this.$axios.get(url, {
          params: {
            Authorization: _token,
            foodId: imdex
          }
        });
        this.pages.splice(index, 1);
        this.$axios
          .get("http://yb.upc.edu.cn:8084/foodshare/food/own", {
            params: {
              Authorization: _token
            }
          })
          .then(response => {
            Object.keys(response.data).forEach(function (key) {
              response.data[key].foodnum = key
            })
            this.pages = response.data;
          });
      }
    },
    created() {
      let _token = sessionStorage.getItem("token");
      this.$axios
        .get("http://yb.upc.edu.cn:8084/foodshare/food/own", {
          params: {
            Authorization: _token
          }
        })
        .then(response => {
          Object.keys(response.data).forEach(function (key) {
            response.data[key].foodnum = key
          })
          this.pages = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
      this.$axios
        .get("http://yb.upc.edu.cn:8084/foodshare/user/new", {
          params: {
            Authorization: _token
          }
        })
        .then(response => {
          this.ok = response;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    components: {
      alert
    }
  };

</script>
<style scoped>
  html {
    height: 100%;
  }

  body {
    height: 100%;
  }

  .hello {
    background-image: url("sousuo.png");
    background-size: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    overflow-y: scroll;
    align-content: flex-start;
    width: 100%;
    height: 100%;
    padding: 3%;
  }

  .table1 {
    width: 100%;
    height: 25%;
    border-color: white;
  }

  .classa {
    height: 100%;
    width: 100%;
    border-style: dashed;
    border-top-width: 2px;
    border-right-width: 2px;
    border-bottom-width: 2px;
    border-left-width: 0;
    border-color: grey;
    border-radius: 3%;
  }

  .imga {
    height: 88%;
    width: 45%;
    position: relative;
    float: left;
  }

  .classb {
    height: 100%;
    width: 100%;
    border-style: dashed;
    border-top-width: 0;
    border-right-width: 0;
    border-bottom-width: 0;
    border-left-width: 2px;
    border-color: grey;
    border-radius: 3%;
  }

  .imgb {
    height: 88%;
    width: 45%;
    position: relative;
    float: left;
  }

  .fonta {
    height: 100%;
    width: 50%;
    float: left;
    padding-left: 4%;
    padding-top: 2%;
  }

  .fontb {
    height: 100%;
    width: 50%;
    float: left;
    padding-left: 4%;
    padding-top: 2%;
  }

  .name {
    width: 100%;
    height: 10%;
    font-size: 4vw;
    color: azure;
  }

  .price {
    width: 100%;
    height: 10%;
    padding-top: 12%;
    font-size: 4vw;
    color: azure;
  }

  .des {
    padding-top: 11%;
    width: 100%;
    height: 60%;
    font-size: 2vh;
  }

  .page1 {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .page1 img {
    float: left;
    height: 100%;
    width: 100%;
    border-radius: 18%;
    padding-right: 1%;
    padding-top: 11%;
    padding-bottom: 1%;
    padding-left: 3%;
    z-index: 1;
    position: absolute;
  }

  .page2 {
    height: 100%;
    bottom: 0;
    width: 100%;
    position: relative;
  }

  .page2 img {
    height: 40%;
    bottom: 0;
    border-bottom-left-radius: 32%;
    border-bottom-right-radius: 32%;
    position: absolute;
    z-index: 2;
  }

  .page3 {
    position: relative;
    height: 100%;
    width: 100%;
    bottom: 0;
  }

  .page3 i {
    height: 25%;
    bottom: 0;
    margin-left: 14%;
    position: absolute;
    float: left;
    z-index: 3;
    padding-bottom: 14%;

    color: black;
    font-size: 7vw;
  }

  .star1 {
    font-size: 2vw;
    position: absolute;
    left: 36%;
    bottom: 0%;
    height: 78%;
    width: 100%;
  }

  .star2 {
    font-size: 2vw;
    position: absolute;
    left: 27%;
    bottom: 0%;
    height: 78%;
    width: 100%;
  }

  .icon {
    bottom: 0;
    padding-top: 0;
    width: 100%;
    height: 21%;
  }

  .icon i {
    padding-top: -3%;
    font-size: 7vw;
    padding-left: 33%;
    color: #495060;
  }

</style>
