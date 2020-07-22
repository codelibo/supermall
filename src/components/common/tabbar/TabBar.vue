<template>
   <div id="tabbar">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      
    };
  },
  components: {},
  mounted () {},
  methods: {}
}
</script>

<style scoped>
#tabbar{
  display: flex;
  background-color: #f6f6f6;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  border-top: 1px solid #ccc;
}

</style>