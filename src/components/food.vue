<template>
  <main class="food">
    <div class="foodframe" style="marigin-left:-2px">
      <div class="foodphoto">
        <img :src="foodinfo.imgurl" width="100%" height="auto">
      </div>
      <div class="foodn" align="center">
        <div class="namebg">
          <div class="foodname">
            {{foodinfo.name}}
          </div>
        </div>
      </div>
      <div class="foodinfo">
        <div class="foodpp">
          <div class="foodp">
            <i class="fa fa-map-marker fa-1x" style="color:white;height:1.6rem"></i>
            {{foodinfo.address}}
          </div>
          <div class="fprice">
            ￥{{foodinfo.price}}
          </div>
        </div>
        <div class="finfo">
          {{foodinfo.detail}}
        </div>
        <div class="operation">
          <div id="favor" :class="this.iscollect!=true?favor0:favor1" @click="collect">{{collection}}</div>
          <div id="comment" @click="makereview">{{foodinfo.review}}</div>
          <div id="like" :class="this.islike!=false?like1:like0" @click="likeit">{{likeCount}}</div>
        </div>
      </div>
      <fieldset class="foodcomment" align="center">
        <legend>评论</legend>
        <div class="comments-container">
          <div class="comments" v-for='comment in comments' :key="comment.num">
            <div class="ico-container">
              <div class="ico">
                <img :src="comment.ybhead" alt="">
              </div>
            </div>
            <div class="id-container">
              <div class="name">{{comment.ybname}}</div>
              <div class="time">{{comment.createtime}}</div>
              <div class="info">{{comment.detail}}</div>
            </div>
          </div>
        </div>
      </fieldset>
    </div>
    </div>
    <div class="reviewfield" v-show="isreview">
      <Input type="text" v-model="reviewdetail" placeholder="请输入您的评论..." />
      <Button @click="pushreview">发布评论</Button>
    </div>
    <div class="overflow" v-show="isreview" @click="closeall">
    </div>
  </main>
</template>
<script scopedSlots>
  export default {
    name: 'food',
    data() {
      return {
        reviewdetail: '',
        isreview: false,
        foodID: '',
        isreturn: false,
        foodinfo: '',
        iscollect: null,
        islike: null,
        collection: '',
        comment: '',
        likeCount: '',
        favor0: "favor0",
        favor1: "favor1",
        like0: "like0",
        like1: "like1",
        comments: []
      }
    },
    methods: {
      collect() {
        if (this.iscollect === false) {
          this.iscollect = true;
          this.collection++;
        } else if (this.iscollect === true) {
          this.iscollect = false;
          this.collection--;
        }
        let url = 'http://yb.upc.edu.cn:8084/foodshare/collect/add'
        let _token = sessionStorage.getItem("token")
        let foodid = this.foodID
        this.$axios.get(url, {
            params: {
              Authorization: _token,
              foodId: foodid
            }
          })
          .then(rsp => {
            console.log(rsp)
          })
      },
      likeit() {
        if (this.islike === false) {
          this.islike = true;
          this.likeCount++;
        } else if (this.islike === true) {
          this.islike = false;
          this.likeCount--;
        }
        let url = 'http://yb.upc.edu.cn:8084/foodshare/food/like'
        let _token = sessionStorage.getItem("token")
        let foodid = this.foodID
        this.$axios.get(url, {
            params: {
              Authorization: _token,
              foodId: foodid
            }
          })
          .then(rsp => {
            console.log(rsp)
          })
      },
      makereview() {
        this.isreview = true;
      },
      closeall() {
        this.isreview = false;
      },
      pushreview() {
        let url = 'http://yb.upc.edu.cn:8084/foodshare/review/public'
        let _token = sessionStorage.getItem("token")
        let _foodid = this.foodID
        let _detail = this.reviewdetail
        let data = {
          Authorization: _token,
          detail: _detail,
          foodId: _foodid
        }
        this.$axios.post(url, data)
          .then(rsp => {
            if (rsp.status === 200) {
              alert("评论成功！")
              location.reload()
            }
          })
      }
    },
    created() {
      var _this = this
      var _token = sessionStorage.getItem("token")
      let foodId = this.$route.query.foodid.toString()
      this.foodID = foodId
      var Foods = sessionStorage.getItem("foods")
      var foodInfo = ''
      Foods = JSON.parse(Foods)
      Object.keys(Foods).forEach(function (key) {
        if (foodId === Foods[key].id.toString()) {
          foodInfo = Foods[key]
          document.title = foodInfo.name
        }
      })
      this.foodinfo = foodInfo
      this.collection = foodInfo.collection
      this.likeCount = foodInfo.likeCount
      this.$axios.get('http://yb.upc.edu.cn:8084/foodshare/collect/check', {
          params: {
            Authorization: _token,
            foodId: foodId
          }
        })
        .then(rsp => {
          this.iscollect = rsp.data
        })
      this.$axios.get('http://yb.upc.edu.cn:8084/foodshare/user/like', {
          params: {
            Authorization: _token,
            foodId: foodId
          }
        })
        .then(rsp => {
          this.islike = rsp.data
        })
      this.$axios.get('http://yb.upc.edu.cn:8084/foodshare/review/getFood', {
          params: {
            Authorization: _token,
            foodId: foodId,
            pageSize: 100,
            page: 0
          }
        })
        .then(rsp => {
          let reviews = rsp.data.content
          Object.keys(reviews).forEach(function (key) {
            let ms = reviews[key].createtime
            let newTime = new Date(ms)
            let year = newTime.getFullYear()
            let month = newTime.getMonth() + 1
            let day = newTime.getDate()
            let hours = newTime.getHours()
            let minutes = newTime.getMinutes()
            newTime = year + '-' + month + '-' + day + '-' + hours + ':' + minutes
            reviews[key].createtime = newTime
          })
          this.comments = reviews
        })
    }
  }

</script>
<style scoped>
  .comments {
    width: 100%;
    min-height: 6rem;
    flex-direction: column;
    display: flex;
    align-items: center;
    flex-direction: row;
  }

  th div {
    width: 2rem;
    float: left;
    height: 1.6rem;
  }

  #comment {
    background: url('./food/comment0.png');
    background-size: 100% 100%;
    color: white;
    height: 2rem;
    width: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .like0 {
    background: url('./food/like0.png');
  }

  #like {
    background-size: 100% 100%;
    color: white;
    height: 2rem;
    width: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .like1 {
    background: url('./food/like1.png');
    color: rgb(216, 30, 6) !important;
  }

  .favor0 {
    background: url('./food/favor0.png');
  }

  .favor1 {
    background: url('./food/favor1.png');
    color: rgb(244, 234, 42) !important;
  }

  #favor {
    background-size: 100% 100%;
    background-repeat: "no-repeat";
    color: white;
    height: 2rem;
    width: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .food {
    background: url('./sousuo/sousuo.png');
    background-size: 100%, 100%;
    min-height: 22rem;
    padding-top: 1rem;
    width: 100%;
    overflow-x: hidden;
    margin: 0;
  }

  .finfo {
    min-height: 1rem;
    width: 80%;
    margin-bottom: 2rem;
    margin-left: 10%;
    color: white;
    text-align: left;
    text-indent: 2rem;
    font-size: 0.8rem;
    word-wrap: break-all;
  }

  .foodframe {
    width: 92%;
    min-height: 46rem;
    margin-left: 4%;
    border: 2px gray dashed;
    border-radius: 2rem;
    padding-top: 0.1rem;
  }

  .operation {
    width: 60%;
    margin-left: 40%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .foodcomment {
    min-width: 0;
    width: 100% !important;
    border: 2px gray dashed;
    border-radius: 2rem;
    border-bottom: none;
    border-right: none;
    border-left: none;
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
    margin-left: -2px;
    flex-direction: column;
    display: flex;
    height: 21rem;
  }

  legend {
    border-top: 2px gray dashed;
    border-bottom: 2px gray dashed;
    padding: 0.3rem;
    color: white;
    margin-left: 2rem;
  }

  .foodphoto {
    width: 98%;
    min-height: 2rem;
    border-radius: 1.6rem;
    margin-top: 0.1rem;
    margin-left: 1%;
    text-align: center;
    overflow: hidden;
  }

  .foodn {
    width: 100%;
    height: 5rem;
  }

  .namebg {
    display: inline-block;
    height: 1rem;
    min-width: 3rem;
    margin-top: 1rem;
    background: rgba(0, 0, 0, 0.6);
    height: 2.6rem;
    color: white;
    border: 2px gray dashed;
    border-radius: 1.3rem;
    box-shadow: black 0rem 0rem 0.1rem 0.1rem;
  }

  .foodname {
    display: inline-block;
    height: 1.6rem;
    font-size: 1.2rem;
    font-weight: lighter;
    min-width: 3rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin-top: 0.4rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    white-space: nowrap;
  }

  .foodinfo {
    width: 100%;
    min-height: 8rem;
    display: flex;
    flex-direction: column;
  }

  .foodpp {
    width: 100%;
    height: 2rem;
  }

  .foodp {
    position: relative;
    min-width: 2rem;
    height: 2rem;
    top: 0;
    left: 1rem;
    float: left;
    font-size: 0.8rem;
    word-wrap: break-word;
    color: rgb(210, 212, 211)
  }

  .fprice {
    position: relative;
    width: 3rem;
    top: 0;
    right: 1rem;
    float: right;
    font-size: 1.5rem;
    color: red;
  }

  .comments-container {
    width: 100%;
    height: 85%;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .ico-container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    width: 20%;
    min-height: 6rem;
    float: left;
  }

  .ico {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    padding: 2px;
    border: 2px grey dashed;
  }

  .ico img {
    width: 98%;
    height: 98%;
    border-radius: 50%;
  }

  .id-container {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border-bottom: 1px grey dashed;
    width: 75%;
    min-height: 6rem;
    float: right;
  }

  .id-container div {
    text-align: left;
    margin-top: 0.5rem;
  }

  .name {
    color: white;
    font-size: 1rem;
    margin-top: 0 !important;
  }

  .time {
    color: grey;
    font-size: 0.8rem;
  }

  .info {
    color: lightgrey;
    width: 100%;
    min-height: 1rem;
    word-wrap: break-word
  }

  .foodrec {
    width: 100%;
    height: 10rem;
    border-top: 1px grey solid;
    border-bottom: 1px grey solid;
    margin-top: 2rem;
    margin-bottom: 2rem;
    overflow-x: scroll;
  }

  .foodrec legend {
    margin: 0 !important;

  }

  .recfoods {
    width: 100%;
    height: 75%;
    display: flex;
  }

  .recfood {
    flex: 1;
    height: 100%;
    margin-left: 0.5rem;
    float: none;
    box-sizing: border-box;
  }

  .recfoods img {
    height: 90%;
  }

  .reviewfield {
    position: fixed;
    width: 90%;
    top: 20%;
    left: 5%;
    height: 5%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    z-index: 999;
  }

  .reviewfield input {
    width: 75%;
    height: 100%;
    font-size: 1.6rem;
    opacity: 0.6;
    border-radius: 10px;
    outline: none;
  }

  .overflow {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 998;
    background: black;
    opacity: 0.5;
  }

</style>
