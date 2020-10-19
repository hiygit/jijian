<template>
  <div class="Unitframework">
    <div class='BtnGroup'>
        <div class="topBtnGroup">
            <button class="subBtn addbtn" @click="addbtn"><img src="../../assets/add.png"/><span>添加</span></button>    
            <!-- <button class="subBtn addbtn"><img src="../../assets/amend.png"/><span>修改</span></button>    
            <button class="subBtn addbtn"><img src="../../assets/del.png"/><span>删除</span></button>     -->
            <button class="subBtn addbtn" @click="refresh"><img src="../../assets/refresh.png"/><span>刷新</span></button>    
        </div>         
    </div>
    <el-table :data="tableData" border :height="tableHeight" stripe style="background-color:transparent;width:100%;box-sizing:border-box; "
      :cell-style="cellStyle" :header-cell-style="headerCellStyle" v-loading="loading">
      <el-table-column label="序号" width="150" type="index" :index="indexMethod"></el-table-column>
      <el-table-column label="机构名称" prop="name"></el-table-column>
      <el-table-column label="架构类型" prop="type"></el-table-column>
      <el-table-column label="操作" width="450">
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
            <button class="subBtnT addbtn subBtnTother" @click="nextitem(scope.$index, scope.row)">
              <img src="../../assets/add.png" />
              <span class="btnOther">添加下级架构</span>
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
    <!-- 修改删除弹框 -->
    <transition name="personnelframe">
      <div class="personnelframe" v-if="personnelpops">
        <div class="personnelframe-close"></div>
        <div class="personnelframe-container">
          <div class="personnelframe-container-box">
            <div class="personnelframe-title">
              <!-- <img src="@/assets/diaodongxinxi.png" alt srcset /> -->
              <h3>单位架构设置表单</h3>
            </div>
            <div class="personnelframe-pricker">
              <div class="personnelframe-pricker-box">
                <span class="personnelframe-pricker-box-span">上级架构：</span>
                <!-- <el-cascader v-model="updata.parentId" :options="unitslist" @active-item-change="unitChanges" :props="{value: 'id',label: 'name',children: 'children'}"></el-cascader> -->
                <el-select v-model="updata.parentId" filterable placeholder="请选择">
                  <el-option v-for="item in allunitslist" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </div>
              <div class="personnelframe-pricker-box">
                <span class="personnelframe-pricker-box-span">机构名称：</span>
                <input type="text" v-model="updata.name" style="width: 270px" />
              </div>
            </div>
            <div class="personnelframe-pricker">
              <div class="personnelframe-pricker-box">
                <span class="personnelframe-pricker-box-span">机构类型：</span>
                <el-select  v-model="updata.type" placeholder="请选择">
                  <el-option style="font-size: 14px" v-for="item in typeslist" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </div>
              <div class="personnelframe-pricker-box">
                <span class="personnelframe-pricker-box-span">机构级别：</span>
                <el-select v-model="updata.grade" placeholder="请选择">
                  <el-option style="font-size: 14px" v-for="item in ranktype" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </div>
            </div>
            <!-- <div class="personnelframe-pricker">
              <div class="personnelframe-pricker-box">
                <span class="personnelframe-pricker-box-span">备注：</span>
                <textarea cols="30" rows="10" style="resize: none;padding: 5px 10px;box-sizing: border-box;width: 270px;height: 60px;border: 1px solid #BCD9E8;outline: none;background: none"></textarea>
              </div>
            </div> -->
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
import qs from "qs";
export default {
  name: "Unitframework",
  data() {
    return {
      ifadd:false,
      disable:true,
      tableHeight:'66vh',
      readonly: true,
      personnelpops: false, //修改删除弹框
      personnelpops1: false, //添加下级架构弹框
      centerDialogVisible:false,//是否确认删除
      isShow: false,
      isShowing: false,
      value: '',
      tableData: [],
      updata:{
        grade: "",//机构等级
        id: "",//机构id
        name: "",//机构名称
        parentId: "",//父级机构ID
        type: "",//机构等级
      },
      typeslist:[],//类型数组
      ranktype:[],//是否数组
      unitslist:[],//级联
      loading:false,
      allunitslist:[],//全部单位

    };
  },
  created() {
    document.title = "单位架构设置"
    let that = this
    this.$ajax({
      method: "POST",
      url: this.globals.requesturl + 'web/dict',
      data: {type:'sys_office_grade '},
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      transformRequest: [function (data) { 
        return qs.stringify(data)
      }]
    }).then(res=>{
      if(res.data.success && res.data.errorCode == '-1'){
        res.data.body.dictValueList.map(function(list){
          that.ranktype.push({value:list.value,label:list.label})
        })
      }else{
        this.$message.error(res.data.msg); 
      }
    })
    this.$ajax({
      method: "POST",
      url: this.globals.requesturl + 'web/dict',
      data: {type:'sys_office_type'},
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      transformRequest: [function (data) { 
        return qs.stringify(data)
      }]
    }).then(res=>{
      if(res.data.success && res.data.errorCode == '-1'){
        res.data.body.dictValueList.map(function(list){
          that.typeslist.push({value:list.value,label:list.label})
        })
      }else{
        this.$message.error(res.data.msg); 
      }
    })
  },
  mounted() {
    let objs = {
      userId: JSON.parse(localStorage.getItem("userinfo")).isd,
      pageNo: this.page,
      pageSize: this.pagesize
    };
    this.init(objs);
    // this.initunits()
    this.selunits()
  },
  methods: {
    //添加下一级
    nextitem(row){
      let that = this
      this.delval = row
      let objs = {
        userId: JSON.parse(localStorage.getItem('userinfo')).isd,
        id:that.tableData[row].id
      } 
      this.$ajax({
        method: "POST",
        url: this.globals.requesturl + 'web/office/form',
        data: objs,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: [function (data) { 
          return qs.stringify(data)
        }]
      }).then(res=>{
        if(res.data.success && res.data.errorCode == '-1'){
          that.personnelpops = true
          let objs = {
            grade: "",//机构等级
            id: "",//机构id
            name: "",//机构名称
            parentId: res.data.body.parentId,//父级机构ID
            type: "",//机构等级
          };
          that.updata = objs
        }else{
          this.$message.error(res.data.msg); 
        }
      })
    },
    //取消
    quit(){
      this.ifadd=false
      this.disable=true
      this.personnelpops = false
      this.updata = {
        href: "",
        icon: "",
        id: "",
        isShow: "",
        name: "",
        parentId: "",
        permission: "",
        sort: "",
        target: "mainFrame"
      }
    },
    //确定删除
    subremove(){
      let that = this,id = that.tableData[that.delval].id;
      let objs = {
        userId: JSON.parse(localStorage.getItem('userinfo')).isd,
        id:id,
      } 
      this.$ajax({
        method: "POST",
        url: that.globals.requesturl + 'web/office/delete',
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
    // 删除
    romoveitem(row){
      this.delval = row
      this.centerDialogVisible = true
    },
    //返回单位
    selunits(){
      let that = this; 
      this.$ajax({
        method: "POST",
        url: that.globals.requesturl + 'web/office/findOffice',
        data: "",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: [function (data) { 
          return qs.stringify(data)
        }]
      }).then(res=>{
        if(res.data.errorCode == "-1"){
          // let lists = [];
          // that.unitslist = res.data.body.officeList.map(function(list,index){
          //   return {
          //     id: list.id,
          //     name: list.name,
          //     children: []
          //   }
          // })
          that.allunitslist = res.data.body.officeList
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
    //保存
    savebtnyes(){
      let that = this
      let objs = {
        id:that.updata.id,
        name:that.updata.name,
        type:that.updata.type,
        grade:that.updata.grade,
        'parent.id':that.updata.parentId[that.updata.parentId.length-1],
        userId: JSON.parse(localStorage.getItem('userinfo')).isd
      }
      if(objs.name == ""){
        this.$message.error("请填写名称"); 
      }else if(objs.isShow==""){
        this.$message.error("请选择是否可见"); 
      }else{
        this.$ajax({
          method: "POST",
          url: this.globals.requesturl + 'web/office/save',
          data: objs,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: [function (data) { 
            return qs.stringify(data)
          }]
        }).then(res=>{
          if(res.data.success && res.data.errorCode == '-1'){
            that.personnelpops = false
            if(that.ifadd){
              for(let key in that.typeslist){ 
                if(that.typeslist[key].value == objs.type){
                  objs.type = that.typeslist[key].label
                }
              }
              that.tableData.push(objs)
            }else{
              // this.tableData[that.delval] = objs
              for(let key in that.typeslist){ 
                if(that.typeslist[key].value == objs.type){
                  objs.type = that.typeslist[key].label
                }
              }
              this.$set(this.tableData,that.delval,objs)
              this.updata = {
                grade: "",//机构等级
                id: "",//机构id
                name: "",//机构名称
                parentId: "",//父级机构ID
                type: "",//机构等级
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
      let id = this.tableData[row].id
      // this.initunits(id)
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
        url: this.globals.requesturl + 'web/office/form',
        data: objs,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: [function (data) { 
          return qs.stringify(data)
        }]
      }).then(res=>{
        if(res.data.success && res.data.errorCode == '-1'){
          that.personnelpops = true
          let objs = {};
          that.updata = res.data.body
        }else{
          this.$message.error(res.data.msg); 
        }
      })
    },
    //添加按钮
    addbtn(){
      this.ifadd = true
      this.personnelpops = true
    },
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
    //下标处理
    indexMethod(index){
      return index+1>9?index+1:'0'+(index+1)
    },
    // 初始化
    init(objs) {
      let that = this;
      this.$ajax({
        method: "POST",
        url: that.globals.requesturl + "web/office/list",
        data: objs,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        transformRequest: [
          function(data) {
            return qs.stringify(data);
          }
        ]
      }).then(res => {
        if (res.data.success && res.data.errorCode == -1) {
          let list = [];
          res.data.body.officeList.map(function(item){
            for(let key in that.typeslist){ 
              if(that.typeslist[key].value == item.type){
                item.type = that.typeslist[key].label
              }
            }
          })
          that.tableData = res.data.body.officeList
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
    },
    //添加下级弹窗 
    addClick(){
      this.isShow = true
    },
    addClick1(){
      this.isShowing = true
    }
  },
  watch: {}
};
</script>

<style  lang="stylus">
.Unitframework {
  .topBtnGroupTable {
    display: flex;
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

    .subBtnTother {
      width: 80px;

      .btnOther {
        width: 50px;
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
.Unitframework {
  .addbtn{
    cursor: pointer;
  }
  padding: 15px;
  box-sizing: border-box;
  .Unitframework {
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
    width: 45%;
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
    line-height: 30px !important;
    display: flex;
    .checkboxed {
      width: 180px;
      height: 40px;
      border: 1px solid #bcd9e8;
      padding: 0 5px;
      box-sizing: border-box;
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
      width: 85px;
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
    width: 180px;
    height: 25px;
    border-radius: 3px;
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
  // 添加下级弹窗
  .border-box{
    width: 100%;
    height: auto;
    margin-top: 10px;
    box-sizing: border-box;
    .border-checked-box{
      width: 99.8%;
      display: flex;
      border: 1px solid #C0DFF0;
      .border-checked{
        display: flex;
        align-items: center;
        width: 50%;
        color: #696A6B;
        padding: 0 10px;
        .el-input__inner{
          width: 200px;
          height: 25px;
          color: #696A6B;
          font-size: 10px;
          text-align: left;
        }
      }
    }
    .border-subordinate-box{
      width: 100%;
      color: #696A6B;
      padding: 5px 10px;
      padding-bottom: 15px;
      border: 1px solid #C0DFF0;
      border-top: none;
      box-sizing: border-box;
      .sidebox{
        display: inline-block;
        width: 13px;
        height: 13px;
        font-size: 14px;
        text-align: center;
        line-height: 13px;
        vertical-align: middle;
        font-style: normal;
        margin-left: 5px;
        border: 1px solid #848F94;
        cursor: pointer;
      }
      span i::after{
        content: '';
        display: inline-block;
        width: 13px;
        height: 1px;
        margin-left: 13px;
        margin-top: -30px;
        vertical-align: middle;
        background: #B3AFAF;
      }
      // 右侧滚动
      .border-right-box{
        width: 460px;
        height: 300px;
        margin-left: 96px;
        margin-top: -20px;
        padding-top: 5px;
        overflow-x: auto;
        overflow-y: auto;
        .menulower-box{
          box-sizing: border-box;
          margin-bottom: 5px;
          display: flex;
          .iptBox{
            margin-right: 10px;
            .iptName input{
              outline: none;
              background: none;
              border: 1px solid #C0DFF0;
              color: #666;
              margin-bottom: 3px;
              padding: 5px 7px;
              
            }
            input::-webkit-input-placeholder {
              color: #666; 
            }
            textarea{
              outline: none;
              background: none;
              resize: none;
              color: #666;
              height: 50px;
              padding: 5px 7px;
              padding-right: 0;
              border: 1px solid #C0DFF0;
            }
            textarea::-webkit-input-placeholder {
              color: #AAC4D2; 
            }
          }
        } 
      }
    }
  }
  // ====================================================================
}
.el-select-dropdown__item {
  font-size: 14px;
  color: #606266;
}
.Unitframework .personnelframe-pricker-box .el-input--suffix .el-input__inner {
  height: 25px;
  color: #333;
  font-size: 10px;
  text-align: left;
  border: 1px solid #bcd9e8;
}


//滚动条样式
 .Unitframework .border-right-box::-webkit-scrollbar {
  /*滚动条整体样式*/
  width : 3px;  /*高宽分别对应横竖滚动条的尺寸*/
  height: 3px;
  }
  .Unitframework .border-right-box::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius   : 10px;
  background-color: #0965AE;
  }
  .Unitframework .border-right-box::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
  background   : #02468F;
  border-radius: 10px;
  }

</style>
