import { debounce } from './utils'
import BackTop from 'components/content/backTop/BackTop'
import { TOP_DISTANCE,POP, NEW, SELL } from "./const";


export const itmeImgListenerMixin = {
  data() {
    return {
      itemImgListener:null
    }
  },
  mounted( ){
     //监听item中图片加载完成
     const refresh = debounce(this.$refs.scroll.refresh,500)
     //对监听的事件进行保存
     this.itemImgListener = ()=>{
       refresh();
     }
     this.$bus.$on('itemImageLoad',this.itemImgListener)
  }
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop:false
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500);
    },
    listenShowBackTop(position) {
      this.isShowBackTop = -position.y > TOP_DISTANCE;
    }
  }
}

export const tabControlMixin = {
	data: function () {
		return {
			currentType: POP
		}
	},
	methods: {
		tabClick(index) {
			switch (index) {
				case 0:
					this.currentType = POP
					break
				case 1:
					this.currentType = NEW
					break
				case 2:
					this.currentType = SELL
					break
			}
		}
	}
}