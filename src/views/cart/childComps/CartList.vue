<template>
  <div class="cart-list">
    <cart-list-item v-for="(item,index) in cartList" :key="index" :product="item"/> 
  </div>
</template>

<script>

import CartListItem from './CartListItem'
import { mapGetters } from 'vuex'
export default {
  name: 'CartList',
  data () {
    return {
      
    };
  },
  components: {
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
}
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 40px);
}

</style>