<template>
  <div class="hello">
    <div class="table1" :key="page.foodnum" v-for="(page,index) in pages">
      <div id="page.foodunm" style="width:100%;height:100%">
        <div :class="page.foodnum%2?classa:classb">
          <div :class="page.foodnum%2?imga:imgb">
            <div :class="page1"><img :src="page.imgurl">
            </div>
          </div>
          <div :class="page.foodnum%2?fonta:fontb">
            <div class="name">{{page.name}}<Icon type="close-round" @click="delate(page.reviewId,index)" style="float:right;font-size:6vw;height:10%"></Icon>
            </div>
            <div class="price"><span style="color:red;font-family:Arial">&yen;{{page.price}}</span> <span style="float:right">
                <Icon type="ios-location-outline"></Icon> {{page.address}}
              </span></div>
            <div class="des">
              <div class="det" style="height:20%;word-wrap:nowrap">{{page.detail}}</div>
              <div class="rdet" style="height:80%;overflow:hidden;width:100%;text-overflow:hidden;word-wrap:break-word;" >{{page.reviewDetail}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "pinglunlishi",
    data() {
      return {
        yeshu: 1,
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
        star1: "star1"
      };
    },

    methods: {
      delate: function (imdex, index) {
        let _token = sessionStorage.getItem("token")
        this.$axios.get("http://yb.upc.edu.cn:8084/foodshare/review/delete", {
          params: {
            Authorization: _token,
            reviewId: imdex
          }
        })
        .then(rsp=>{
          console.log(rsp.data)
        });
        this.pages.splice(index, 1);
        this.$axios
          .get("http://yb.upc.edu.cn:8084/foodshare/food/review", {
            params: {
              Authorization: _token,
            }
          })
          .then(response => {
            Object.keys(response.data).forEach(function (key) {
              response.data[key].foodnum = key
            })
            this.pages = response.data
          });

      }
    },
    created() {
      document.title = '评论历史'
      let _token = sessionStorage.getItem("token");
      this.$axios
        .get("http://yb.upc.edu.cn:8084/foodshare/food/review", {
          params: {
            Authorization: _token,
          }
        })
        .then((response) => {
          console.log(response.data);
          Object.keys(response.data).forEach(function (key) {
            response.data[key].foodnum = key
          })
          this.pages = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

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
    background-image: url("../sousuo/sousuo.png");
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
    border-bottom-width: 0;
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
    border-top-width: 2px;
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
    width: 51%;
    float: left;
    padding-left: 4%;
    padding-top: 4%;
  }

  .fontb {
    height: 100%;
    width: 51%;
    float: left;
    padding-left: 4%;
    padding-top: 4%;
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
    margin-top: 15%;
    width: 100%;
    height: 60%;
    font-size: 2vh;
  }

  .det {
    width: 100%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  .rdet {
    width: 100%;
    height:80%;
    overflow:hidden;
    width:100%;
    word-wrap:break-word;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    color: #495060;
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
    height: 42%;
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

</style>
