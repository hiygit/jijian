<template>
  <div>
    <!-- <breadcrumb /> -->
    <!-- 面包屑导航 -->
    <div class="navcrumbed">
      <div class="navcrumbedimg" style="margin-left:10px;">
        <img @click="goback" style="cursor: pointer;" src="@/assets/navblack.png" alt srcset />
        <!-- <img src="@/assets/navblack.png" alt srcset /> -->
        <span>当前位置：</span>
      </div>
      <div class="navcrumbedlist">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><span style="color:#03d0ff">个人系统中心</span></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="content home">
      <div class="UserCenter">
        <span class="border row1"></span>
        <span class="border row2"></span>
        <span class="border col1"></span>
        <span class="border col2"></span>
        <div class="UserCenterMain">
          <div class="leftBlock">
            <div class="leftBlockTitle">
              <div class="list">
                <img src="../../assets/home/census.png" />
                <span>个人系统中心</span>
              </div>
            </div>
            <div class="listAll">
              <div class="leftBlockList" v-for="(item,index) in setList" :key="index">
                <div class="list borderright" :class="activeBlock == index+1?'colorrightborder':''" @click="chooseBlock(index+1)">
                  <img :src="item.imgSrc" />
                  <span>{{item.title}}</span>
                </div>
              </div>
            </div>
            <div class="leftBlockButton">
              <button @click="quitbtn">退出登录</button>
            </div>
          </div>
          <div class="rightBlock">
            <div class="rightBlockTemplate">
              <!-- 人员管理 -->
              <PeopleManage v-if="activeBlock=='1'" />
              <!-- 用户管理 -->
              <!-- <UserManage v-if="activeBlock=='2'" /> -->
              <!-- 角色管理 -->
              <!-- <RoleManage :tableHeight="tableHeight" v-if="activeBlock=='3'" /> -->
              <!-- 菜单管理 -->
              <MenuManage :tableHeight="tableHeight" v-if="activeBlock=='4'" />
              <!-- 日志管理 -->
              <LogManage :tableHeight="tableHeight" v-if="activeBlock=='2'" />
              <!-- 关键词设置 -->
              <KeywordSet :tableHeight="tableHeight" v-if="activeBlock=='6'" />
              <!-- 待办事项设置 -->
              <BacklogSet :tableHeight="tableHeight" v-if="activeBlock=='3'" />
              <!-- 单位架构设置 -->
              <Unitframework :tableHeight="tableHeight" v-if="activeBlock=='8'" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
//人员管理
import PeopleManage from "./PeopleManage";
//用户管理
// import UserManage from "./UserManage";
//角色管理
import RoleManage from "./RoleManage";
//菜单管理
import MenuManage from "./MenuManage";
//日志管理
import LogManage from "./LogManage";
//关键词设置
import KeywordSet from "./KeywrodSet";
//待办事项设置
import BacklogSet from "./BacklogSet";
//单位架构设置
import Unitframework from "./Unitframework";
export default {
  name: "UserCenter",

  props: {},
  data() {
    return {
      activeBlock: "1",
      tableHeight: "66vh",
      setList: [
        {
          id: "1",
          title: "人员管理",
          imgSrc: require("../../assets/people.png")
        },
        // {
        //   id: "2",
        //   title: "用户管理",
        //   imgSrc: require("../../assets/user.png")
        // },
        // {
        //   id: "3",
        //   title: "角色管理",
        //   imgSrc: require("../../assets/role.png")
        // },
        // {
        //   id: "4",
        //   title: "菜单管理",
        //   imgSrc: require("../../assets/menu.png")
        // },
        {
          id: "2",
          title: "日志管理",
          imgSrc: require("../../assets/keyword.png")
        },
        // {
        //   id: "6",
        //   title: "关键词设置",
        //   imgSrc: require("../../assets/keyword.png")
        // },
        {
          id: "3",
          title: "待办事项设置",
          imgSrc: require("../../assets/backlog.png")
        },
        // {
        //   id: "8",
        //   title: "单位架构设置",
        //   imgSrc: require("../../assets/iframework.png")
        // }
      ]
    };
  },
  created() {
    document.title = "个人系统中心";
  },
  computed: {},
  methods: {
    //返回上一页
    goback() {
      this.$router.go(-1);
    },
    chooseBlock(id) {
      this.activeBlock = id;
    },
    quitbtn(){
      this.$router.push({path:"/"})
    },
  },
  components: {
    PeopleManage,
    // UserManage,
    RoleManage,
    MenuManage,
    LogManage,
    KeywordSet,
    BacklogSet,
    Unitframework
  },
  created() {},
  mounted() {},
  watch: {}
};
</script>

<style scoped lang="scss">
.UserCenter {
  width: 95%;
  margin: 0 auto;
  box-sizing: border-box;
  border: 1px solid #03d0ff;
  box-shadow: 0 0 5px #03d0ff inset;
  -webkit-box-shadow: 0 0 5px #03d0ff inset;
  -moz-box-shadow: 0 0 5px #03d0ff inset;
  -o-box-shadow: 0 0 0 5px #03d0ff inset;
  position: relative;
  color: #fff;

  .UserCenterMain {
    display: flex;
    height: 80vh;

    .leftBlock {
      flex: 1;
      border-right: 1px solid #03d0ff;

      .leftBlockTitle,
      .leftBlockList {
        width: 100%;
        height: 9vh;
        line-height: 30px;
        border-bottom: 1px solid #03d0ff;
        padding: 10px;
        box-sizing: border-box;

        .list {
          cursor: pointer;
          display: flex;
          justify-content: space-around;
          height: 30px;
          width: 100%;
          margin: 0 auto;
          display: inline-flex;
          align-items: center;
          justify-content: flex-start;
            position: relative;
          img {
            display: inline-block;
            width: 22px;
            height: 22px;
            margin-right: 10px;
          }

          span {
            display: inline-block;
            width: 100px;
            font-size: 16px;
          }
        }
      }
      .leftBlockList {
        background: #122769;
        border-bottom: none;
        padding: 10px 20px;
      }
    }
    
    div.borderright:after{
        content: "";
        width: 5px;
        height: 60%;
        background: transparent;
        border-radius: 10px;
        position: absolute;
        top: 20%;right: 0;
    }
    div.colorrightborder:after{
        background: #fff;
    }
    .rightBlock {
      flex: 5;
      overflow: hidden;

      .rightBlockTemplate {
        // padding: 15px;
        box-sizing: border-box;
      }

      
    }
  }

  .listAll {
    height: 62vh;
    overflow: hidden;
    overflow-y: scroll;
  }

  .leftBlockButton {
    width: 100%;
    height: 9vh;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      background: #ffffff;
      width: 100px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #000;
      border: none;
      font-size: 14px;
      border-radius: 3px;
    }
  }
}
// **********************************************
.el-breadcrumb__inner.is-link{
  color: #fff;
}
.el-breadcrumb__inner.is-link:hover{
  color: #fff;
}
.el-breadcrumb__item:last-child{
  color: #fff !important;
}
</style>
