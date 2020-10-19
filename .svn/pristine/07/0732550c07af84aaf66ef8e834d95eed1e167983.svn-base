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
          <el-breadcrumb-item><span style="color:#03d0ff">代办事项</span></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="content home" v-loading="loading">
      <div class="Backlog">
        <span class="border row1"></span>
        <span class="border row2"></span>
        <span class="border col1"></span>
        <span class="border col2"></span>
        <div class="BacklogTop">
          <!-- 当前待办事项 -->
          <div class="nowBackLog">
            <p class="nowBackTitle">
              <img src="../../assets/backlogDataIcon.png" />
              <span>当前待办事项</span>
            </p>
            <p class="nowBackData">{{tableData.length}}</p>
          </div>
          <div class="searchBackLog">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="时间">
                <el-date-picker v-model="formInline.reportDate" type="date" placeholder="选择日期" value-format='yyyy-MM-dd'></el-date-picker>
              </el-form-item>
              <el-form-item label="承担单位">
                <!-- <el-cascader v-model="formInline.underwriterId" :options="unitslist" @expand-change="unitChanges" placeholder="请选择承担单位"></el-cascader> -->
                <el-cascader v-model="formInline.underwriterId" :options="unitslist" @active-item-change="unitChanges" placeholder="请选择承担单位" :props="{value: 'id',label: 'name',children: 'children'}"></el-cascader>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <el-table :data="tableData" border :height="tableHeight" stripe style="background-color:transparent" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <el-table-column label="序号" prop="num" width="100"></el-table-column>
          <el-table-column label="紧急程度" prop="status" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.status==0" class="statusStyle statusStyle1"></span>
              <span v-if="scope.row.status==1" class="statusStyle statusStyle2"></span>
              <span v-if="scope.row.status==2" class="statusStyle statusStyle3"></span>
            </template>
          </el-table-column>
          <el-table-column label="进度开始日期" prop="sdate" width="220"></el-table-column>
          <el-table-column label="重点工作内容" prop="contents"></el-table-column>
          <el-table-column label="进度截止日期" prop="edate" width="220"></el-table-column>
          <el-table-column label="操作" width="120px">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: "Backlog",
  data() {
    return {
      loading: true,
      formInline: {
        reportDate: "",
        underwriterId: "",
      },
      //承担单位
      units:[],
      tableData: [],
      //级联选择
      unitslist:[],
      unitvalue:"",

      //表格高度
      tableHeight: "53vh"
    };
  },
  created(){
      document.title = "代办事项"
  },
  mounted(){
    let requeststr = this.formInline;
    this.init(requeststr) 
    this.initunits()
  },
  methods: {
      //初始化
      init(requeststr){
          let that = this; 
          let tablelist = [];
          this.$ajax({
              method:'post',
              url:that.globals.requesturl + 'web/backlogsetting/listIndexs',
              data:requeststr,
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              transformRequest: [function (data) { 
                return qs.stringify(data)
            }]
          }).then(res=>{
              if(res.data.errorCode == "-1"){
                that.loading = false
                  res.data.body.backlogList.map(function(list,index){
                      tablelist.push({
                          num: parseInt(index)+1,
                          status:list.emergencyResponse,
                          sdate:list.starttime,
                          edate:list.endtime,
                          contents:list.description,
                      })
                  })
                  that.tableData = tablelist
              }else{
                  this.$message.error(res.data.msg); 
              }
          })
      },
      
    // 查询单位
    initunits(){
      let that = this; 
      let objs = {
        userId: JSON.parse(localStorage.getItem('userinfo')).isd,
      } 
      this.$ajax({
        method: "POST",
        url: that.globals.requesturl + 'web/office/list',
        data: objs,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: [function (data) { 
          return qs.stringify(data)
        }]
      }).then(res=>{
        if(res.data.errorCode == "-1"){
          let lists = [];
          that.unitslist = res.data.body.officeList.map(function(list,index){
            return {
              id: list.id,
              name: list.name,
              children: []
            }
          })
        }else{
          this.$message.error(res.data.msg); 
        }
      })
    },
    //级联事件
    unitChanges(data) {
      let that = this;
      let objs = {
        userId: JSON.parse(localStorage.getItem('userinfo')).isd,
        parentId:data[data.length-1]
      } 
      this.$ajax({
        method: "POST",
        url: that.globals.requesturl + 'web/office/getChildren',
        data: objs,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: [function (data) { 
          return qs.stringify(data)
        }]
      }).then(res=>{
        if(res.data.errorCode == "-1"){
          if(data.length == 1){
            that.unitslist.map(function(list,index){
              if(list.id == data[0]){
                if(!list.children.length){
                  list.children = res.data.body.officeList.map(function(list,index){
                    return {
                      id: list.id,
                      name: list.name,
                      children: list.hasChildren==false?"":[]
                    }
                  })
                }
              }
            })
          }else if(data.length == 2){
            that.unitslist.map(function(list,index){
              if(list.id == data[0]){
                list.children.map(function(list,index){
                  if(list.id == data[1]){
                    if(!list.children.length){
                      list.children = res.data.body.officeList.map(function(list,index){
                        return {
                          id: list.id,
                          name: list.name,
                          children:list.hasChildren==false?"":[]
                        }
                      })
                    }
                  }
                })
              }
            })
          }
        }else{
          this.$message.error(res.data.msg); 
        }
      })
    },
    onSubmit() {
      let requeststr = {
        reportDate: this.formInline.reportDate,
        underwriterId: this.formInline.underwriterId[this.formInline.underwriterId.length-1],
      };
      this.init(requeststr) 
    },
    // 表格样式的处理
    cellStyle({ row, column, rowIndex, columnIndex }) {
      //基数偶数延时不同
      if (rowIndex % 2 != 0) {
        return {
          "background-color": "#2162A8",
          "text-align": "center",
          color: "#fff",
          "font-weight": "normal",
          padding: "5px 0"
        };
      } else {
        return {
          "background-color": "#02468F",
          "text-align": "center",
          color: "#fff",
          "font-weight": "normal",
          padding: "5px 0"
        };
      }
    },
    headerCellStyle({ row, rowIndex }) {
      return {
        "background-color": "#027DBC",
        "text-align": "center",
        color: "#fff",
        "font-weight": "normal",
        "font-size": "16px"
      };
    },
    handleEdit() {
      this.$router.push({path:'/problemstandBook/pointfollow'})
    },
    getSummary(params) {
      console.log(params);
    },//返回上一页
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss">
.Backlog {
  width: 95%;
  margin: 0 auto;
  box-sizing: border-box;
  border: 1px solid #03D0FF;
  box-shadow: 0 0 5px #03D0FF inset;
  -webkit-box-shadow: 0 0 5px #03D0FF inset;
  -moz-box-shadow: 0 0 5px #03D0FF inset;
  -o-box-shadow: 0 0 0 5px #03D0FF inset;
  position: relative;
  padding: 12px 10px;
  color: #fff;

  .BacklogTop {
    display: flex;
    width: 100%;
    height: 140px;

    .nowBackLog {
      width: 220px;
      height: 100px;
      margin: 10px auto 15px;
      box-sizing: border-box;
      border: 1px solid #03D0FF;
      box-shadow: 0 0 5px #03D0FF inset;
      -webkit-box-shadow: 0 0 5px #03D0FF inset;
      -moz-box-shadow: 0 0 5px #03D0FF inset;
      -o-box-shadow: 0 0 5px #03D0FF inset;
      position: relative;
      padding: 12px 10px;
      background-color: rgb(9, 101, 147);

      .nowBackTitle {
        overflow: hidden;

        img {
          display: inline-block;
          width: 30px;
          height: 30px;
          float: left;
          margin-left: 10px;
        }

        span {
          display: inline-block;
          font-size: 16px;
          float: left;
          line-height: 30px;
          margin-left: 15px;
        }
      }

      .nowBackData {
        text-align: center;
        align-items: center;
        font-size: 38px;
      }
    }

    .searchBackLog {
      flex: 1;
      height: 100px;
      margin: 10px auto 15px;
      margin-left: 20px;
      padding: 12px 20px;
      box-sizing: border-box;
      border: 1px solid #03D0FF;
      box-shadow: 0 0 5px #03D0FF inset;
      -webkit-box-shadow: 0 0 5px #03D0FF inset;
      -moz-box-shadow: 0 0 5px #03D0FF inset;
      -o-box-shadow: 0 0 5px #03D0FF inset;
    }
  }

  .el-form-item__label {
    color: #ffffff;
  }

  .el-input__inner {
    color: #fff;
    background: transparent;
    border: 1px solid rgba(3, 208, 255, 0.7);
  }

  input::placeholder {
    color: #fff;
  }

  .el-button--primary {
    color: #FFF;
    background-color: #025BFF;
    border-color: #025BFF;
  }

  .el-form {
    margin-top: 15px;
  }

  .statusStyle {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 7px;
  }
  .el-cascader-node__label{
    font-size: 14px;
  }
  .statusStyle1 {
    background-color: rgba(214, 56, 56, 1);
  }

  .statusStyle2 {
    background-color: rgba(214, 140, 56, 1);
  }

  .statusStyle3 {
    background-color: rgba(56, 214, 142, 1);
  }
}
</style>