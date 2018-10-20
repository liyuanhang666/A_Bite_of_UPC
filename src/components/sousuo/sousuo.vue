<template>


  <div class="hello">
    <p style="text-align:center;color:grey;font-size:3%">选择你想搜索的关键词</p>
    <div border="0" style="width: 90%; margin-left:23%;margin-top:5%；height:1%">
      <div style="marginTop: 2%;">
        <div v-for="first in firsts" :key="first.index" v-if="first.id<=4">
          <div style="width:15%;float:left;margin-left: 1%">
            <i-button type="dashed" size="small" style="borderColor: grey;fontColor:grey; borderStyle:dotted " @click="text(first.id)"
              :id=first.id :value="first.name">{{first.name}}</i-button>
          </div>
        </div>
      </div>
    </div>
    <div border="0" style="width: 50%; margin-left:27%;margin-top:10%;height:1%">
      <div>
        <div v-for="first in firsts" :key="first.index" v-if="first.id>=5&&first.id<=9" style="margin-top:8%">
          <div style="width:15%;float:left;margin-left: 3%">
            <i-button type="dashed" size="small" style="borderColor: grey;fontColor:grey; borderStyle:dotted " @click="text(first.id)"
              :id=first.id :value="first.name">{{first.name}}</i-button>
          </div>
        </div>
      </div>
    </div>
    <div border="0" style="width: 90%; margin-left:1%;margin-top:5%;height:1%">
      <div>
        <div v-for="first in firsts" :key="first.index" v-if="first.id>=10&&first.id<=13" style="margin-top:8%">
          <div style="width:15%;float:left;margin-left: 9%">
            <i-button type="dashed" size="small" style="borderColor: grey;fontColor:grey; borderStyle:dotted " @click="text(first.id)"
              :id=first.id :value="first.name">{{first.name}}</i-button>
          </div>
        </div>
      </div>
    </div>
    <div border="0" style="width: 90%; margin-left:1%;margin-top:5%;height:1%">
      <div>
        <div v-for="first in firsts" :key="first.index" v-if="first.id>=14&&first.id<=17" style="margin-top:8%">
          <div style="width:15%;float:left;margin-left: 9%">
            <i-button type="dashed" size="small" style="borderColor: grey;fontColor:grey; borderStyle:dotted " @click="text(first.id)"
              :id=first.id :value="first.name">{{first.name}}</i-button>
          </div>
        </div>
      </div>
    </div>
    <div border="0" style="width: 99%; margin-top:5%;margin-left:1%;height:1%">
      <div class="box4" style="width:97%">
        <div v-for="first in firsts" :key="first.index" v-if="first.id>=18&&first.id<23" style="margin-top:2%">
          <div style="margin-left:2%;float:left;">
            <i-button type="dashed" size="small" style="margin-left: 4%;borderColor: grey;fontColor:grey; borderStyle:dotted "
              @click="text(first.id)" :id=first.id :value="first.name">{{first.name}}</i-button>
          </div>
        </div>
      </div>
    </div>

    <input type="text" id="inputbox" v-model="sousuo" @focus="myFocus(this,'black')" style=" marginLeft:10%;marginTop:9%; text-align:center;height:35px;color:grey; width:80%; border-radius:25px; border: 1px solid #dddee1;outline:0; " />

    <router-link to="/result">
      <i-button type="ghost" size="large" shape="circle" @click="give" style="marginLeft:33%;marginTop:5%;color:white;">开启美食之旅</i-button>
    </router-link>
  </div>
</template>

<script>
  const boxname = null;
  const sousuoname = null;
  const sousuokind = null;

  export default {
    name: "search",
    data() {
      return {
        sousuo: "✎探索你的味蕾",
        jieguo: [],

        firsts: [{
            id: 1,
            name: "主食"
          },
          {
            id: 2,
            name: "菜类"
          },
          {
            id: 3,
            name: "饮品"
          },
          {
            id: 4,
            name: "主食"
          },

          {
            id: 5,
            name: "酸"
          },
          {
            id: 6,
            name: "甜"
          },
          {
            id: 7,
            name: "辣"
          },
          {
            id: 8,
            name: "咸"
          },
          {
            id: 9,
            name: "鲜"
          },

          {
            id: 10,
            name: "家常菜品"
          },
          {
            id: 11,
            name: "暖胃粉面"
          },
          {
            id: 12,
            name: "营养早餐"
          },
          {
            id: 13,
            name: "果蔬饮品"
          },

          {
            id: 14,
            name: "小吃零食"
          },
          {
            id: 15,
            name: "火锅海鲜"
          },
          {
            id: 16,
            name: "蛋糕甜品"
          },
          {
            id: 17,
            name: "自选自助"
          },

          {
            id: 18,
            name: "玉兰"
          },
          {
            id: 19,
            name: "荟萃"
          },
          {
            id: 20,
            name: "唐岛湾"
          },
          {
            id: 21,
            name: "民族餐厅"
          },
          {
            id: 22,
            name: "校外"
          }
        ]
      };
    },
    methods: {
      text: function (i) {
        if (document.getElementById(`${i}`).style.borderColor === "grey") {
          document.getElementById(`${i}`).style.borderColor = "white";
          document.getElementById(`${i}`).style.borderStyle = "groove";
          document.getElementById(`${i}`).style.color = "white";
        } else {
          document.getElementById(`${i}`).style.borderColor = "grey";
          document.getElementById(`${i}`).style.color = "grey";
          document.getElementById(`${i}`).style.borderStyle = "dotted";
        }
      },
      myFocus: function (obj, color) {
        if (inputbox.value == "✎探索你的味蕾") {
          inputbox.value = "";
          this.sousuo = "";
        }

        //设置文本框获取焦点时候背景颜色变换
        inputbox.style.color = color;
      },
      give: function () {
        sessionStorage.setItem("freshed", '0')
        var giveone = '';
        window.sessionStorage.setItem("freshed", 0);
        for (var i = 1; i < 23; i++) {
          if (document.getElementById(`${i}`).style.borderColor === "white") {
            giveone += document.getElementById(`${i}`).value
          }
        }
        this.boxname = giveone;
        // console.log(this.shuru)
        if (inputbox.value == "✎探索你的味蕾" || inputbox.value == "") {
          let _token = sessionStorage.getItem("token");

          this.$axios
            .get("http://yb.upc.edu.cn:8084/foodshare/food/kind", {
              params: {
                Authorization: _token,
                kind: this.boxname
              }
            })
            .then(response => {
              var rest1 = JSON.stringify(response.data)
              window.sessionStorage.setItem("foods", rest1);
              this.sousuokind = 2;
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          let _token = sessionStorage.getItem("token");
          this.sousuoname = document.getElementById("inputbox").value;
          this.$axios
            .get("http://yb.upc.edu.cn:8084/foodshare/food/name", {
              params: {
                Authorization: _token,
                name: this.sousuoname
              }
            })
            .then(response => {
              var rest2 = JSON.stringify(response.data)
              window.sessionStorage.setItem("foods", rest2);
              this.sousuokind = 1;
            })
            .catch(function (error) {
              console.log(error);
            });
        }
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
    background: url("./sousuo.png");
    background-size: 100%;
    width: 100%;
    height: 100%;
    padding-top: 8%;
  }

  .ivu-btn-dashed {
    color: grey;
  }

  .ivu-btn-small {
    padding: 2px 5px;
  }

  .i-button {
    size: "small";
    border-color: grey;
    color: grey;
    border-style: dotted;
  }

  .box4 {
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    display: inline-flex;
    flex-wrap: nowrap;
    align-items: center;
  }

</style>
