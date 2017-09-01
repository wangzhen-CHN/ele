<template>
<div class="goods">
    <div class="menu-wrapper">
        <ul>
           <li class="menu-item" v-for="(good, index) in goods" :key="index" @click="clickMenuItem(index, $event)">
            <span class="text border-1px">
              <span class="icon" v-if="good.type>=0" :class="classMap[good.type]"></span>{{good.name}}
            </span>
          </li>
        </ul>
    </div>
    <div class="foots-wrapper"></div>
 </div>
</template>

<script type="text/javascript">
import axios from 'axios';
import Bscroll from 'better-scroll';
 export default {
     data(){
         return {
             goods:[]
         }
     },
     props: {
        seller: Object
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
        axios.get('/api/goods')
            .then(response => {
                this.goods = response.data.data;
                console.log(response.data.data);
            })
            .catch(error => {
                console.log(error);
                alert('网络错误，不能访问');
            })
    }
 }
</script>

<style lang="less">
  @import "../../common/style/mixins.less";
 
.goods {
    position: absolute;
    width: 100%;
    display: flex;
    top: 180px;
    bottom: 46px;
    overflow: hidden;
    .menu-wrapper {
        width: 80px;
        background: #f3f5f7;
        .menu-item {
            display: table;
            height: 54px;
            width: 56px;
            padding: 0 12px;
            line-height: 14px;
        }
        &.current {
            position: relative;
            z-index: 10;
            margin-top: -1px;
            background: #fff;
            font-weight: 700;
        }
        .text {
            text-align: center;
        }

        .icon {
            display: inline-block;
            vertical-align: top;
            width: 12px;
            height: 12px;
            margin-right: 2px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            &.decrease {
                .bg-image(goods, decrease_3);
            }
            &.discount {
                .bg-image(goods, discount_3);
            }
            &.guarantee {
                .bg-image(goods, guarantee_3);
            }
            &.invoice {
                .bg-image(goods, invoice_3);
            }
            &.special {
                .bg-image(goods, special_3);
            }
        }

        .text {
            display: table-cell;
            width: 56px;
            vertical-align: middle;
            .border-1px(rgba(7, 17, 27, 0.1));
            font-size: 12px;
        }
    }
    .foots-wrapper {
        flex: 1;
    }
}

</style>