<template>

</template>
<script>
export default {
  name: "admin",

  created(){
    let url = '/foodshare/manage/getFood'
    let _token = sessionStorage.getItem("token")
    let data = {
      
    }
    this.$axios.get()
  }
}
</script>

<style>

</style>
