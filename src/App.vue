<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <router-link class="tab-item" to="/goods"> <span>商品</span></router-link>
      <router-link class="tab-item" to="/rating"><span>评论</span></router-link>
      <router-link class="tab-item" to="/seller"><span>商家</span></router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import header from "./components/header/header";
import axios from 'axios';
export default {
  data () {
      return {
        seller: {}
      }
    },
  components: {
      'v-header': header
    },
  created(){
    axios.get('/api/seller')
      .then(response=>{
         this.seller=response.data.data;
        
      })
      .catch(error=>{
          console.log(error);
          alert('网络错误，不能访问');
      })
  }

}
</script>
<style lang="less">

  @import "./common/style/mixins.less";
  @import "./common/style/fonts.less";
  @normalSize: "14px";
  .tab {
    height: 40px;
    line-height: 40px;
    display: flex;
    .border-1px(rgba(7, 17, 27, 0.1));
    .tab-item {
      flex: 1;
      font-size: @normalSize;
      color: rgb(77, 85, 93);
      text-align: center;
      span {
        position: relative;
      }
    }
    .router-link-active {
      color: #3190e8;
      span::after {
        content: "";
        position: absolute;
        bottom: -9px;
        left: 0;
        right: 0;
        height: 2px;
        background-color: #2395ff;
      }
    }
  }

</style>
