<template>
  <main class="upload-container"  align="center">
    <div class="isreturn" v-show="isreturn">
    </div>
    <div id="udframe">
      <div id="photoud">
        <img :src="udico" id="udico">
        <input class="puico" type="file" value="" id="file" accept="image/*" @change="uploadConfig" style="none"></input><span class="uphoto">上传照片</span>
      </div>
      <div class="upload">
          <p>菜品名称</p>
          <input class="input" type="text" placeholder="(18字内)" maxlength="36" v-model="name">
      </div>
      <div class="upload">
          <p>价格</p>
          <input class="input" type="number" maxlength="36" v-model="price">
      </div>
      <div class="upload">
        <h1>请选择至少三个标签</h1>
        <div class="tags">
          <div>
            <input v-for="tag in tags" v-if="tag.id>0&&tag.id<5" type="button" class="tag tag1" @click="fun($event)" :value="tag.name" :id=tag.id></input>
          </div>
          <div>
            <input v-for="tag in tags" v-if="tag.id>4&&tag.id<10" type="button" class="tag tag2" @click="fun($event)" :value="tag.name" :id=tag.id></input>
          </div>
          <div>
            <input v-for="tag in tags" v-if="tag.id>9&&tag.id<14" type="button" class="tag tag3" @click="fun($event)" :value="tag.name" :id=tag.id></input>
          </div>
          <div>
            <input v-for="tag in tags" v-if="tag.id>13&&tag.id<18" type="button" class="tag tag3" @click="fun($event)" :value="tag.name" :id=tag.id></input>
          </div>
          <div>
            <input v-for="tag in tags" v-if="tag.id>17&&tag.id<24" type="button" class="tag tag4" @click="fun($event)" :value="tag.name" :id=tag.id></input>
          </div>
        </div>
      </div>
      <div class="upload">
          <p>菜品描述</p>
          <textarea placeholder="请在此输入" name="" id="" rows="4" v-model="description"></textarea>
      </div>
      <div class="upload">
          <p>详细地址</p>
          <input class="input" type="text" placeholder="(18字内)" maxlength="36" v-model="address">
      </div>
    </div>
    <button id="submit" @click="submit">发布</button>
  </main>
</template>
<script>
export default {
  name:'upload',
  data(){
      return{
        isreturn: false,
        udico:require('./upload/上传照片74乘74.png'),
        success: 0,
        tags: [
          {
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
        ],
        num: 0,
        picurl: '',
        name: '',
        price: '',
        address: '',
        description: ''
      }
  },
  methods:{
    fun(e){
      if (e.target.style.color === "white") {
        e.target.style.border = "1px darkgray dashed";
        e.target.style.color = "darkgray";
        this.num--
      }
      else {
        e.target.style.border = "1px white solid";
        e.target.style.color = "white";
        this.num++
      }
    },
    uploadConfig(e) {
      var data = new FormData(document.getElementById('file'))
      let _token = sessionStorage.getItem("token")
      data.append('file', e.target.files[0])
      data.append('Authorization', _token)
      let url = 'http://yb.upc.edu.cn:8084/upload/file' //fetch方法上传图片
      fetch(url, {
        method: 'POST',
        body: data
      }).then(response => response.json())
        .then(json => {
          this.picurl += 'http://yb.upc.edu.cn/' + json.data
          this.picurl = this.picurl.replace("\\", "\/")
          this.picurl = this.picurl.replace("\\", "\/")
          this.success = json.success
        })
        .catch(function(error) {
            console.log('request failed: ', error)
        })
    },
    submit(){
      var _token = sessionStorage.getItem("token")
      var _picurl = this.picurl
      var _name = this.name
      var _price = this.price
      var _num = this.num
      var _description = this.description
      var _address = this.address
      var tags = ''
      var result = ''
      if (_picurl === "") {
        alert("请上传菜品图片！")
      }
      else if (_name === "") {
        alert("请输入菜品名称！")
      }
      else if (_price === "") {
        alert("请输入菜品价格！")
      }
      else if (_num<3) {
        alert("选择的标签过少！")
      }
      else if (_description === "") {
        alert("请输入菜品描述！")
      }
      else if (_address === "") {
        alert("请输入菜品地址！")
      }
      for (var i = 1; i < 23; i++) {
        if (document.getElementById(`${i}`).style.borderColor === "white") {
          tags += document.getElementById(`${i}`).value
        }
      }
      if (_picurl != "" && _name != "" && _price != "" && _num>=3 && _description != "" && _address != "") {
        let url = "http://yb.upc.edu.cn:8084/foodshare/food/public"
        let data = {
          Authorization: _token,
          name: _name,
          kind: tags,
          detail: _description,
          imgurl: _picurl,
          price: _price,
          address: _address
        }
        this.$axios.post(url, data)
        .then(res => {
          result = res.data.message
          alert(result)
          location.reload()
        })
      }
    },
  },
  watch: {
    success: {
      handler: function(val, oldval) {
        if (val === 1) {
          alert('图片上传成功！')
        }
        else{
          alert('图片上传失败，请稍后再试')
        }
      },
      deep: true
    }
  }
}

</script>
<style scoped>
.tag1{
  margin-right:1.5rem;
  margin-top: 1rem;
}
.tag2{
  margin-right:1rem;
}
.tag3{
  margin-right:0.6rem;
}
.tag4{
  margin-right:0.2rem;
}
.upload-container{
  background: url('./upload/个人中心底图.png');
  background-size: 100%,100%;
  min-height: 100%;
  width: 100%;
  padding-top: 2rem;
  padding-bottom: 2rem;
  overflow: hidden;
}

#udframe{
  width: 92%;
  min-height: 60rem;
  margin-left: 4%;
  border: 2px white dashed;
  border-radius: 3rem;
  padding-top: 0.4rem;
}
#photoud{
  width: 96%;
  height: 6rem;
  border: 1px white solid;
  border-top-left-radius:2.5rem;
  border-top-right-radius:2.5rem;
  border-bottom-right-radius:0;
  border-bottom-left-radius:0;
  margin-left: 1.9%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.uphoto{
  position: absolute;
  top: 6.5rem;
  font-size: 1.2rem;
}
#udico{
  position: absolute;
  width: 4rem;
  top: 2.5rem;
}
.puico{
  color:gray;
  font-size: 1.2rem;
  opacity: 0;
}
#submit{
  width: 10rem;
  height: 2.5rem;
  border: 2px white solid;
  border-radius: 1.5rem;
  background: none;
  margin-top: 1.5rem;
  outline:none;
  font-size: 1.2rem;
  font-weight: lighter;
  color: white;
}
.upload{
  width: 90%;
  position: relative;
  left: 1rem;
  top: 1rem;
  margin-top: 1.5rem;
}
.upload p{
  font-size: 1.2rem;
  font-weight: lighter;
  color: white;
}
.upload .input{
  margin-top: 1.8rem;
  font-size: 1rem;
  font-weight: lighter;
  width: 21rem;
  color: white;
  background: none;
  outline: none;
  border:1px solid gray;
  border-top-style: none;
  border-right-style: none;
  border-bottom-style: solid;
  border-left-style: none;
  text-indent: 0.4rem;
  width: 100%;
}
.upload textarea{
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: lighter;
  font-family: heiti;
  width: 100%;
  color: white;
  background: none;
  outline: none;
  border:1px solid gray;
  border-top-style: solid;
  border-right-style: none;
  border-bottom-style: solid;
  border-left-style: none;
}
.upload h1{
  color: white;
  font-weight: lighter;
}
.tag{
  min-width: 1rem;
  height: 1.8rem;
  background: none;
  outline: none;
  border-radius: 0.3rem;
  margin-top: 0.5rem;
  padding-left: 0.1rem;
  padding-right: 0.1rem;
  float: left;
  font-size: 0.9rem;
  font-weight: lighter;
  border: 1px darkgray dashed;
  color: darkgray;
}
.tags{
  height: 17rem;
}
.tags div{
  width: 100%;
  height: 3rem;
}
h1,p{
  text-align: left;
}
.isreturn{
  z-index: 999;
  width: 50%;
  height: 5rem;
  position: fixed;
  left: 25%;
  top: 30%;
  background: rgb(30, 30, 30);
}
@media screen and ( max-width:321px ){
  .tag{
    height: 1.6rem;
    font-size: 0.8rem;
  }
  .tag3{
    margin-right:0.2rem !important;
  }
}
</style>
