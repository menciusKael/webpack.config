<template>
  <header id="head-top">
     <section class="top-box" :style="{background : backGround,color:coLor}">
        <span class="top-title">{{headTitle}}</span>
     </section>
  </header>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["headTitle", "backGround", "coLor"]
};
</script>

<style scoped lang="scss">
@import "../../style/mixin.scss";

#head-top {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  .top-box {
    @include wh(100%, 3rem);
    text-align: center;
    line-height: 3rem;
  }
}
</style>


