<template>
    <div>

    <Modal v-model="modal2" width="10%" height="50%" class-name="modalcss" :closable="false" :footer-hide="true" >

        <div style="margin-top:2%;">
            <p style="text-align:center;color:white;fontSize:120%;margin-top:34%" >您推荐的美食已通过审核</p>
           <img :src="src1" style="width:100%;">
           <p style="text-align:center;color:white;fontSize:120%;">20网薪已发入你的账户</p>
        </div>


    </Modal>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                modal7: false,
                modal8: false,
                 modal2: true,
                modal_loading: false,
                src1:require('./u566.png'),
            }
        },
         methods: {

        }
    }
</script>
<style scoped>
.ivu-modal{
outline-style: dotted
}
.modalcss{
    display: flex;
        align-items: center;
        justify-content: center;
        width: 30%;

}
.ivu-modal-body {
    padding: 0;

}
</style>
<style>


.ivu-modal-header{border-bottom:1px solid #e9eaec;padding:14px 16px;line-height:1}.ivu-modal-header p,.ivu-modal-header-inner{display:inline-block;width:100%;height:20px;line-height:20px;font-size:14px;color:#1c2438;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ivu-modal-close{font-size:12px;position:absolute;right:16px;top:8px;overflow:hidden;cursor:pointer}.ivu-modal-close .ivu-icon-ios-close-empty{font-size:31px;color:#999;-webkit-transition:color .2s ease;transition:color .2s ease;position:relative;top:1px}.ivu-modal-close .ivu-icon-ios-close-empty:hover{color:#444}



.ivu-modal-body{padding:0;font-size:12px;line-height:1.5}

.ivu-modal-header{border-bottom:1px solid #e9eaec;padding:14px 16px;line-height:1}.ivu-modal-header p,.ivu-modal-header-inner{display:inline-block;width:100%;height:20px;line-height:20px;font-size:14px;color:#1c2438;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ivu-modal-close{font-size:12px;position:absolute;right:16px;top:8px;overflow:hidden;cursor:pointer}.ivu-modal-close .ivu-icon-ios-close-empty{font-size:31px;color:#999;-webkit-transition:color .2s ease;transition:color .2s ease;position:relative;top:1px}.ivu-modal-close .ivu-icon-ios-close-empty:hover{color:#444}

 .ivu-modal-content

{position:relative;background-color:#2d2b2b;border:0;border-radius:6px;background-clip:padding-box;}


.ivu-modal-body{padding:0;font-size:12px;line-height:1.5}
</style>


