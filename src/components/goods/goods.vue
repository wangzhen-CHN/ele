<template>
<div class="goods">
    <div class="menu-wrapper" ref="menusWrapper">
        <ul>
           <li class="menu-item" v-for="(good, index) in goods" :key="index" :class="{current: index===scrollIndex}" @click="clickMenuItem(index)">
            <span class="text border-1px">
              <span class="icon" v-if="good.type>=0" :class="classMap[good.type]"></span>{{good.name}}
            </span>
          </li>
        </ul>
    </div>

    <div class="foots-wrapper" ref="footsWrapper">
        <ul>
            <li class="food-list food-list-hook" v-for="(good, index) in goods" :key="index">
                <h1 class="title">{{good.name}}</h1>
                <ul>
                    <li class="foot-item" v-for="(food, index) in good.foods" :key="index">
                        <div class="icon"> <img width="57" height="57" :src="food.icon" alt=""></div>
                        <div class="content">
                            <div class="name">{{food.name}}</div>
                            <div class="extra">
                                <span class="count">月售{{food.sellCount}}份</span>
                                <span>好评率{{food.rating}}%</span>
                            </div>
                            <div class="price">
                                <span class="now">￥{{food.price}}</span>
                                <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </div>

 </div>
</template>

<script type="text/javascript">
import axios from 'axios';
import Bscroll from 'better-scroll';
 export default {
    data(){
         return {
             goods:[],
             footListHeight:[],
             scrollY:0
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
                this.$nextTick(() => {
                    this._initScorll();//初始化滚动
                    this._footListHeight();
                })
            })
            .catch(error => {
                console.log(error);
                alert('网络错误，不能访问');
            })
    },
    methods:{
        _initScorll(){
            this.menuScorll=new Bscroll('.menu-wrapper',{click:true});
            this.footsScorll=new Bscroll('.foots-wrapper',{probeType: 3});
            this.footsScorll.on('scroll',(pos) => {
               this.scrollY=Math.abs(pos.y);
            })
        },
        _footListHeight(){
            let height=0;
            this.footListHeight.push(height);
            let footList = this.$refs.footsWrapper.getElementsByClassName('food-list-hook')
            for(let i=0;i<footList.length;i++){
                let item=footList[i];
                height+=item.clientHeight;
                this.footListHeight.push(height);
            }
        },
        clickMenuItem(index){
            console.log(index);
        }
    },
    computed:{
        scrollIndex () {
            for (let i = 0; i < this.footListHeight.length; i++) {
                let scroll1=this.footListHeight[i];
                let scroll2=this.footListHeight[i+1];
                console.log("1:::"+this.footListHeight[i])
                console.log("2:::"+this.footListHeight[i+1])
                console.log("3:::"+this.scrollY)
                if (!scroll2||(this.scrollY>=scroll1&&this.scrollY<scroll2)) {
                    return i;
                }
            }
            return 0;
        }
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
    }
    .foots-wrapper {
        flex: 1;
        .title{
            padding-left: 14px;
            height: 26px;
            line-height: 26px;
            border-left: 2px solid #d9dde1;
            font-size: 12px;
            color: rgb(147, 153, 159);
            background: #f3f5f7;
        }
        .foot-item {
            display: flex;
            margin: 18px;
            padding-bottom: 18px;
            .border-1px(rgba(7, 17, 27, 0.1));
            &:last-child {
                margin-bottom: 0;
            }
            .icon {
                flex: 0 0 57px;
                margin-right: 10px;
            }
            .content {
                flex: 1;
                .name {
                    margin: 2px 0 8px 0;
                    height: 14px;
                    line-height: 14px;
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                }
          
                .desc,
                .extra {
                    line-height: 10px;
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                }

                .desc {
                    line-height: 12px;
                    margin-bottom: 8px;
                }

                .extra {
                    .count {
                        margin-right: 12px;
                    }
                }

                .price {
                    font-weight: 700;
                    line-height: 24px;
                    .now {
                        margin-right: 8px;
                        font-size: 14px;
                        color: rgb(240, 20, 20);
                    }
                    .old {
                        text-decoration: line-through;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                }

            }
        }
    }

}

</style>