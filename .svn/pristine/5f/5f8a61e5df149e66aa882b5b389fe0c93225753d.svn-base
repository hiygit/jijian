<template>
  <div class="KeywordSet">
    <div class='BtnGroup'>
        <div class="topBtnGroup">
            <button class="subBtn addbtn" @click="addbtn"><img src="../../assets/add.png"/><span>添加</span></button>    
            <!-- <button class="subBtn addbtn"><img src="../../assets/amend.png"/><span>修改</span></button>    
            <button class="subBtn addbtn"><img src="../../assets/del.png"/><span>删除</span></button>     -->
            <button class="subBtn addbtn" @click="refresh"><img src="../../assets/refresh.png"/><span>刷新</span></button>    
        </div>         
    </div>
    <el-table :data="tableData" v-loading="loading" border :height="tableHeight" stripe style="background-color:transparent;width:100%;box-sizing:border-box; " :cell-style="cellStyle" :header-cell-style="headerCellStyle">
      <el-table-column label="序号" prop="date" width="150" type="index" :index="indexMethod"></el-table-column>
      <el-table-column label="关键词" prop="status">
        <template scope="scope">
          <el-input readonly style="display:inline-block;width:90%;margin:0 auto;" size="small" v-model="scope.row.name"/>
        </template>
      </el-table-column>
      <el-table-column label="排序" prop="sort">
        <template scope="scope">
          <el-input readonly style="display:inline-block;width:90%;margin:0 auto;" size="small" v-model="scope.row.sort"/>
        </template>
      </el-table-column>
      <el-table-column label="可见" prop="isShow">
        <template scope="scope">
          <el-input readonly style="display:inline-block;width:90%;margin:0 auto;" size="small" v-model="scope.row.isShow"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="450px">
        <template scope="scope">
          <div class="topBtnGroupTable">
            <button class="subBtnT addbtn" @click="lookitem(scope.$index, scope.row)">
              <img src="../../assets/watch.png" />
              <span>查看</span>
            </button>
            <button class="subBtnT addbtn" @click="updataitem(scope.$index, scope.row)">
              <img src="../../assets/amend.png" />
              <span>修改</span>
            </button>
            <button class="subBtnT addbtn" @click="romoveitem(scope.$index, scope.row)">
              <img src="../../assets/amend.png" />
              <span>删除</span>
            </button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 删除弹框 -->
    <transition name="personnelframe">
      <div class="delclose" v-if="centerDialogVisible">
        <div class="personnelframe-close"></div>
        <div class="delclosebox">
          <h3>提示</h3>
          <div class="deltit">是否确认删除？</div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="subremove">确 定</el-button>
          </span>
        </div>
      </div>
    </transition>

    <!-- 调动弹框 -->
    <transition name="personnelframe">
      <div class="personnelframe" v-if="personnelpops">
        <div class="personnelframe-close"></div>
        <div class="personnelframe-container">
          <div class="personnelframe-container-box">
            <div class="personnelframe-title">
              <!-- <img src="@/assets/diaodongxinxi.png" alt srcset /> -->
              <h3>关键字设置表单</h3>
            </div>
            <div class="personnelframe-pricker">
              <div class="personnelframe-pricker-box">
                <span class="personnelframe-pricker-box-span">关键词：</span>
                <input type="text" value style="width: 220px" v-model="updata.name"/>
              </div>
              <div class="personnelframe-pricker-box">
                <span class="personnelframe-pricker-box-span">排序：</span>
                <input type="text" value style="width: 220px" v-model="updata.sort"/>
              </div>
            </div>
            <div class="personnelframe-pricker">
              <div class="personnelframe-pricker-box">
                <span class="personnelframe-pricker-box-span">是否可见：</span>
                <el-select v-model="updata.isShow" placeholder="请选择">
                  <el-option style="font-size: 14px" v-for="item in isif" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </div>
              <div class="personnelframe-pricker-box">
                <span class="personnelframe-pricker-box-span">备注：</span>
                <textarea cols="30" v-model="updata.remarks" rows="10" style="resize: none;padding: 5px 10px;box-sizing: border-box;width: 215px;height: 115px;border: 1px solid #BCD9E8;outline: none;background: none"></textarea>
              </div>
            </div>
          </div>
          <div class="personnelframe-btns">
            <el-button @click="quit">取消</el-button>
            <el-button type="primary" @click="savebtnyes" v-if="disable">确定</el-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: "KeywordSet",
  props: ["tableHeight"],
  data() {
    return {
      loading:false,
      disable: true,
      centerDialogVisible:false,//是否确认删除
      personnelpops: false, //弹框
      value: "",
      updata: {
        name:"",
        isShow:"",
        sort:"",
        id:"",
        remarks:""
      },
      ifadd:false,
      tableData: [],
      isif:[],//下拉选择
      delval:"",//查看、删除下标
      page:0,//第几页
      pagesize:20,//每页显示条数
    };
  },
  created() {
    document.title = "关键词设置"
    let that = this
    this.$ajax({
      method: "POST",
      url: this.globals.requesturl + 'web/dict',
      data: {type:'yes_no'},
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      transformRequest: [function (data) { 
        return qs.stringify(data)
      }]
    }).then(res=>{
      if(res.data.success && res.data.errorCode == '-1'){
        res.data.body.dictValueList.map(function(list){
          that.isif.push({value:list.value,label:list.label})
        })
      }else{
        this.$message.error(res.data.msg); 
      }
    })
  },
  mounted() {
    let objs = {
      userId: JSON.parse(localStorage.getItem('userinfo')).isd,
      pageNo:this.page,
      pageSize:this.pagesize,
    } 
    this.init(objs);
  },
  methods: {
    //刷新
    refresh(){
      let that = this
      that.loading  =true
      setTimeout(function(){
        that.loading  =false
      },1500)
      let objs = {
        userId: JSON.parse(localStorage.getItem('userinfo')).isd,
        pageNo:this.page,
        pageSize:this.pagesize,
      } 
      this.init(objs);
    },
    //添加按钮
    addbtn(){
      this.ifadd = true
      this.personnelpops = true
    },
    // 删除
    romoveitem(row){
      this.delval = row
      this.centerDialogVisible = true
    },
    subremove(){
      let that = this,id = that.tableData[that.delval].id;
      let objs = {
        userId: JSON.parse(localStorage.getItem('userinfo')).isd,
        id:id,
      } 
      this.$ajax({
        method: "POST",
        url: that.globals.requesturl + 'web/keyword/delete',
        data: objs,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: [function (data) { 
          return qs.stringify(data)
        }]
      }).then(res=>{
        if(res.data.success && res.data.errorCode == -1){
          this.$message.success(res.data.msg); 
          that.tableData.splice(that.delval,1)
        }else{
          this.$message.error(res.data.msg); 
        }
        that.centerDialogVisible = false
      })
    },
    //取消
    quit(){
      this.ifadd=false
      this.readonly=false
      this.personnelpops = false
      this.updata = {
        name:"",
        isShow:"",
        sort:"",
        id:"",
        remarks:""
      }
    },
    //保存
    savebtnyes(){
      let that = this
      let objs = that.updata
      objs.userId = JSON.parse(localStorage.getItem('userinfo')).isd
      if(objs.name == ""){
        this.$message.error("请填写关键字"); 
      }else if(objs.isShow==""){
        this.$message.error("请选择是否可见"); 
      }else if(objs.sort==""){
        this.$message.error("请填写排序"); 
      }else{
        this.$ajax({
          method: "POST",
          url: this.globals.requesturl + 'web/keyword/save',
          data: objs,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: [function (data) { 
            return qs.stringify(data)
          }]
        }).then(res=>{
          if(res.data.success && res.data.errorCode == '-1'){
            that.personnelpops = false
            if(that.ifadd){
              that.tableData.push(objs)
            }else{
              // this.tableData[that.delval] = objs
              this.$set(this.tableData,that.delval,objs)
              this.updata = {
                name:"",
                isShow:"",
                sort:"",
                id:"",
                remarks:""
              }
            }
            this.$message.success(res.data.msg); 
            this.ifadd=false
          }else{
            this.$message.error(res.data.msg); 
          }
        })
      }
    },
    //查看
    lookitem(row){
      this.disable=false
      this.updataitem(row)
    },
    //修改
    updataitem(row){
      let that = this
      this.delval = row
      let objs = {
        userId: JSON.parse(localStorage.getItem('userinfo')).isd,
        id:that.tableData[row].id
      } 
      this.$ajax({
        method: "POST",
        url: this.globals.requesturl + 'web/keyword/form',
        data: objs,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: [function (data) { 
          return qs.stringify(data)
        }]
      }).then(res=>{
        if(res.data.success && res.data.errorCode == '-1'){
          that.personnelpops = true
          let objs = {};
          objs.name = res.data.body.name
          objs.sort = res.data.body.sort
          objs.isShow = res.data.body.isShow
          objs.id = res.data.body.id
          objs.remarks = res.data.body.remarks
          that.updata = objs
        }else{
          this.$message.error(res.data.msg); 
        }
      })
    },
    //下标处理
    indexMethod(index){
      return index+1>9?index+1:'0'+(index+1)
    },
    // 初始化
    init(objs) {
      let that = this;
      this.$ajax({
        method: "POST",
        url: that.globals.requesturl + "web/keyword/list",
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
          res.data.body.keyWordList.map(function(list){
            let objs = {};
            objs.name = list.name
            objs.sort = list.sort
            objs.isShow = list.isShow == that.isif[0].value?that.isif[0].label:that.isif[1].label
            objs.id = list.id
            listarr.push(objs)
          })
          that.tableData = listarr;
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
          height: "60px"
        };
      } else {
        return {
          "background-color": "#02468F",
          "text-align": "center",
          color: "#fff",
          "font-weight": "normal",
          padding: "5px 0",
          height: "60px"
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
    }
  },
  watch: {}
};
</script>

<style  lang="scss">
.KeywordSet {
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
      cursor: pointer;
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


<style lang="scss">
.KeywordSet {
  box-sizing: border-box;
  padding: 15px;
  .KeywordSet {
    .el-breadcrumb__inner {
      color: #fff;
    }
    .el-breadcrumb__item:last-child .el-breadcrumb__inner {
      color: #03d0ff;
    }
    .el-form--inline .el-form-item {
      margin-bottom: 0;
    }
    .el-form-item__label {
      color: #fff;
    }
    .el-input__inner,
    .el-input__inner:hover {
      background: transparent;
      border: 1px solid #016cae;
    }
    .el-table,
    .el-table__expanded-cell,
    .el-table th,
    .el-table tr,
    .el-table th:hover,
    .el-table tr:hover,
    .el-table--enable-row-hover .el-table__body tr:hover > td {
      background: transparent;
    }
    .el-table thead,
    .el-table {
      color: #fff;
    }
    .el-table th {
      text-align: center;
    }
    .el-table .cell {
      text-align: center;
    }
    .el-table--border {
      border: 1px solid #03d0ff;
    }
    .el-table td,
    .el-table th.is-leaf {
      border-bottom: none;
      border-right: 1px solid #03d0ff;
    }
    .el-table th.is-leaf:last-child,
    .el-table--border th:nth-last-child(2) {
      border: none;
    }
    .el-table thead {
      background: #027dbc;
    }
    .el-table thead tr th:last-child {
      border: none;
    }
    .el-table::before,
    .el-table--border::after {
      background-color: transparent;
    }
    td.el-table_1_column_10 {
      border-right: none !important;
    }
    .el-table .el-table__body-wrapper tr:nth-child(even) {
      background: #2162a8;
    }
    .el-table__body-wrapper {
      max-height: 320px;
      overflow-y: scroll;
    }
    // .personnelframe-pricker .el-cascader {
    //   height: 30px;
    // }
    // .personnelframe-pricker .el-input__inner,
    // .personnelframe-pricker .el-input__inner:hover {
    //   border: 1px solid #bcd9e8 !important;
    //   font-size: 10px;
    //   height: 30px;
    //   line-height: 30px;
    // }
    .el-cascader-node:not(.is-disabled):hover {
      background: #91c1e7 !important;
    }
    .el-tree,
    .el-tree-node__content:hover,
    .el-tree-node:focus > .el-tree-node__content {
      background: transparent;
      color: #fff;
    }
    .el-tree-node__expand-icon {
      color: #fff;
    }
    .el-table__body tr.current-row > td {
      background: #025bff;
    }
    .el-breadcrumb__inner a,
    .el-breadcrumb__inner.is-link,
    .el-breadcrumb__inner a:hover,
    .el-breadcrumb__inner.is-link:hover {
      color: #fff;
      font-weight: normal;
    }
  }
  .el-cascader-panel {
    font-size: 10px !important;
  }
  .el-cascader-menu__wrap::-webkit-scrollbar {
    background: #fff !important;
    height: 8px;
  }
.delclose{
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;left: 0;
    }
    .delclosebox{
      width: 30%;
      background: #C7ECFF;
      text-align: center;
      position: fixed;
      top: 50%;left: 50%;
      transform: translate(-50%,-50%);
      border-radius: 3px;
      padding: 20px;
    }
    h3{
      font-size: 13px;
      text-align: left;
      color: #333333;
    }
    .deltit{
      margin: 20px 0 30px;
      font-size: 12px;
      color: #333333;
    }
  // 调动弹框
  .personnelframe {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2000;
  }

  .personnelframe-close {
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.5);
  }

  .personnelframe-container {
    // width: 33%;
    width: 39%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .personnelframe-container-box {
    background: #c7ecff;
    border-radius: 5px;
    padding: 10px;
    width: 100%;
    height: 130px;
    padding-bottom: 20px;
  }

  .personnelframe-title {
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 10px;
    color: #333;
    font-weight: 600;

    img {
      width: 18px;
      height: 18px;
      margin-right: 5px;
    }

    h3 {
      position: relative;
      top: -1px;
    }
  }

  .personnelframe-table {
    width: 100%;
    border: 1px solid #bcd9e8;
    margin: 8px 0;

    .personnelframe-table-tr {
      border-bottom: 1px solid #bcd9e8;
      width: 100%;
      display: flex;
      align-self: center;
    }

    .personnelframe-table-tr span {
      flex: 1;
      display: block;
      padding: 6px 15px;
      border-right: 1px solid #bcd9e8;
      font-size: 10px;
      color: #777e82;

      &:last-child {
        border-right: 0;
      }
    }

    .personnelframe-table-tr:last-child {
      border-bottom: none;
    }
  }

  .personnelframe-pricker {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 8px;
    justify-content: space-between;
  }

  .personnelframe-btns {
    width: 100%;
    text-align: right;
    margin-top: 10px;
  }

  .personnelframe-btns button {
    font-size: 10px;
  }

  .treelist-box {
    width: 100%;
    height: 390px;
    border: 1px solid #03d0ff;
    overflow-y: auto;
  }

  //淡入淡出动画
  .personnelframe-enter,
  .personnelframe-leave-to {
    opacity: 0;
  }

  .personnelframe-enter-to,
  .personnelframe-leave {
    opacity: 1;
  }

  .personnelframe-enter-active,
  .personnelframe-leave-active {
    transition: all 1s;
  }

  //弹窗
  .personnelframe-pricker-box {
    width: 49%;
    height: 30px;
    color: #333;
    line-height: 30px;
    display: flex;
    .checkboxed {
      width: 180px;
      height: 40px;
      border: 1px solid #bcd9e8;
      padding: 0 5px;
      box-sizing: border-box;
      // display: flex;
      // flex-wrap: wrap;
    }
    .el-checkbox__label {
      font-size: 10px;
      padding-left: 0;
    }
    .el-checkbox {
      margin-right: 2px;
    }
    .personnelframe-pricker-box-span {
      display: inline-block;
      width: 90px;
      font-size: 10px;
      text-align: right;
      padding: 0 3px;
    }
    input {
      height: 23px;
      margin-top: 5px;
      background: none;
      outline: none;
      border: 1px solid #bcd9e8;
      border-radius: 3px;
      padding: 0 5px;
      box-sizing: border-box;
    }
    .el-select {
      width: 60%;
      height: 40px;
    }
    .el-input--suffix .el-input__inner {
      height: 40px;
    }
  }
  .el-input__icon {
    line-height: 25px;
  }
  .el-icon-arrow-up:before {
    content: "\E6E1";
    margin-left: 0px;
  }
  .el-select > .el-input {
    display: block;
    width: 145px;
    height: 25px;
    border-radius: 3px;
  }
}
.el-select-dropdown__item {
  font-size: 14px;
  color: #606266;
}
.KeywordSet .personnelframe-pricker-box .el-input--suffix .el-input__inner {
  height: 25px;
  color: #333;
  font-size: 10px;
  text-align: left;
  border: 1px solid #bcd9e8;
}
</style>