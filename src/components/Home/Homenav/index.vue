<template>
  <div class="homenav">
    <span class="border row1"></span>
    <span class="border row2"></span>
    <span class="border col1"></span>
    <span class="border col2"></span>
    <img class="homenav_img_stayneed" src="@/assets/home/stayneed.png" alt />
    <!-- 待办 -->
    <div class="homenav_stayneed">
      <h2>{{commission}}</h2>
      <p>待办事项</p>
    </div>
    <div class="homenav_stayneed_look" @click="handleGolink('/home/backlog')">点击查看</div>
    <!-- 单位数 -->
    <img class="homenav_img_stayneed homenav_img_unitnum" src="@/assets/home/unitnum.png" alt />
    <div class="homenav_stayneed homenav_unitnum">
      <div style="width:100%;display:flex;justify-content: center;">
        <div style="margin-right:25px">
          <h2>{{officeCount}}</h2>
          <p class>直属事业单位</p>
        </div>
        <div>
          <h2>{{orgCount}}</h2>
          <p class>内设机构</p>
        </div>
      </div>
      <!-- 选择哪家单位 -->
      <div class="homenav_unitum_main">
        <el-scrollbar class="homenav_unitum_main_company">
          <div class="homenav_unitum_main_item" v-for="(item,index) in companydata" :key="index" @click="selunit(item)">
            <div class="homenav_unitum_main_item_empty" :class="item.checkedstate  ? 'homenav_unitum_main_item_empty_selectempty' : ''">
              <span class="homenav_unitum_main_item_empty_selectempty_inside" v-show="item.checkedstate"></span>
            </div>
            <div>{{item.name}}</div>
          </div>
        </el-scrollbar>
        <div class="homenav_unitum_main_item homenav_unitum_main_item_all">
          <div class="homenav_unitum_main_item_empty" :class="checkedall ? 'homenav_unitum_main_item_all_border' : ''" @click="checkedall?'':allcompanychecked()">
            <img src="@/assets/home/checked.png" alt v-show="checkedall" />
          </div>
          <div>{{companydata.length}}家单位总体统计</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src='./script.js'></script>

<style lang='scss' src='./style.scss'></style>
<style>
/* 取消elementx轴的滚动条 */
.homenav /deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>