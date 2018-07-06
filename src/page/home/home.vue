<template>
<div class="home-container"> 
  <head-Top head-title="首页" back-ground="black" co-lor="white"></head-Top>    
</div>  

</template>

<script>
 
import headTop from "../../components/header/head";
export default {
  data() {
    return {};
  },
  created() {
    this.initData();
  }, 
  components: {
    headTop
  },
  methods: {
    initData() {
      this.axios
        .post("http://mps.essocial.com.cn/api/customer/getPointHistoryList", {
          customer_id: "6"
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

 
<style scoped lang="scss">
</style>