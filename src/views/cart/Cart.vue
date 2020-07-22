<template>
  <div id="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <scroll class="content" ref="scroll">
      <cart-list/>
    </scroll>
    <!-- 底部汇总 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import { mapGetters } from 'vuex'
export default {
  name: 'Cart',
  data () {
    return {
      
    };
  },
  components: {
    Scroll,
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
   ...mapGetters(['cartLength'])
  },
  mounted () {},
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
#cart{
  position: relative;
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color:#fff;
  font-weight: 700;
  height: 44px;
  position: relative;
}
.content {
  background-color: #fff;
  height: calc(100vh - 44px - 50px - 40px);
  overflow: hidden;
}
</style>