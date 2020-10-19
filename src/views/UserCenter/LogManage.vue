<template>
  <div class="LogManage">
    <!-- <BtnGroup /> -->
    <el-table :data="tableData" border :height="tableHeight" stripe style="background-color:transparent;width:100%;box-sizing:border-box;width:100% "
      :cell-style="cellStyle" :header-cell-style="headerCellStyle">
      <el-table-column label="操作菜单" prop="title"></el-table-column>
      <el-table-column label="操作用户" prop="name" width="150"></el-table-column>
      <el-table-column label="所在单位" prop="unit" width="150"></el-table-column>
      <el-table-column label="URL" prop="requestUri" width="240"></el-table-column>
      <el-table-column label="提交方式" prop="method" width="150"></el-table-column>
      <el-table-column label="操作时间" prop="createDate" width="240"></el-table-column>
      <!-- <el-table-column label="操作" width="150px">
        <template scope="scope">
          <div class="topBtnGroupTable">
            <button class="subBtnT addbtn" @click="delitem(scope.$index, scope.row)">
              <img src="../../assets/amend.png" />
              <span>删除</span>
            </button>
          </div>
        </template>
      </el-table-column> -->
    </el-table>
    <div class="ismore" @click="load">加载更多</div>
  </div>
</template>

<script>
import qs from 'qs'
import BtnGroup from "./BtnGroup";
export default {
  name: "LogManage",
  data() {
    return {
      tableHeight: "73vh",
      readonly: true,
      tableData: [],
      page:0,//第几页
      pagesize:30,//每页显示条数
      ismore:false
    };
  },
  created() {
    document.title = "日志管理";
  },
  mounted() {
    let objs = {
      userId: JSON.parse(localStorage.getItem("userinfo")).isd,
      pageNo:this.page,
      pageSize:this.pagesize,
    };
    this.init(objs);
  },
  methods: {
    //删除
    // delitem(row){
    //   let that = this;
    //   let objs = {
    //     userId: JSON.parse(localStorage.getItem("userinfo")).isd,
    //     logId:this.tableData[row].id
    //   };
    //   this.$ajax({
    //     method: "POST",
    //     url: that.globals.requesturl + "web/logadministration/delete",
    //     data: objs,
    //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //     transformRequest: [
    //       function(data) {
    //         return qs.stringify(data);
    //       }
    //     ]
    //   }).then(res => {
    //     if (res.data.success && res.data.errorCode == -1) {
    //       that.tableData.splice(row,1)
    //       this.$message.success(res.data.msg);
    //     } else {
    //       this.$message.error(res.data.msg);
    //     }
    //   });
    // },
    //滚动
    load(){
      if(this.ismore){
        let objs = {
          userId: JSON.parse(localStorage.getItem("userinfo")).isd,
          pageNo:this.page,
          pageSize:this.pagesize,
        };
        let that = this;
        this.$ajax({
          method: "POST",
          url: that.globals.requesturl + "web/logadministration/list",
          data: objs,
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          transformRequest: [
            function(data) {
              return qs.stringify(data);
            }
          ]
        }).then(res => {
          if (res.data.success && res.data.errorCode == -1) {
            if(res.data.body.msg.length == 30 || res.data.body.msg.length > 0){
              that.page+=1
              res.data.body.msg.map(function(list){
                let obj = {};
                obj.title = list.title,//操作菜单
                obj.requestUri = list.requestUri,//URL
                obj.createDate = list.createDate,//时间
                obj.name = list.createBy.name,//用户
                obj.unit = list.createBy.office.name,//操作单位
                obj.method = list.method,//请求方式
                obj.remoteAddr = list.remoteAddr,//请求IP
                obj.id = list.id
                that.tableData.push(obj)
                that.ismore = true
              })
            }else{
              that.ismore = false
            }
          } else {
            this.$message.error(res.data.msg);
          }
        });
      }
    },
    // 初始化
    init(objs) {
      let that = this;
      this.$ajax({
        method: "POST",
        url: that.globals.requesturl + "web/logadministration/list",
        data: objs,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        transformRequest: [
          function(data) {
            return qs.stringify(data);
          }
        ]
      }).then(res => {
        if (res.data.success && res.data.errorCode == -1) {
          let listarr = [];
          if(res.data.body.msg.length == 30 || res.data.body.msg.length > 0){
            that.page++
            res.data.body.msg.map(function(list){
              let obj = {};
              obj.title = list.title,//操作菜单
              obj.requestUri = list.requestUri,//URL
              obj.createDate = list.createDate,//时间
              obj.name = list.createBy.name,//用户
              obj.unit = list.createBy.office.name,//操作单位
              obj.method = list.method,//请求方式
              obj.remoteAddr = list.remoteAddr,//请求IP
              obj.id = list.id
              listarr.push(obj)
            })
            that.tableData = listarr;
            that.ismore = true
          }else{
            that.ismore = false
            that.tableData = [];
          }
        } else {
          this.$message.error(res.data.msg);
        }
      });
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
          padding: "5px 0",
          height: "60px",
          width:"100%"
        };
      } else {
        return {
          "background-color": "#02468F",
          "text-align": "center",
          color: "#fff",
          "font-weight": "normal",
          padding: "5px 0",
          height: "60px",
          width:"100%"
        };
      }
    },
    headerCellStyle({ row, rowIndex }) {
      return {
        "background-color": "#027DBC",
        "text-align": "center",
        color: "#fff",
        "font-weight": "normal",
        "font-size": "16px",
          width:"100%"
      };
    }
  },
  watch: {}
};
</script>

<style  lang="stylus">
.LogManage {
  .topBtnGroupTable {
    display: flex;
    width: 80%;
    margin: 0 auto;
    justify-content: space-around;

    .subBtnT {
      overflow: hidden;
      background: transparent;
      border-radius: 3px;
      width: 60px;
      height: 30px;
      line-height: 30px;
      border: 1px solid #03D0FF;
      display: flex;
      justify-content: center;

      img {
        width: 15px;
        height: 15px;
        margin-top: 5px;
      }

      span {
        display: inline-block;
        width: 30px;
        font-size: 12px;
        color: #ffffff;
      }
    }
  }

  .el-input__inner {
    color: #ffffff;
    text-align: center;
    border: none;
    background: none;
  }
}
</style>
<style lang="scss" scoped>
.LogManage {
  padding: 15px;
}
.ismore{
  font-size: 12px;
  color: #fff;
  line-height: 4vh;
  text-align: center;
}
</style>
