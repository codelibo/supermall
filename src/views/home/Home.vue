<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <tab-control :titles="['流行','新款','精选']" 
        @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"/>
      <scroll class="content" ref="scroll" :probe-type="3" 
      @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
        <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"/>
        <home-recommend :recommends="recommends"/>
        <home-popular/>
        <tab-control :titles="['流行','新款','精选']" 
        @tabClick="tabClick" ref="tabControl2"/>
        <goods-list :goods="showGoods" />
      </scroll>
      <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabcontrol/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'

import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommend from './childComps/HomeRecommend'
import HomePopular from './childComps/HomePopular'

import { getHomeMultidata,getHomeGoods } from "network/home"
import { itmeImgListenerMixin,backTopMixin } from 'common/mixin'

export default {
  name: 'Home',
  mixins:[itmeImgListenerMixin,backTopMixin],
  data () {
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop': {page:0,list:[]},
        'new': {page:0,list:[]},
        'sell': {page:0,list:[]}
      },
      currentType:'pop',
      tapOffsetTop:0,
      isTabFixed:false,
      saveY:0,
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    HomeRecommend,
    HomePopular,
    GoodsList,
    Scroll,
  },
  created() {
    //请求多个数据
    this.getHomeMultidata()
    //请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
    
  },
  mounted() {
   
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    //保存y值
    this.saveY = this.$refs.scroll.getScrollY()
    //取消全局事件的监听
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  methods: {
    /**
     * 事件监听
     */
    tabClick(index){
      switch(index){
        case 0 :
          this.currentType = 'pop'
          break
        case 1 :
          this.currentType = 'new'
          break
        case 2 :
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    
    contentScroll(position){
      //判断backTop是否显示
      this.listenShowBackTop(position);
      //判断tabControl是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop;
    },
    loadMore(){
      this.getHomeGoods(this.currentType);
    },
    swiperImgLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /**
     * 网络请求
     */
    getHomeMultidata(){
      getHomeMultidata().then(res => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type,page).then(res=>{
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        //完成上拉加载更多
        this.$refs.scroll.finishPullUp();
    })
    }
  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;
  position: relative;
  height: 100vh;
}
.home-nav {
  background-color:var(--color-tint);
  color:#fff;
  /**在使用浏览器原生滚动时，为了不让导航跟随一起滚动 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 4; */
}
.content {
  position:absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control{
  position:relative;
  z-index: 2;
}
</style>