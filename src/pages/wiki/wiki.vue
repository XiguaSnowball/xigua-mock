<template>
<div align="center" id="app">
    <div class="container" style="border-bottom: 0px;margin-bottom: 0px;">
        <h1>
            <span>数据格式定义规范</span>
        </h1>
    </div>
    <div class="container"
         style="margin-top: 0px;padding-top: 0px;padding-bottom: 0px;margin-bottom: 0px;margin-left: 90px;margin-right: 100px;width: 1453px;">
        <div class="row clearfix">
            <fieldset style="width: 1100px;" align="center">
                <vue-markdown style="text-align: left">{{msg}}</vue-markdown>
            </fieldset>
        </div>
    </div>
  <div class="copyright" align="center" style="color: #99a9bf">Copyright © 西瓜</div>
</div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import wiki from './wiki.md'
export default {
  name: 'document',
  components: {
    VueMarkdown
  },
  data () {
    return {
      msg: wiki
    }
  },
  methods: {
  }
}
</script>

<style>
  @import '../../assets/css/demo.css';
</style>
