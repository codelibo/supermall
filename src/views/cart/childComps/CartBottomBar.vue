<template>
  <div class="bottom-bar">
    <div class="check-content" >
      <check-button class="check-button" :is-checked="isSelectAll"
      @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div>
      合计:{{totalPrice}}
    </div>
    <div class="calculate" @click="calculateClick">
      去计算:({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'
export default {
  name: 'CartBottomBar',
  data () {
    return {
      
    };
  },
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.cartList.filter(item => item.checked
      ).reduce((previousValue,item) => previousValue + item.price * item.count
      ,0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      if(this.cartList.length === 0) return false
      // return !(this.cartList.filter(item => !item.checked).length)
      return !this.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkClick(){
      if (this.isSelectAll) {
        this.cartList.forEach(item => item.checked = false)
      }else{//未全选中或全未选中
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calculateClick() {
      if(!this.isSelectAll) {
        this.$toast.show('逗我玩呢，你还没有选择商品')
      }
      
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  background-color: #eee;
  height: 40px;
  position: relative;
  line-height: 40px;
  display: flex;
  justify-content: space-around;
  font-size: 16px;
}
.check-content {
  display: flex;
  align-items: center;
  margin-right: 30px;
}
.check-button {
  width: 22px;
  height: 22px;
  line-height: 20px;
  margin-left: 5px;
  margin-right: 5px;
}
.calculate {
  background-color: red;
  color: #fff;
}
</style>