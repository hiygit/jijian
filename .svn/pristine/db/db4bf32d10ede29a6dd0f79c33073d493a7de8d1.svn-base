<template>
  <div class="taizhangluru">
    <!-- 面包屑导航 -->
    <div class="navcrumbed">
        <div class="navcrumbedimg">
            <img @click="goback" style="cursor: pointer;" src="@/assets/navblack.png" alt srcset />
            <!-- <img src="@/assets/navblack.png" alt srcset /> -->
            <span>当前位置：</span>
        </div>
        <div class="navcrumbedlist">
            <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/problemstandbook' }">问题台账</el-breadcrumb-item>
            <el-breadcrumb-item>问题台账录入</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
    <div class="content home">
      <div class="ProblemStandBookEnter">
        <span class="border row1"></span>
        <span class="border row2"></span>
        <span class="border col1"></span>
        <span class="border col2"></span>
        <div class="ProblemStandBEmain">
          <div class="leftForm">
            <el-form ref="form" :model="form" label-width="80px" :rules = 'rules'>
              <el-form-item label="姓名" placeholder="不涉及个人的填写“不涉及" prop="name">
                <el-input v-model="form.name" size="100"></el-input>
              </el-form-item>
              <el-form-item label="单位名称" prop="companyName">
                <!-- <el-cascader v-model="form.companyName" :options="unitslist" @expand-change="unitChanges" placeholder="请选择单位名称"></el-cascader>
                <el-input v-model="inputcompanyName" size="100" readonly v-if="showinput"></el-input> -->
                <el-input :disabled="disabled" v-model="form.companyName" readonly v-if="showinput"></el-input>
                <el-cascader v-model="form.companyName" :options="unitslist" @active-item-change="unitChanges" placeholder="请选择单位名称" :props="{value: 'id',label: 'name',children: 'children'}"></el-cascader>
              </el-form-item>
              <el-form-item label="单位级别" prop="companyLevel">
                <el-select v-model="form.companyLevel" placeholder="请选择单位级别">
                  <el-option v-for="item in unitRankList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="职务" prop="duty">
                <el-input v-model="form.duty" size="100"></el-input>
              </el-form-item>
              <el-form-item label="职务级别" prop="jobLevel">
                <el-select v-model="form.jobLevel" placeholder="请选择级别">
                  <el-option v-for="item in dutyRankList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="时间" prop="time">
                <el-date-picker v-model="form.time" type="datetime" placeholder="选择时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
              </el-form-item>
              <el-form-item label="问题来源" prop="problemSources">
                <el-select v-model="form.problemSources" placeholder="请选择问题来源">
                  <el-option v-for="item in proFromList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="问题类型" prop="problemType">
                <el-select v-model="form.problemType" placeholder="请选择问题类型">
                  <el-option v-for="item in proTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="问题种类" prop="problemKind">
                <el-select v-model="form.problemKind" placeholder="请选择问题种类">
                  <el-option v-for="item in proVarietyList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="处置意见" prop="disposalOpinion">
                <el-select v-model="form.disposalOpinion" placeholder="请选择处置意见">
                  <el-option v-for="item in disposeIdeaList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="处理时间" prop="processingTime">
                <el-date-picker v-model="form.processingTime" type="datetime" placeholder="选择处理时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
              </el-form-item>
              <el-form-item label="整改时间" prop="abarbeitungTime">
                <el-date-picker v-model="form.abarbeitungTime" type="datetime" placeholder="选择整改时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
              </el-form-item>
              <el-form-item label="整改情况" prop="abarbeitungSituation">
                <el-select v-model="form.abarbeitungSituation" placeholder="请选择整改情况">
                  <el-option v-for="item in reformStatusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" v-model="form.remarks" placeholder="请填写备注"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="rightForm">
            <el-form :model="form" label-position="top">
              <el-form-item label="问题摘要">
                <el-input type="textarea" v-model="form.problemDigest" placeholder="请填写问题摘要" :autosize="{ minRows: 5, maxRows: 5}"></el-input>
              </el-form-item>
              <el-form-item label="处理情况">
                <el-input type="textarea" v-model="form.handlingInformation" placeholder="请填写处理情况" :autosize="{ minRows: 5, maxRows: 5}"></el-input>
              </el-form-item>
              <el-form-item label="整改效果" style="border-bottom:none;">
                <el-input type="textarea" v-model="form.effectRectification" placeholder="请填写整改效果" :autosize="{ minRows: 5, maxRows: 5}"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="bottomSub" v-if="!isshow">
          <button class="bottomBtnStyle" @click="savebtns('form')">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import Breadcrumb from "@/components/Breadcrumb";
export default {
  name: "ProblemStandBookEnter",
  data() {
    return {
      disabled:false,
      showinput:false,//单位名称框显示
      inputcompanyName:"",//单位名称 只做显示
      itemid:"",
      form: {
        name: "",
        companyName: "",
        companyNameid:"",
        companyLevel: "",
        duty: "",
        jobLevel: "",
        time: "",
        problemSources: "",
        problemType: "",
        problemKind: "",
        disposalOpinion: "",
        processingTime: "",
        abarbeitungTime: "",
        abarbeitungSituation: "",
        problemDigest:"",
        handlingInformation:"",
        effectRectification:"",
        remarks: "",
        'companyName.id':""
      },
      rules:{
        // name:[{required: true, message: '请输入姓名', trigger: 'blur'}],
        // companyName:[{required: true, message: '请选择单位', trigger: 'blur'}],
        // companyLevel:[{required: true, message: '请选择单位级别', trigger: 'blur'}],
        // duty:[{required: true, message: '请填写职务', trigger: 'blur'}],
        // jobLevel:[{required: true, message: '请选择职务级别', trigger: 'blur'}],
        time:[{required: true, message: '请选择时间', trigger: 'blur'}],
        problemSources:[{required: true, message: '请选择问题来源', trigger: 'blur'}],
        problemType:[{required: true, message: '请选择问题类型', trigger: 'blur'}],
        problemKind:[{required: true, message: '请选择问题种类', trigger: 'blur'}],
        // disposalOpinion:[{required: true, message: '请选择处置意见', trigger: 'blur'}],
        // processingTime:[{required: true, message: '请选择处理时间', trigger: 'blur'}],
        // abarbeitungTime:[{required: true, message: '请选择整改时间', trigger: 'blur'}],
        // abarbeitungSituation:[{required: true, message: '请选择整改情况', trigger: 'blur'}],
      },
      //级联选择
      unitslist:[],
      //单位级别
      unitRankList: [],
      //职务级别
      dutyRankList: [],
      //问题来源
      proFromList: [],
      //问题类型
      proTypeList: [],
      //问题种类
      proVarietyList: [],
      //处置意见
      disposeIdeaList: [],
      //整改情况
      reformStatusList: [],
    };
  },
  created() {
    document.title = "线索台账录入";
    let that = this
    //问题来源
    this.$ajax({
      method: "POST",
      url: this.globals.requesturl + 'web/dict',
      data: {type:'problem_sources'},
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      transformRequest: [function (data) { 
        return qs.stringify(data)
      }]
    }).then(res=>{
      if(res.data.success && res.data.errorCode == '-1'){
        res.data.body.dictValueList.map(function(list){
          that.proFromList.push({value:list.value,label:list.label})
        })
      }else{
        this.$message.error(res.data.msg); 
      }
    })
    //职务级别
    this.$ajax({
      method: "POST",
      url: this.globals.requesturl + 'web/dict',
      data: {type:'job_level'},
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      transformRequest: [function (data) { 
        return qs.stringify(data)
      }]
    }).then(res=>{
      if(res.data.success && res.data.errorCode == '-1'){
        res.data.body.dictValueList.map(function(list){
          that.dutyRankList.push({value:list.value,label:list.label})
        })
      }else{
        this.$message.error(res.data.msg); 
      }
    })
    //单位级别
    this.$ajax({
      method: "POST",
      url: this.globals.requesturl + 'web/dict',
      data: {type:'company_level'},
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      transformRequest: [function (data) { 
        return qs.stringify(data)
      }]
    }).then(res=>{
      if(res.data.success && res.data.errorCode == '-1'){
        res.data.body.dictValueList.map(function(list){
          that.unitRankList.push({value:list.value,label:list.label})
        })
      }else{
        this.$message.error(res.data.msg); 
      }
    })
    //问题类型
    this.$ajax({
      method: "POST",
      url: this.globals.requesturl + 'web/dict',
      data: {type:'problem_type'},
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      transformRequest: [function (data) { 
        return qs.stringify(data)
      }]
    }).then(res=>{
      if(res.data.success && res.data.errorCode == '-1'){
        res.data.body.dictValueList.map(function(list){
          that.proTypeList.push({value:list.value,label:list.label})
        })
      }else{
        this.$message.error(res.data.msg); 
      }
    })
    //问题种类
    this.$ajax({
      method: "POST",
      url: this.globals.requesturl + 'web/dict',
      data: {type:'problem_kind'},
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      transformRequest: [function (data) { 
        return qs.stringify(data)
      }]
    }).then(res=>{
      if(res.data.success && res.data.errorCode == '-1'){
        res.data.body.dictValueList.map(function(list){
          that.proVarietyList.push({value:list.value,label:list.label})
        })
      }else{
        this.$message.error(res.data.msg); 
      }
    })
    //处置意见
    this.$ajax({
      method: "POST",
      url: this.globals.requesturl + 'web/dict',
      data: {type:'disposal_opinion'},
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      transformRequest: [function (data) { 
        return qs.stringify(data)
      }]
    }).then(res=>{
      if(res.data.success && res.data.errorCode == '-1'){
        res.data.body.dictValueList.map(function(list){
          that.disposeIdeaList.push({value:list.value,label:list.label})
        })
      }else{
        this.$message.error(res.data.msg); 
      }
    })
    //整改情况
    this.$ajax({
      method: "POST",
      url: this.globals.requesturl + 'web/dict',
      data: {type:'abarbeitung_situation'},
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      transformRequest: [function (data) { 
        return qs.stringify(data)
      }]
    }).then(res=>{
      if(res.data.success && res.data.errorCode == '-1'){
        res.data.body.dictValueList.map(function(list){
          that.reformStatusList.push({value:list.value,label:list.label})
        })
      }else{
        this.$message.error(res.data.msg); 
      }
    })
  },
  mounted(){
    this.isshow = this.$route.query.look
    let id = this.$route.query.id
    if(id){
      this.showinput = true
      this.itemid = id
      let objs = {
        userId: JSON.parse(localStorage.getItem('userinfo')).isd,
        id:id
      }
      this.init(objs)
    }
    this.initunits()
  },
  methods:{
    //页面初始化
    init(objs){
      let that = this
      this.$ajax({
        method:"POST",
        url: that.globals.requesturl + 'web/problemsofparameter/form',
        data: objs,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: [function (data) { 
          return qs.stringify(data)
        }]
      }).then(res=>{
        if(res.data.success && res.data.errorCode == '-1'){
          that.inputcompanyName = res.data.body.companyName.name;
          that.form.name = res.data.body.name;
          that.form.effectRectification = res.data.body.effectRectification;
          that.form.handlingInformation = res.data.body.handlingInformation;
          that.form.problemDigest = res.data.body.problemDigest;
          // that.form.companyName = res.data.body.companyName.name;
          that.form.companyName = res.data.body.companyNameStr;
          that.form.companyNameid = res.data.body.companyName.id
          that.form.duty = res.data.body.duty;
          that.form.time = res.data.body.time;
          that.form.processingTime = res.data.body.processingTime;
          that.form.abarbeitungTime = res.data.body.abarbeitungTime;
          that.form.remarks = res.data.body.remarks;
          //修改过2020/1/7
          that.form.jobLevel = res.data.body.jobLevel
          that.form.disposalOpinion = res.data.body.disposalOpinion
          that.form.abarbeitungSituation = res.data.body.abarbeitungSituation
          that.form.problemKind = res.data.body.problemKind
          that.form.problemSources = res.data.body.problemSources
          that.form.problemType = res.data.body.problemType
          that.form.companyLevel = res.data.body.companyLevel
          // that.dutyRankList.map(function(list){
          //   if(list.value == res.data.body.jobLevel){
          //     that.form.jobLevel = list.label
          //   }
          // })
          // that.disposeIdeaList.map(function(list){
          //   if(list.value == res.data.body.disposalOpinion){
          //     that.form.disposalOpinion = list.label
          //   }
          // })
          // that.reformStatusList.map(function(list){
          //   if(list.value == res.data.body.abarbeitungSituation){
          //     that.form.abarbeitungSituation = list.label
          //   }
          // })
          // that.proVarietyList.map(function(list){
          //   if(list.value == res.data.body.problemKind){
          //     that.form.problemKind = list.label
          //   }
          // })
          // that.proFromList.map(function(list){
          //   if(list.value == res.data.body.problemSources){
          //     that.form.problemSources = list.label
          //   }
          // })
          // that.proTypeList.map(function(list){
          //   if(list.value == res.data.body.problemType){
          //     that.form.problemType = list.label
          //   }
          // })
          // that.unitRankList.map(function(list){
          //   if(list.value == res.data.body.companyLevel){
          //     that.form.companyLevel = list.label
          //   }
          // })
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
          }else if(data.length == 3){
            that.unitslist.map(function(list,index){
              if(list.id == data[0]){
                list.children.map(function(list,index){
                  if(list.id == data[1]){
                    list.children.map(function(list,index){
                      console.log(list.id == data[2])
                      if(list.id == data[2]){
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
            })
          }
        }else{
          this.$message.error(res.data.msg); 
        }
      })
    },
    //保存
    savebtns(formName){
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let requestform = {
            id:that.itemid,
            name: that.form.name,
            companyLevel: that.form.companyLevel,
            duty: that.form.duty,
            jobLevel: that.form.jobLevel,
            time: that.form.time,
            problemSources: that.form.problemSources,
            problemType: that.form.problemType,
            problemKind: that.form.problemKind,
            disposalOpinion: that.form.disposalOpinion,
            processingTime: that.form.processingTime,
            abarbeitungTime: that.form.abarbeitungTime,
            abarbeitungSituation: that.form.abarbeitungSituation,
            problemDigest:that.form.problemDigest,
            handlingInformation:that.form.handlingInformation,
            effectRectification:that.form.effectRectification,
            remarks: that.form.remarks,
            // 'companyName.id':that.form.companyName?that.form.companyName[that.form.companyName.length-1]:"",
            "companyName.id": typeof(that.form.companyName)== 'string' ? that.form.companyNameid : that.form.companyName[that.form.companyName.length - 1], //工作单位id
            userId: JSON.parse(localStorage.getItem('userinfo')).isd
          }
          this.$ajax({
            method: "POST",
            url: that.globals.requesturl + 'web/problemsofparameter/save',
            data: requestform,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: [function (data) { 
              return qs.stringify(data)
            }]
          }).then(res=>{
            if(res.data.errorCode == "-1"){
              this.$message.success(res.data.msg); 
              this.$router.go(-1)
            }else{
              this.$message.error(res.data.msg); 
            }
          })
        } else {
          return false;
        }
      });
    },
    //返回上一页
    goback(){
      this.$router.go(-1)
    }
  },
  components: {
    // Breadcrumb
  }
};
</script>

<style lang="scss">
.taizhangluru {
  
textarea:-ms-input-placeholder {
    color: #333;
}

textarea::-webkit-input-placeholder {
    color: #333;
}

textarea::-moz-placeholder {
    color: #333;
}

textarea:-moz-placeholder {
    color: #333;
}
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
  .personnelframe-pricker .el-cascader {
    height: 30px;
  }
  .personnelframe-pricker .el-input__inner,
  .personnelframe-pricker .el-input__inner:hover {
    border: 1px solid #bcd9e8 !important;
    font-size: 10px;
    height: 30px;
    line-height: 30px;
  }
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
  .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
    color: #03d0ff;
    cursor: default;
  }
}


// 面包屑导航
.navcrumbed {
width: 96%;
font-size: 15px;
color: #fff;
display: flex;
align-items: center;
justify-content: flex-start;
line-height: 50px;
position: relative;
top: -25px;
left: 30px;
.navcrumbedimg {
    display: inline-flex;
    align-items: center;

    img {
    width: 25px;
    height: 22px;
    margin-right: 5px;
    }
}
}
.ProblemStandBookEnter {
  width: 95%;
  margin: 0 auto;
  box-sizing: border-box;
  border: 1px solid #03D0FF;
  box-shadow: 0 0 5px #03D0FF inset;
  -webkit-box-shadow: 0 0 5px #03D0FF inset;
  -moz-box-shadow: 0 0 5px #03D0FF inset;
  -o-box-shadow: 0 0 0 5px #03D0FF inset;
  position: relative;
  color: #fff;

  .ProblemStandBEmain {
    display: flex;
    height: 72vh;

    .leftForm {
      height: 72vh;
      box-sizing: border-box;
      padding: 20px 30px;
      overflow-y: auto;
      flex: 1;
      border: none;
      border-right: 1px solid #03D0FF;
     .el-form-item__label{
         width: 7vw !important;
        }
      .el-input, .el-select, .el-textarea__inner {
        width: 16vw;
      }
      .el-form-item__content{
        margin-left: 90px !important;
      }
        .el-textarea{
            width: 88% !important;
        }
      .el-textarea__inner {
        color: #fff;
        background: transparent;
        border: 1px solid rgba(3, 208, 255, 0.7);
        resize: none;
        height: 80px;
      }
    }

    .rightForm {
      height: 72vh;
      box-sizing: border-box;
      overflow-y: auto;
      flex: 3;
    //   border-bottom: 1px solid #03D0FF;

      .el-form {
        .el-form-item {
          padding: 0 20px 30px;
          box-sizing: border-box;
          border-bottom: 1px solid #03D0FF;
        }

        .el-form-item__label {
          width: 300px;
        }

        .el-textarea__inner {
          color: #000;
          background: #D9EBF3;
        }
      }
    }
  }

  .bottomSub {
    overflow: hidden;
    padding: 10px;
    border-top: 1px solid #03D0FF;
    .bottomBtnStyle {
      width: 80px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      background: #e08801;
      border: none;
      border-radius: 3px;
      float: right;
      cursor: pointer;
    }
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
  textarea::-webkit-input-placeholder {
    color: #C0C4CC; 
  }
}

.el-scrollbar__wrap {
  overflow: auto !important;
}

</style>