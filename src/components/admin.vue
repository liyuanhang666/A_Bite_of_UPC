<template>
  <div class="admin-container">
    <div class="switch">
      <div class="tab" @click="topone">待审核</div>
      <div class="tab" @click="toptwo">已通过</div>
      <div class="tab" @click="topthree">未通过</div>
      <div class="tabline" :class="t1<1?linea:lineb"></div>
      <div class="tabline" :class="t2<1?linea:lineb"></div>
      <div class="tabline" :class="t3<1?linea:lineb"></div>
    </div>
    <div class="admin-frame">
      <div v-show="isempty" class="ifempty">
        空空如也
      </div>
      <div class="foodinfos">
        <div class="foodimg" v-show="ifempty">
          <img :src="foodinfo.imgurl" alt="">
        </div>
        <div class="foodinfo" v-show="ifempty">
          <div class="foodname">菜品名：{{foodinfo.name}}</div>
          <div class="foodname">价格：{{foodinfo.price}}</div>
          <div class="foodname">标签：{{foodinfo.kind}}</div>
          <div class="fooddetail">菜品描述：{{foodinfo.detail}}</div>
          <div class="fooddetail">详细地址：{{foodinfo.address}}</div>
        </div>
      </div>

      <div class="ifok" v-show="ifempty">
        <div class="yes" @click="ifpass(0)" v-show="ifpassed"><i class="fa fa-check fa-3x" aria-hidden="true"></i></div>
        <div class="no" @click="ifpass(-2)" v-show="ifnopassed"><i class="fa fa-times fa-3x" aria-hidden="true"></i></div>
      </div>
      <div class="buttons">
        <div class="tolast" @click="tolast">上一个</div>
        <div class="tonext" @click="tonext">下一个</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "admin",
  data() {
    return {
      isempty: true,
      ifempty: false,
      foodinfos: [],
      foodinfo: [],
      idkey: 0,
      t1: 0,
      t2: 0,
      t3: 0,
      linea: "linea",
      lineb: "lineb",
      isexist: 0,
      ifpassed: false,
      ifnopassed: false
    };
  },
  created() {
    let adminpage = sessionStorage.getItem("adminpage");
    if (adminpage == "1") {
      this.t1 = 1;
      this.topone();
    } else if (adminpage == "2") {
      this.t2 = 1;
      this.toptwo();
    } else if (adminpage == "3") {
      this.t3 = 1;
      this.topthree();
    }
    let url = "http://yb.upc.edu.cn:8084/foodshare/manage/login";
    let _token = sessionStorage.getItem("token");
    console.log(_token);
    this.$axios
      .get(url, {
        params: {
          Authorization: _token
        }
      })
      .then(rsp => {})
      .catch(error => {
        console.log(error.message);
        alert("您可能不是本应用的管理员！");
      });
  },
  methods: {
    tonext() {
      this.idkey++;
      let ikey = this.idkey;
      let foods = this.foodinfos;
      if (ikey >= foods.length) {
        this.idkey = 0;
      }
      Object.keys(foods).forEach(key => {
        if (key == this.idkey) {
          this.foodinfo = foods[key];
        }
      });
    },
    tolast() {
      this.idkey--;
      let ikey = this.idkey;
      let foods = this.foodinfos;
      if (ikey < 0) {
        this.idkey = foods.length - 1;
      }
      Object.keys(foods).forEach(key => {
        if (key == this.idkey) {
          this.foodinfo = foods[key];
        }
      });
    },
    ifpass(ispass) {
      console.log(ispass);
      let _foodinfo = this.foodinfo;
      let url = "http://yb.upc.edu.cn:8084/foodshare/manage/check";
      let _token = sessionStorage.getItem("token");
      let foodid = _foodinfo.id;
      this.$axios
        .get(url, {
          params: {
            Authorization: _token,
            foodId: foodid,
            pass: ispass
          }
        })
        .then(rsp => {
          console.log(rsp);
          alert(rsp.data.message);
          let _url = "http://yb.upc.edu.cn:8084/foodshare/manage/getFood";
          this.$axios
            .get(_url, {
              params: {
                Authorization: _token,
                pageSize: 100,
                page: 0
              }
            })
            .then(rsp => {
              this.foodinfos = rsp.data.content;
              if (this.foodinfo == "") {
                this.foodinfo = this.foodinfos[0];
                this.idkey = 0;
                console.log(this.foodinfo);
                this.isempty = false;
                this.ifempty = true;
              }
              location.reload();
            });
        });
    },
    topone() {
      sessionStorage.setItem("adminpage", "1");
      this.t1 = 1;
      this.t2 = 0;
      this.t3 = 0;
      this.ifpassed = true;
      this.ifnopassed = true;
      console.log(1);
      let _url = "http://yb.upc.edu.cn:8084/foodshare/manage/getFood";
      let _token = sessionStorage.getItem("token");
      this.$axios
        .get(_url, {
          params: {
            Authorization: _token,
            pageSize: 100,
            page: 0
          }
        })
        .then(rsp => {
          let str = JSON.stringify(rsp.data.content);
          console.log(str);
          this.isexist++;
          sessionStorage.setItem("foodlist", str);
        });
    },
    toptwo() {
      sessionStorage.setItem("adminpage", "2");
      this.t1 = 0;
      this.t2 = 1;
      this.t3 = 0;
      this.ifpassed = false;
      this.ifnopassed = true;
      console.log(2);
      let _url = "http://yb.upc.edu.cn:8084/foodshare/manage/getCheckFood";
      let _token = sessionStorage.getItem("token");
      this.$axios
        .get(_url, {
          params: {
            Authorization: _token,
            pageSize: 100,
            page: 0
          }
        })
        .then(rsp => {
          let str = JSON.stringify(rsp.data.content);
          console.log(str);
          this.isexist++;
          sessionStorage.setItem("foodlist", str);
        });
    },
    topthree() {
      sessionStorage.setItem("adminpage", "3");
      this.t1 = 0;
      this.t2 = 0;
      this.t3 = 1;
      this.ifpassed = true;
      this.ifnopassed = false;
      console.log(3);
      let _url = "http://yb.upc.edu.cn:8084/foodshare/manage/getFailFood";
      let _token = sessionStorage.getItem("token");
      this.$axios
        .get(_url, {
          params: {
            Authorization: _token,
            pageSize: 100,
            page: 0
          }
        })
        .then(rsp => {
          let str = JSON.stringify(rsp.data.content);
          this.isexist++;
          sessionStorage.setItem("foodlist", str);
        });
    }
  },
  watch: {
    isexist: {
      handler: function(val, oldval) {
        if (val !== oldval) {
          let str = sessionStorage.getItem("foodlist");
          if (str == "[]") {
            this.foodinfos = [];
            this.foodinfo = [];
          } else {
            this.foodinfos = JSON.parse(str);
            console.log(this.foodinfos);
            this.foodinfo = this.foodinfos[0];
            console.log(this.foodinfo);
            if (this.foodinfo == "") {
              this.foodinfo = this.foodinfos[0];
              this.idkey = 0;
              console.log(this.foodinfo);
            }
            this.isempty = false;
            this.ifempty = true;
            console.log(this.ifempty);
            console.log(this.foodinfo);
          }
        }
      },
      deep: true
    }
  }
};
</script>

<style>
.admin-container {
  width: 100%;
  height: 100%;
}

.switch {
  width: 100%;
  height: 8%;
  position: absolute;
  top: 0%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  align-content: center;
  background: black;
  flex-wrap: wrap;
}

.tab {
  height: 40%;
  width: 27%;
  font-size: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.tabline {
  width: 20%;
  height: 0.3rem;
}

.linea {
  background: black;
}

.lineb {
  background: white;
}

.admin-frame {
  width: 95%;
  height: 90%;
  position: absolute;
  left: 2.5%;
  top: 7%;
  border: dashed 2px grey;
  border-radius: 2rem;
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

.foodinfos {
  width: 100%;
  height: 80%;
  overflow-y: scroll;
  border-bottom: dashed 2px grey;
  border-bottom-left-radius: 1.6rem;
  border-bottom-right-radius: 1.6rem;
}

.foodimg {
  width: 98%;
  min-height: 15%;
  margin-left: 1%;
  margin-top: 0.2rem;
}

.foodimg img {
  width: 100%;
  height: 100%;
  border-top-left-radius: 1.6rem;
  border-top-right-radius: 1.6rem;
}

.foodinfo {
  width: 100%;
  height: 40%;
  overflow-y: scroll;
}

.foodname {
  width: 90%;
  margin-left: 5%;
  margin-top: 0.5rem;
  height: auto;
  text-align: left;
  color: white;
  font-size: 1.2rem;
}

.fooddetail {
  width: 90%;
  margin-left: 5%;
  margin-top: 0.5rem;
  height: auto;
  text-align: left;
  color: white;
  font-size: 1.2rem;
}

.ifok {
  width: 80%;
  left: 10%;
  height: 10%;
  position: absolute;
  top: 81%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  color: white;
}

.buttons {
  width: 100%;
  background: black;
  height: 8%;
  position: absolute;
  top: 92%;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  opacity: 0.7;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.tolast,
.tonext {
  width: 50%;
  height: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
}

.tolast {
  border-right: 1px lightslategray dashed;
  opacity: 1;
}

.tonext {
  border-left: 1px lightslategray dashed;
  opacity: 1;
}
</style>
