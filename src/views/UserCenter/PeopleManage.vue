﻿<template>
  <div class="PeopleManage">
    <div class="ManageTop">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="查找">
          <el-input v-model="formInline.keywords" placeholder="关键字查找"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="formInline.user" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="reflectunitname">
          <!-- <el-input class="findInner" :disabled="disabled" v-model="find.reflectunitname" readonly></el-input> -->
          <i v-show="iconShow" class="el-icon-error" @click="findOfficeIcon()"></i>
          <el-cascader v-model="find.reflectunitid" :options="unitslist" @active-item-change="unitChanges" placeholder="请选择单位" :props="{value: 'id',label: 'name',children: 'children',checkStrictly: true }" clearable></el-cascader>
        </el-form-item>
        <div style="display:inline-block;margin-right: 20px;height:65px;">
          <el-form-item style="margin-top:-10px;"> 
            <el-radio style="color:#fff;margin-top:10px;width:50px" v-model="radio" label="1">全部</el-radio>
            <el-radio style="color:#fff;margin-top:10px;width:50px" v-model="radio" label="2">内部人员</el-radio><br>
            <el-radio style="color:#fff;margin-top:10px;width:50px" v-model="radio" label="3">外部人员</el-radio>
          </el-form-item>
        </div>
        <br>
        <el-form-item class="btnSearch" style="float:right">
          <el-button type="primary" icon="el-icon-search" @click="searchbtn">查询</el-button>
        </el-form-item>
        <el-form-item class="rightBtn">
          <!-- <el-upload class="upload-demo" action="" :show-file-list='false' :http-request="handleChange" :file-list="fileList" multiple>
            <el-button size="small" type="primary">导入</el-button>
          </el-upload> -->
          <div class="filesbtns">
            <el-button size="small" type="primary">导入</el-button>
            <input type="file" value="导入" class="filesbtns-input" multiple accept=".xml,.txt" @change="headgetfile($event)" title=" ">
          </div>
        </el-form-item>
        <el-form-item class="btnAdd rightBtn">
          <el-button type="primary" @click="appendbtn">新增</el-button>
        </el-form-item>
        <el-form-item class="rightBtn">
          <el-button type="primary" style="background:#409EFF;" class="derive" @click="exportbtns">导出</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" border :height="tableHeight" stripe style="background-color:transparent; "
        :cell-style="cellStyle" :header-cell-style="headerCellStyle" width="100%" @selection-change="handleSelectionChange" v-loading="loading">
        <el-table-column type="selection" width="65"></el-table-column>
        <el-table-column :resizable="false" label="序号"  type="index" :index="indexMethod" width="80"></el-table-column>
        <el-table-column :resizable="false" label="姓名" prop="name" width="150"></el-table-column>
        <el-table-column :resizable="false" label="性别" prop="sex" width="80"></el-table-column>
        <el-table-column :resizable="false" label="民族" prop="nation" width="150"></el-table-column>
        <el-table-column :resizable="false" label="籍贯" prop="nativePlace" width="210"></el-table-column>
        <el-table-column :resizable="false" label="出生日期" prop="birthday" width="180px"></el-table-column>
        <el-table-column :resizable="false" label="身份证号" prop="idCard" width="300px"></el-table-column>
        <el-table-column :resizable="false" label="操作" width="252px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
            <el-button type="primary" size="mini" @click="updatebtn(scope.$index, scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="saveBtn">
      <div class="btnGroup">
        <el-button type="primary" class="derive" @click="exportbtns">导出</el-button>
        <el-button type="primary" class="save">保存</el-button>
      </div>
    </div> -->
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: "PeopleManage",
  data() {
    return {
      loading:true,
      radio: '1',//弹框单选按钮 1-是 2-否
      checksIdList:[],
      tableHeight: "53vh",
        fileList:[],
      formInline: {
          keywords:"",
          user:"",
      },
      tableData: [
        {
          name:"",//姓名
          sex:"",//性别
          nation:"",//民族
          nativePlace:"",//籍贯
          birthday:"",//出生日期
          idCard:"",//身份证
          id:"",
        },
      ],
      sexlist:[],
      page:0,//第几页
      pagesize:20,//每页显示条数

      // 2020-05-11 修改
      unitslist: [], //级联选择
      disabled: false,
      iconShow: false,//反映人单位关闭图标显示隐藏
      find:{
        reflectunitname: '', //工作单位
        reflectunitid: '',
      }
    };
  },
  created() {
    document.title = "人员管理"
    //性别
    let that = this
    this.$ajax({
      method: "POST",
      url: this.globals.requesturl + "web/dict",
      data: { type: "sex" },
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      transformRequest: [
        function(data) {
          return qs.stringify(data);
        }
      ]
    }).then(res => {
      if (res.data.success && res.data.errorCode == "-1") {
        res.data.body.dictValueList.map(function(list) {
          that.sexlist.push({ value: list.value, label: list.label });
        });
      } else {
        this.$message.error(res.data.msg);
      }
    });
  },
  mounted() {
    let objs = {
      userId: JSON.parse(localStorage.getItem('userinfo')).isd,
      pageNo:this.page,
      pageSize:this.pagesize,
      name:""
    } 
    this.init(objs);
    this.initunits()
  },
  methods: {
    // load(){
    //   let objs = {
    //     userId: JSON.parse(localStorage.getItem('userinfo')).isd,
    //     pageNo:++this.page,
    //     pageSize:this.pagesize,
    //     name:""
    //   } 
    //   console.log(objs)
    //   // this.init(objs);
    // },
    handleSelectionChange(val) {
      // this.multipleSelection = val;
      let mapChecckList = val
      let pushChecckList = []
      mapChecckList.map(function(list){
        pushChecckList.push(list.id)
      }) 
      this.checksIdList = pushChecckList
      // for (let i = 0; i < mapChecckList.length; i++) {
      //   this.checksIdList = mapChecckList[i].id
      //   console.log(this.checksIdList)
      // }
    },
    //导出人员信息
    exportbtns(){
      this.loading=true
      let obbjstr = {
        // ids:"",
        ids: this.checksIdList.join(","),
        userId:JSON.parse(localStorage.getItem('userinfo')).isd,
      }
      console.log(obbjstr)
      this.$ajax({
        method: "POST",
        url: this.globals.requesturl + 'web/personnel/export',
        data: obbjstr,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: [function (data) { 
          return qs.stringify(data)
        }]
      }).then(res=>{
        if(res.data.errorCode == "-1"){
          this.loading=false
          let url = res.data.body.path
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', '')
          document.body.appendChild(link)
          link.click()
          this.$message.success(res.data.msg); 
        }else{
          this.$message.error(res.data.msg); 
        }
      })
    },
    //导入
    headgetfile(event){
      let filesarr = [];
      let fileList = event.target.files
      let formdatas = new FormData();
      formdatas.append('userId',JSON.parse(localStorage.getItem('userinfo')).isd)
      for(let i=0;i<fileList.length;i++){
        formdatas.append('files',fileList[i])
      }
      this.$ajax({
        method:"POST",
        data:formdatas,
        url: this.globals.requesturl + 'web/personnel/import',
        headers: {'Content-Type': 'multipart/form-data'},
        // transformRequest: [function (data) { 
        //   return qs.stringify(data)
        // }]
      }).then(res => {
        console.log(res)
        //此处重置文件中间存储变量是为了相同文件能够重复传递
        if (res.data.success && res.data.errorCode == '-1'){
          this.$message.success(`成功`);
          this.fileList=[];
        } 
        // else {
        //   this.$message.error(`失败`);
        // }
      }, (err) =>{
        this.$message.error(`失败`);
      })
    },
    handleChange(param){
      var fileObj = param.file;
      let formdatas = new FormData();
      formdatas.append('userId',JSON.parse(localStorage.getItem('userinfo')).isd)
      formdatas.append('files',fileObj)
      this.$ajax({
        method:"POST",
        data:formdatas,
        url: this.globals.requesturl + 'web/personnel/import',
        headers: {'Content-Type': 'multipart/form-data'},
        // transformRequest: [function (data) { 
        //   return qs.stringify(data)
        // }]
      }).then(res => {
        console.log(res)
        //此处重置文件中间存储变量是为了相同文件能够重复传递
        if (res.data.success && res.data.errorCode == '-1'){
          this.$message.success(`成功`);
          this.fileList=[];
        } 
        // else {
        //   this.$message.error(`失败`);
        // }
      }, (err) =>{
        this.$message.error(`失败`);
      })
    },
    //查询按钮
    searchbtn(){
      console.log(this.find.reflectunitid)
      console.log(this.find.reflectunitid[this.find.reflectunitid.length - 1])
      let that = this
      this.loading = true
      let querstobj = {
        userId: JSON.parse(localStorage.getItem('userinfo')).isd,
        keyword:this.formInline.keywords,
        name:this.formInline.user,
        isOutOffice: this.radio - 2,
        officeId: this.find.reflectunitid != "" ? this.find.reflectunitid[this.find.reflectunitid.length - 1] : "",
      }
      if(this.radio - 1 == 0){
        querstobj.isOutOffice = ""
      }
      console.log(querstobj)
      this.$ajax({
        method:"POST",
        data:querstobj,
        url: this.globals.requesturl + 'web/personnel/solrSelect',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: [function (data) { 
          return qs.stringify(data)
        }]
      }).then(res=>{
        if(res.data.success && res.data.errorCode == -1){
          this.loading = false
          let listarr = [];
          for(let i=0;i<res.data.body.list.length;i++){
            for(let j=0;j<res.data.body.list[i].personnelList.length;j++){
              let list = res.data.body.list[i].personnelList[j]
              let objs = {};
              objs.name = list.name
              // objs.sex = list.sex==0?'男':'女'
            objs.sex = list.sex==that.sexlist[0].value?that.sexlist[0].label:that.sexlist[1].label
              objs.nation = list.nation
              objs.nativePlace = list.nativePlace
              objs.birthday = list.birthday
              objs.idCard = list.idCard
              objs.id = list.id
              listarr.push(objs)
              if(list.sex == ""){
                objs.sex = ""
              }else if(list.sex == 1){
                objs.sex = "男"
              }else if(list.sex == 2){
                objs.sex = "女"
              }
            }
          }
          this.tableData = listarr
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
    init(objs){
      let that = this
      this.$ajax({
        method: "POST",
        url: that.globals.requesturl + 'web/personnel/list',
        data: objs,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: [function (data) { 
          return qs.stringify(data)
        }]
      }).then(res=>{
        if(res.data.success && res.data.errorCode == -1){
          that.loading=false
          let listarr = [];
          res.data.body.personnelList.map(function(list){
            let objs = {};
            objs.name = list.name
            objs.sex = list.sex==that.sexlist[0].value?that.sexlist[0].label:that.sexlist[1].label
            objs.nation = list.nation
            objs.nativePlace = list.nativePlace
            objs.birthday = list.birthday?list.birthday.split(" ")[0]:"",
            objs.idCard = list.idCard
            objs.id = list.id
            listarr.push(objs)
            if(list.sex == ""){
              objs.sex = ""
            }else if(list.sex == 1){
              objs.sex = "男"
            }else if(list.sex == 2){
              objs.sex = "女"
            }
          })
          that.tableData = listarr
        }else{
          this.$message.error(res.data.msg); 
        }
      })
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
    // 查询
    appendbtn(){
      this.$router.push({path:"/addInfo",query:{updatas:2}})
    },
    //导入
    exportbtn(){},
    //查看
    handleEdit(row){
        this.$router.push({path:"/addInfo",query:{updatas:1,id:this.tableData[row].id}})
    },
    //修改
    updatebtn(row){
    this.$router.push({path:"/addInfo",query:{updatas:0,id:this.tableData[row].id}})
    },

    // 2020-05-11 修改
    // 查询单位
    initunits() {
      let that = this
      let objs = {
        userId: JSON.parse(localStorage.getItem('userinfo')).isd
      }
      this.$ajax({
        method: 'POST',
        url: that.globals.requesturl + 'web/office/list',
        data: objs,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: [
          function(data) {
            return qs.stringify(data)
          }
        ]
      }).then(res => {
        if (res.data.errorCode == '-1') {
          let lists = []
          that.unitslist = res.data.body.officeList.map(function(list, index) {
            return {
              id: list.id,
              name: list.name,
              children: []
            }
          })
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    //级联事件
    unitChanges(data) {
      let that = this
      let objs = {
        userId: JSON.parse(localStorage.getItem('userinfo')).isd,
        parentId: data[data.length - 1]
      }
      this.$ajax({
        method: 'POST',
        url: that.globals.requesturl + 'web/office/getChildren',
        data: objs,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: [
          function(data) {
            return qs.stringify(data)
          }
        ]
      }).then(res => {
        if (res.data.errorCode == '-1') {
          //this.showinput = false
          if (data.length == 1) {
            that.unitslist.map(function(list, index) {
              if (list.id == data[0]) {
                if (!list.children.length) {
                  list.children = res.data.body.officeList.map(function(
                    list,
                    index
                  ) {
                    return {
                      id: list.id,
                      name: list.name,
                      children: list.hasChildren == false ? null : []
                    }
                  })
                }
              }
            })
          } else if (data.length == 2) {
            that.unitslist.map(function(list, index) {
              if (list.id == data[0]) {
                list.children.map(function(list, index) {
                  if (list.id == data[1]) {
                    if (!list.children.length) {
                      list.children = res.data.body.officeList.map(function(
                        list,
                        index
                      ) {
                        return {
                          id: list.id,
                          name: list.name,
                          children: list.hasChildren == false ? null : []
                        }
                      })
                    }
                  }
                })
              }
            })
          } else if (data.length == 3) {
            that.unitslist.map(function(list, index) {
              if (list.id == data[0]) {
                list.children.map(function(list, index) {
                  if (list.id == data[1]) {
                    list.children.map(function(list, index) {
                      if (list.id == data[2]) {
                        if (!list.children.length) {
                          list.children = res.data.body.officeList.map(function(list,index) {
                            return {
                              id: list.id,
                              name: list.name,
                              children: list.hasChildren == false ? null : []
                            }
                          })
                        }
                      }
                    })
                  }
                })
              }
            })
          }
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },

  },
  components: {},
  watch: {}
};
</script>

<style lang="scss">
.PeopleManage {
  .findInner {
    .el-input__inner{
      padding-right: 30px;
      width: 210px !important;
    }
  }
  // .el-input--suffix .el-input__inner {
  //   padding-right: 1.478vw;
  // }


  .el-table th>.cell{
    font-size: 12px;
  }
  .ManageTop{
    padding: 15px;
  }
  .btnSearch, .btnEdit {
    .el-button {
      background: #025bff;
      border: 1px #025bff solid;
    }
  }
  .el-radio__label {
    font-size: 1.09375vw;
    padding-left: 0.3vw;
  }
  .btnUpdata {
    .el-button {
      background: #029aff;
      border: 1px solid #029aff;
    }
  }

  .btnAdd {
    .el-button {
      background: #e08801;
      border: 1px solid #e08801;
    }
  }

  .rightBtn {
    float: right;
  }

  .el-form-item__label {
    color: #ffffff;
    width: 50px;
  }

  .el-input__inner {
    color: #fff;
    background: transparent;
    border: 1px solid rgba(3, 208, 255, 0.7);
  }
  .el-form-item__content{
      line-height: .2;
  }
  .el-button--small{
      width: 70px !important;
      height: 38px !important;
      font-size: 14px !important;
  }
  .filesbtns{
    position: relative;
    cursor: pointer;
  }
  .filesbtns-input{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;left: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 500;
  }
  .saveBtn {
    width: 100%;
    border-top: 1px solid #03d0ff;
    overflow: hidden;

    div {
      width: 200px;
      padding: 15px;
      box-sizing: border-box;
      height: 11vh;
      float: right;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .el-button {
        width: 80px;
      }

      .derive {
        background: #029aff;
        border: 1px solid #029aff;
      }

      .save {
        background: #e08801;
        border: 1px solid #e08801;
      }
    }
  }
}
</style>
