<template>
  <div class="content home personnel">
    <div class="home_main">
      <!-- 面包屑导航 -->
      <div class="navcrumbed">
        <div class="navcrumbedimg">
          <img @click="goback" style="cursor: pointer;" src="@/assets/navblack.png" alt srcset />
          <!-- <img src="@/assets/navblack.png" alt srcset /> -->
          <span>当前位置：</span>
        </div>
        <div class="navcrumbedlist">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item  :to="{ path: '/StandingBook' }">人员台账</el-breadcrumb-item>
            <el-breadcrumb-item>人员调动</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <!-- 左侧单位列表 -->
      <div class="homenav" v-loading="loading">
        <span class="border row1"></span>
        <span class="border row2"></span>
        <span class="border col1"></span>
        <span class="border col2"></span>
        <!-- 搜索框 -->
        <div class="searchform">
          <div class="searchform-left">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="查找">
                <el-input v-model="formInline.user" placeholder="关键字查找"></el-input>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="formInline.region" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit" class="searchbtn">
                  <i class="el-icon-search"></i> 查询
                </el-button>
                <!-- <el-button type="primary" class="searchtree" @click="treelistbtn">树状图查找</el-button> -->
                <el-button type="primary" class="addpersonnel" @click="addifon">新增人员</el-button>
              </el-form-item>
            </el-form>
          </div>
          <el-button class="mobilize"><router-link class="mobilizeto" to="/personnellist">人员调动记录</router-link></el-button>
        </div>
        <!-- 查询结果 -->
        <div class="seacchtable" v-if="searchlist">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="num" label="序号"></el-table-column>
            <el-table-column prop="name" label="姓名"> </el-table-column>
            <el-table-column prop="sex" label="性别"></el-table-column>
            <el-table-column prop="age" label="年龄"></el-table-column>
            <el-table-column prop="unit" label="单位"></el-table-column>
            <el-table-column prop="position" label="职务"></el-table-column>
            <el-table-column prop="handle" label="操作" width="350">
              <template slot-scope="scope">
                <el-button class="seebtn " @click="lookparticulars(scope.row)">查看详情</el-button>
                <el-button type="primary" class="searchtree" @click="diaodong(scope.row)">调动</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 树状图 -->
        <div class="seacchtable" v-if="treelist">
          <div class="treelist-box">
            <el-tree :data="treedata" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
          </div>
        </div>
      </div>
    </div>
    <!-- 调动弹框 -->
    <transition name="personnelframe">
      <div class="personnelframe" v-if="personnelpops">
        <div class="personnelframe-close"></div>
        <div class="personnelframe-container">
          <div class="personnelframe-container-box">
            <div class="personnelframe-title">
              <img src="@/assets/diaodong.png" alt="" srcset="">
              <h3>调动人员信息</h3>
            </div>
            <div class="personnelframe-table">
              <div class="personnelframe-table-tr">
                <span>姓名：{{peoplemsg.name}}</span>
                <span>年龄：{{peoplemsg.age}}</span>
                <span>性别：{{peoplemsg.sex}}</span>
              </div>
              <div class="personnelframe-table-tr"><span>单位：{{peoplemsg.units}}</span></div>
              <div class="personnelframe-table-tr"><span>职务：{{peoplemsg.duty}}</span></div>
            </div>
            <div class="personnelframe-title">
              <img src="@/assets/diaodongxinxi.png" alt="" srcset="">
              <h3>当前调动信息</h3>
            </div>
            <div class="radiobox">
              <el-radio-group v-model="radioTreaty" @change="changes">
                <el-radio label="1">内部单位</el-radio>
                <el-radio label="2">外部单位</el-radio>
              </el-radio-group>
            </div>
            <div class="personnelframe-pricker">
              <!-- <el-cascader class="prickerlist" v-model="unitvalue" :options="unitslist" @expand-change="unitChanges" placeholder="请选择到岗单位"></el-cascader> -->
              <!-- <el-cascader v-model="unitvalue" :options="unitslist" @active-item-change="unitChanges" placeholder="请选择到岗单位" :props="{value: 'id',label: 'name',children: 'children'}"></el-cascader>-->          
              <!-- <el-input :disabled="disabled" v-model="peoplemsg.input" readonly v-if="showinput" ></el-input> -->
              <el-input v-show="officeimport" v-model="unitvalue" placeholder="请输入单位名称"></el-input>
              <el-cascader v-show="units" v-model="unitvalue" :options="unitslist" @active-item-change="unitChanges" placeholder="请选择单位名称" :props="{value: 'id',label: 'name',children: 'children'}"></el-cascader>
              <el-input v-model="peoplemsg.input" placeholder="请填写到岗职务"></el-input>
            </div>
          </div>
          <div class="personnelframe-btns">
            <el-button @click="personnelpops=false">取消</el-button>
            <el-button type="primary" @click="submitchangeunit">确定</el-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script src="./script.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
<style lang="scss">
.personnel {
  .el-breadcrumb__inner {
    color: #fff;
  }
  .el-breadcrumb__item:last-child .el-breadcrumb__inner {
    color: #03d0ff;
  }
  .el-form--inline .el-form-item{
    margin-bottom: 0;
  }
  .el-form-item__label{
    color: #fff;
  }
  .el-input__inner,.el-input__inner:hover{
    background: transparent;
    border: 1px solid #016CAE;
  }
  .searchform .el-input__inner{
    color: #fff;
  }
  .el-table,.el-table__expanded-cell,.el-table th, .el-table tr,.el-table th:hover, .el-table tr:hover,.el-table--enable-row-hover .el-table__body tr:hover>td{
    background: transparent;
  }
  .el-table thead,.el-table{
    color: #fff;
  }
  .el-table th{
    text-align: center;
  }
  .el-table .cell{
    text-align: center;
  }
  .el-table--border{
    border: 1px solid #03d0ff; 
  }
  .el-table td, .el-table th.is-leaf{
    border-bottom: none;
    border-right: 1px solid #03d0ff;
  }
  .el-table th.is-leaf:last-child,.el-table--border th:nth-last-child(2){
    border: none;
  }
  .el-table thead{
    background: #027DBC;
  }
  .el-table thead tr th:last-child{
    border: none
  }
  .el-table::before,.el-table--border::after{
    background-color: transparent;
  }
  td.el-table_1_column_7{
    border: none !important;
  }
  .el-table .el-table__body-wrapper tr:nth-child(even){
    background: #2162A8;
  }
  .el-table__body-wrapper{
    max-height: 350px;
    overflow-y: scroll
  }
  .personnelframe-pricker .el-cascader{
    height: auto !important;
  }
  .personnelframe-pricker .el-input__inner,.personnelframe-pricker .el-input__inner:hover{
    border: 1px solid #BCD9E8 !important;
    font-size: 10px;
    height: 30px;
    line-height: 30px;
  }
  .el-cascader-node:not(.is-disabled):hover{
    background: #91C1E7 !important;
  }
  .el-tree,.el-tree-node__content:hover,.el-tree-node:focus>.el-tree-node__content{
    background: transparent;
    color: #fff;
  }
  .el-tree-node__expand-icon{
    color: #fff;
  }
  .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link,.el-breadcrumb__inner a:hover, .el-breadcrumb__inner.is-link:hover{
    color: #fff;
    font-weight: normal;
  }
  .personnelframe-pricker>.el-input{
    width: 49%;
  }
  .el-radio__label{
    font-size: 11px;
    padding-left: 5px;
  }

}

.el-cascader-panel{
  font-size: 10px !important;
}
.el-cascader-menu__wrap::-webkit-scrollbar{
  background: #fff !important;
  // height: 8px;
}
</style>