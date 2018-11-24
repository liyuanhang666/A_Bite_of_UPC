<template>
  <div class="hello">
    <div v-show="isempty" class="ifempty">
      空空如也
    </div>
    <div class="table1" :key="page.foodnum" v-for="page in pages">
      <router-link :to="{path:'/food',query: {foodid: page.id}}">
        <div :class="page.foodnum%2?classa:classb">
          <div :class="page.foodnum%2?imga:imgb">
            <div :class="page1"><img class="foodimg" :src="page.imgurl">
              <div :class="page2">
                <img src="./grey.jpg">
                <div :class="page3">
                  <i class="fa fa-star-o fa-2x"><span :class="page.star>10?star2:star1">{{page.collection}}</span></i>
                  <i class="fa fa-heart-o fa-2x" style="margin-left:42%;"><span :class="page.heart>10?star2:star1">{{page.likeCount}}</span></i>
                  <i class="fa fa-comment-o fa-2x" style="margin-left:70%;"><span :class="page.info>10?star2:star1">{{page.review}}</span></i>
                </div>
              </div>
            </div>
          </div>
          <div :class="page.foodnum%2?fonta:fontb">
            <div class="name">{{page.name}}</div>
            <div class="price">
              <span style="color:red;font-family:Arial">&yen;{{page.price}}</span>
            </div>
            <div class="address">
              <div style="width:10%"><Icon type="ios-location-outline"></Icon></div> <div class="addressp">{{page.address}}</div>
            </div>
            <div class="des">{{page.detail}}</div>
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
        isempty: false,
        yeshu: 2,
        boxname: sousuo.boxname,
        suosuokind: sousuo.suosuokind,
        sousuoname: sousuo.sousuoname,
        pages: 'asdasd',
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
      document.title = '舌尖上的石大'
      let str = sessionStorage.getItem('foods')
      let isfreshed = sessionStorage.getItem('freshed')
      let obj = JSON.parse(str)
      this.pages = obj
      if (isfreshed == '0' && str != '') {
        sessionStorage.setItem("freshed", '1')
        location.reload()
      }
      if (str === '[]' || str === null) {
        this.isempty = true
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
    background-image: url("../sousuo/sousuo.png");
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
    margin: 0;
    padding: 0;
  }

  .classa {
    height: 98%;
    width: 93%;
    margin-left: 5%;
    border-style: dashed;
    border-top-width: 2px;
    border-right-width: 2px;
    border-bottom-width: 2px;
    border-left-width: 0;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    border-color: grey;

  }

  .imga {
    height: 88%;
    width: 45%;
    margin-top: 0.5rem;
    position: relative;
    float: left;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
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
    border-bottom-left-radius: 1rem;
    border-top-left-radius: 1rem;
  }

  .imgb {
    height: 88%;
    width: 45%;
    position: relative;
    float: right;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
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
    height: 20%;
    font-size: 4vw;
    color: azure;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .price {
    width: 100%;
    height: 20%;
    font-size: 4vw;
    color: azure;
  }

  .address {
    width: 100%;
    height: 20%;
    font-size: 4vw;
    color: azure;
    display: flex;
    flex-direction: row;

  }

  .addressp {
    width:85%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  .des {
    width: 100%;
    height: 40%;
    font-size: 2vh;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    color: #495060;
  }

  .page1 {
    position: relative;
    width: 95%;
    height: 95%;
    border-radius: 1rem;
    overflow: hidden;
  }

  .page1 img {
    float: left;
    height: 100%;
    width: 100%;
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
    height: 30%;
    bottom: 0;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
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

  .foodimg {
    width: 100%;
    height: auto !important;
  }
</style>
