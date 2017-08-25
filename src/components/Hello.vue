<template>
  <div class="hello">
    <mt-button type="default">default</mt-button>
    <mt-button type="primary">primary</mt-button>
    <mt-button type="danger">测试页面</mt-button>
  </div>

</template>

<script>
  import { Toast } from 'mint-ui';
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
      if(true){
        Toast({
          message: '提示',
          position: 'bottom',
          duration: 3000
        });
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  font-size:0.32rem;
}

ul {
  list-style-type: none;
  padding: 0;
  font-size:0.20rem;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
