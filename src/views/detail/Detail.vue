<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="comments"/>
      <goods-list :goods="recommends" ref="recommends"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addToCart="addToCart"/>

  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoogsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
import GoodsList from 'components/content/goods/GoodsList'

import {getDetail,getRecommend,Goods,Shop,GoodsParam} from 'network/detail'
import Scroll from 'components/common/scroll/Scroll'
import { itmeImgListenerMixin,backTopMixin} from 'common/mixin'
import {debounce} from 'common/utils'

import { mapActions } from 'vuex'

export default {
  name: 'Detail',
  mixins:[itmeImgListenerMixin,backTopMixin],
  data () {
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      getThemeTopY:null,
      currentIndex:0
    };
  },
  created(){
    //保存传入的iid
    this.iid = this.$route.params.iid
    //根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      //获取图片轮播
      const data = res.result
      this.topImages = data.itemInfo.topImages
      //获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      //获取店铺信息
      this.shop = new Shop(data.shopInfo)
      //获取商品详情
      this.detailInfo = data.detailInfo
      //获取商品参数
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      //获取评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
        //给getThemeTopY赋值 对this.getThemeTopY进行防抖操作
        this.getThemeTopY = debounce(()=>{
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
          this.themeTopYs.push(Number.MAX_VALUE)
          // console.log(this.themeTopYs)
        },500)
      }
    })
    //获取推荐数据
    getRecommend().then(res=>{
      // console.log(res)
      this.recommends = res.data.list
    })
  },
  mounted(){
    
  },
  destroyed(){
     //取消全局事件的监听
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  components: {
    DetailNavBar,
     DetailSwiper,
     DetailBaseInfo,
     DetailShopInfo,
     Scroll,
     DetailGoodsInfo,
     DetailParamInfo ,
     DetailCommentInfo ,
     GoodsList,
     DetailBottomBar,
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
     // 判断图片加载完成，刷新可滚动区域
      this.$refs.scroll.refresh()
      // 给navbar中的item定位到对应的位置
      this.getThemeTopY()
    },
    // 点击navbar滚动到对应的位置
    titleClick(index){
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],500)
    },
    // 监听scroll的滚动
    contentScroll(position){
       //判断backTop是否显示
      this.listenShowBackTop(position);
      // console.log(position)
      const positionY = -position.y
      // 与themeTopY进行比对，滚动时让navbar中标题和内容对应
      let length = this.themeTopYs.length
      // for(let i = 0; i < length; i++){
      //   if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < 
      //   this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))){
      //     this.currentIndex = i
      //     this.$refs.nav.currentIndex = this.currentIndex
      //   }
      // }
      //简易判断法
      for(let i = 0; i < length - 1; i ++){
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY <this.themeTopYs[i+1])){
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
    },
    addToCart() {
      //获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price =this.goods.realPrice
      product.iid = this.iid
      //将商品添加到购物车里
      // this.$store.commit('addCart',product) 此方法适用于vuex mutations
      // this.$store.dispatch('addCart',product).then(res => {
      //   console.log(res)
      // })
      //方法映射
      this.addCart(product).then(res => {
        // console.log(this.$toast)
        this.$toast.show(res)
      })
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  height: 100vh;
  background-color: #fff;
}
.content {
  background-color: #fff;
  /* height: calc(100% - 44px -49px); */
  height: calc(100% - 93px);
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;

}
</style>