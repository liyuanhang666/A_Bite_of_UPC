<template>
  <div class="hello">
    <div class="table1" :key="page.foodnum" v-for="page in pages">
      <router-link :to="{path:'/food',query: {foodid: page.id}}">
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
            <div class="name">{{page.name}}</div>
            <div class="price"><span style="color:red;font-family:Arial">&yen;{{page.price}}</span> <span style="float:right">
                <Icon type="ios-location-outline"></Icon> {{page.address}}
              </span></div>
            <div class="des"><span>{{page.detail}}</span></div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
  var scrollBackground = true;
  import axios from "axios";
  import sousuo from "../sousuo/sousuo";
  export default {
    name: "result",
    data() {
      return {
        yeshu: 2,
        boxname: sousuo.boxname,
        suosuokind: sousuo.suosuokind,
        sousuoname: sousuo.sousuoname,
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
      };
    },
    created() {
      var obj = sessionStorage.getItem("foods")
      var jieguo = JSON.parse(obj)
      Object.keys(jieguo).forEach(function (key) {
        jieguo[key].foodnum = key
      })
      this.pages = jieguo;
      if (sessionStorage.getItem("freshed") !== '1') {
        sessionStorage.setItem("freshed", '1')
        location.reload();
      }
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
    width: 100%;
    height: 100%;
    padding-top: 2%;
    background-image: url("sousuo.png");
    background-size: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    overflow-y: scroll;
    align-content: flex-start;
  }

  .table1 {
    width: 100%;
    height: 25%;
    border-color: white;
  }

  .classa {
    height: 98%;
    width: 98%;
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

  /* .imga img{
  float: left;
  height: 100%;
  width: 100%;
  border-radius: 19%;
  padding-right: 1%;
  padding-top: 3%;
  padding-bottom: 1%;
  padding-left: 3%;
  z-index: 1;

}  */
  .classb {
    height: 98%;
    width: 98%;
    margin-left: 1%;
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
    float: right;
  }

  /* .imgb img{
  float: right;
  height: 87%;
  width: 45%;
  border-radius: 9%;
  margin-left: 3%;
  margin-top: 3%;
  margin-bottom: 2%;
  margin-right:2%;
  z-index: 1;
} */

  .fonta {
    height: 100%;
    width: 48%;
    float: left;
    padding-left: 4%;
    padding-top: 4%;
  }

  .fontb {
    height: 100%;
    width: 48%;
    float: right;
    padding-left: 1%;
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
    padding-top: 15%;
    width: 100%;
    height: 71%;
    font-size: 2vh;
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
    /* color:darkslategray; */
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

  /* .pagea img {
  height: 5%;
  width: 42%;
  float: left;
  z-index: 2;
  left: 2.9%;
  top: 15%;
  border-bottom-left-radius: 25%;
  border-bottom-right-radius: 25%;
} */

</style>
