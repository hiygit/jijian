<template>
  <el-breadcrumb class="app-breadcrumb customStyle"  separator-class="el-icon-arrow-right">
    <img @click="goback" style="cursor: pointer;float: left;margin-top: 23px;margin-right: 6px;width: 35px;" src="@/assets/navblack.png" alt srcset />
    <span style="float:left;color:#fff;margin-right:15px;">当前位置 :</span>
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'
import { match } from 'minimatch'

export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]
      if (!this.isDashboard(first)) {
        matched = [{ path: '/home', meta: { title: '首页' }}].concat(matched)
      }
      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === '首页'.toLocaleLowerCase()
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      return path
      // 链接正则
      // const { params } = this.$route
      // var toPath = pathToRegexp.compile(path)
      // return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    },
    //返回上一页
    goback(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #59DCFB;
    cursor: text;
  }
}
.el-breadcrumb__inner a, .el-breadcrumb__inner.is-link{
  color: #fff
}
.el-breadcrumb__separator{
  font-weight: bold
}
.customStyle{
  position: relative;
  top: -25px;
  left: 20px;
  z-index: 1111
}
</style>
