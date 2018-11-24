<template>
  <main class="upload-container" align="center">
    <div style="width:100%;min-height:100%">
      <div id="udframe">
        <div id="photoud" v-show="ifnotdown">
          <div class="uploading" v-show="isuploading">
            <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
            <div class="uploading-text">正在上传</div>
          </div>
          <div class="bfupload" v-show="isbeforeupload">
            <img :src="udico" id="udico">
            <input class="puico" type="file" value="" id="file" accept="image/*" @change="uploadConfig" style="none"></input>
            <span class="uphoto">上传照片</span>
          </div>
        </div>
        <img :src="picurl" class="picurl">
        <div class="upload upinput">
          <p>菜品名称</p>
          <input class="input" type="text" placeholder="(10字内)" maxlength="20" v-model="name">
        </div>
        <div class="upload upinput">
          <p>价格</p>
          <input class="input" type="text" placeholder="(10字内)" maxlength="20" v-model="price">
        </div>
        <div class="upload tags">
          <h1>请选择至少三个标签</h1>
          <div class="tags">
            <div>
              <input v-for="tag in tags" v-if="tag.id>0&&tag.id<5" type="button" class="tag tag1" @click="fun($event)"
                :value="tag.name" :id=tag.id></input>
            </div>
            <div>
              <input v-for="tag in tags" v-if="tag.id>4&&tag.id<10" type="button" class="tag tag2" @click="fun($event)"
                :value="tag.name" :id=tag.id></input>
            </div>
            <div>
              <input v-for="tag in tags" v-if="tag.id>9&&tag.id<14" type="button" class="tag tag3" @click="fun($event)"
                :value="tag.name" :id=tag.id></input>
            </div>
            <div>
              <input v-for="tag in tags" v-if="tag.id>13&&tag.id<18" type="button" class="tag tag3" @click="fun($event)"
                :value="tag.name" :id=tag.id></input>
            </div>
            <div>
              <input v-for="tag in tags" v-if="tag.id>17&&tag.id<24" type="button" class="tag tag4" @click="fun($event)"
                :value="tag.name" :id=tag.id></input>
            </div>
          </div>
        </div>
        <div class="upload uptext">
          <p>菜品描述</p>
          <textarea placeholder="请在此输入(50字内)" name="" id="" rows="4" v-model="description" maxlength="100"></textarea>
        </div>
        <div class="upload upinput">
          <p>详细地址</p>
          <input class="input" type="text" placeholder="(18字内)" maxlength="36" v-model="address">
        </div>
      </div>
    </div>
    <button id="submit" @click="submit">发布</button>
  </main>
</template>
<script>
  export default {
    name: 'upload',
    data() {
      return {
        isbeforeupload: true,
        isreturn: false,
        isuploading: false,
        ifnotdown: true,
        udico: require('./upload/上传照片74乘74.png'),
        success: 0,
        tags: [{
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
            name: "综合"
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
    created() {
      document.title = '美食我来说'
    },
    methods: {
      fun(e) {
        if (e.target.style.color === "white") {
          e.target.style.border = "1px darkgray dashed";
          e.target.style.color = "darkgray";
          this.num--
        } else {
          e.target.style.border = "1px white solid";
          e.target.style.color = "white";
          this.num++
        }
      },
      compressImage: (file, success, error) => {
        var _this = this
        // 图片小于1M不压缩
        if (file.size <= Math.pow(512, 2)) {
          return success(file);
        }
        var filesize = file.size
        const name = file.name; //文件名
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          const src = e.target.result;
          const img = new Image();
          img.src = src;
          img.onload = (e) => {
            const w = img.width;
            const h = img.height;
            const quality = 0.4; // 默认图片质量为0.92
            //生成canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            // 创建属性节点
            const anw = document.createAttribute("width");
            anw.nodeValue = w;
            const anh = document.createAttribute("height");
            anh.nodeValue = h;
            canvas.setAttributeNode(anw);
            canvas.setAttributeNode(anh);

            //铺底色 PNG转JPEG时透明区域会变黑色
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, w, h);

            ctx.drawImage(img, 0, 0, w, h);
            // quality值越小，所绘制出的图像越模糊
            const base64 = canvas.toDataURL('image/jpeg', quality); //图片格式jpeg或webp可以选0-1质量区间

            // 返回base64转blob的值
            console.log(`原图${(src.length/1024).toFixed(2)}kb`, `新图${(base64.length/1024).toFixed(2)}kb`);
            //去掉url的头，并转换为byte
            const bytes = window.atob(base64.split(',')[1]);
            //处理异常,将ascii码小于0的转换为大于0
            const ab = new ArrayBuffer(bytes.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < bytes.length; i++) {
              ia[i] = bytes.charCodeAt(i);
            }
            file = new Blob([ab], {
              type: 'image/jpeg'
            });
            file.name = name;
            var files = new window.File([file], file.name, {
              type: 'image/jpeg'
            })
            /*if (files.size > Math.pow(512, 2)) {
              console.log(1)
              return (files, (file)).compressImage
            }else {*/
            success(files);
            //}
          }
          img.onerror = (e) => {
            error(e);
          }
        }
        reader.onerror = (e) => {
          error(e);
        }
      },
      uploadConfig(e) {
        var formData = new FormData();
        this.isbeforeupload = false
        this.isuploading = true
        this.compressImage(e.target.files[0], (file) => {
          console.log(file);
          //压缩图片
          console.log(1)
          let _token = sessionStorage.getItem("token")
          formData.append('file', file);
          formData.append('Authorization', _token)
          //log（data）
          for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
          }
          //
          let url = 'http://yb.upc.edu.cn:8084/upload/file' //fetch方法上传图片
          fetch(url, {
              method: 'POST',
              body: formData
            }).then(response => response.json())
            .then(json => {
              console.log(json)
              this.picurl += 'http://yb.upc.edu.cn/' + json.data
              this.picurl = this.picurl.replace("\\", "\/")
              this.picurl = this.picurl.replace("\\", "\/")
              this.success = json.success
            })
            .catch(function (error) {
              console.log('request failed: ', error)
            })
        }, $.noop);

      },
      submit() {
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
        } else if (_name === "") {
          alert("请输入菜品名称！")
        } else if (_price === "") {
          alert("请输入菜品价格！")
        } else if (_num < 3) {
          alert("选择的标签过少！")
        } else if (_description === "") {
          alert("请输入菜品描述！")
        } else if (_address === "") {
          alert("请输入菜品地址！")
        }
        for (var i = 1; i < 23; i++) {
          if (document.getElementById(`${i}`).style.borderColor === "white") {
            tags += document.getElementById(`${i}`).value
          }
        }
        if (_picurl != "" && _name != "" && _price != "" && _num >= 3 && _description != "" && _address != "") {
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
        handler: function (val, oldval) {
          if (val === 1) {
            this.ifnotdown = false
            alert('图片上传成功！')
          } else {
            alert('图片上传失败，请稍后再试')
          }
        },
        deep: true
      }
    }
  }

</script>
<style scoped>
  .tag1 {
    margin-right: 1.5rem;
    margin-top: 1rem;
  }

  .tag2 {
    margin-right: 1rem;
  }

  .tag3 {
    margin-right: 0.6rem;
  }

  .tag4 {
    margin-right: 0.2rem;
  }

  .upload-container {
    background-size: 100%, 100%;
    min-height: 46rem;
    width: 100%;
    padding-top: 2rem;
    padding-bottom: 2rem;
    overflow: hidden;
  }

  #udframe {
    width: 92%;
    min-height: 61rem;
    margin-left: 4%;
    border: 2px white dashed;
    border-radius: 3rem;
    padding-top: 0.4rem;
    padding-bottom: 4rem;
  }

  #photoud {
    width: 96%;
    min-height: 6rem;
    border: 1px white solid;
    border-top-left-radius: 2.5rem;
    border-top-right-radius: 2.5rem;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    margin-left: 1.9%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .bfupload {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .uphoto {
    position: absolute;
    top: 6.5rem;
    font-size: 1.2rem;
  }

  .uploading {
    margin-top: 5%;
    color: cadetblue;
  }

  .uploading-text {
    height: 2rem;
    width: 9rem;
    font-size: 1rem;
    text-align: center;
  }

  #udico {
    position: absolute;
    width: 4rem;
    top: 2.5rem;
  }

  .puico {
    color: gray;
    font-size: 1.2rem;
    opacity: 0;
  }

  #submit {
    width: 40%;
    height: 2.5rem;
    border: 2px white solid;
    border-radius: 1.5rem;
    background: none;
    margin-top: 1.5rem;
    outline: none;
    font-size: 1.2rem;
    font-weight: lighter;
    color: white;
  }

  .upload {
    width: 90%;
    position: relative;
    left: 1rem;
    top: 1rem;
    margin-top: 1.5rem;
  }

  .upinput {
    height: 5rem;
  }

  .uptext {
    height: 10rem;
  }

  .upload p {
    font-size: 1.2rem;
    font-weight: lighter;
    color: white;
  }

  .upload .input {
    margin-top: 1.8rem;
    font-size: 1rem;
    font-weight: lighter;
    width: 21rem;
    color: white;
    background: none;
    outline: none;
    border: 1px solid gray;
    border-top-style: none;
    border-right-style: none;
    border-bottom-style: solid;
    border-left-style: none;
    text-indent: 0.4rem;
    width: 100%;
  }

  .upload textarea {
    margin-top: 1rem;
    font-size: 1rem;
    font-weight: lighter;
    width: 100%;
    color: white;
    background: none;
    outline: none;
    border: 1px solid gray;
    border-top-style: solid;
    border-right-style: none;
    border-bottom-style: solid;
    border-left-style: none;
  }

  .upload h1 {
    color: white;
    font-weight: lighter;
  }

  .tag {
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

  .tags {
    height: 17rem;
  }

  .tags div {
    width: 100%;
    height: 3rem;
  }

  h1,
  p {
    text-align: left;
  }

  .isreturn {
    z-index: 999;
    width: 50%;
    height: 5rem;
    position: fixed;
    left: 25%;
    top: 30%;
    background: rgb(30, 30, 30);
  }

  @media screen and (max-width:321px) {
    .tag {
      height: 1.6rem;
      font-size: 0.8rem;
    }

    .tag3 {
      margin-right: 0.2rem !important;
    }
  }

  .picurl {
    position: relative;
    top: 0;
    width: 98%;
    border-top-left-radius: 2.5rem;
    border-top-right-radius: 2.5rem;
  }

</style>
