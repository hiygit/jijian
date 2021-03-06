﻿import SelectYear from '@/components/Tools/SelectYear/index.vue'
import Gender from '@/components/Home/Homeecharts/Gender/index.vue'
import Shape from '@/components/Home/Homeecharts/Shape/index.vue'
import Performance from '@/components/Home/Homeecharts/Performance/index.vue'
import ProblemPeople from '@/components/Home/Homeecharts/ProblemPeople/index.vue'
import FoldLine from '@/components/Home/Homeecharts/FoldLine/index.vue'
import transfer from '@/components/Home/transfer.js'
import qs from 'qs'
export default {
  components: {
    SelectYear,
    Gender,
    // 形态统计
    Shape,
    //重点工作完成情况
    Performance,
    //各单位问题人统计
    ProblemPeople,
    // 叠层折线图
    FoldLine
  },
  data() {
    return {
      startDate:"",
      endDate:"",
      startmonth:"",
      endmonth:"",
      yaers:"",
      months:"",
      threenames:[],
      threedata:[[],[]],
      // 柱状图
      isDouble: true,
      nameList: ['详细数据'],//5
      doubleNameList: ['党员', '非党员'],//1
      datalist:[],//1
      firstBlock: [],//1
      fifBlock: [],//5
      fifdatalist:[],//5
      // 环形图
      secordBlockTitle: ' ',//2
      sixthBlockTitle: ' ',//6
      seventhBlockTitle: ' ',//7
      //2
      secordBlockData: [],
      //6
      sixthBlockData: [],
      //7
      seventhBlockData: [],

      //折线图  4
      forthSeries: [{
          name: '',
          type: 'line',
          areaStyle: {
            color: '#53A8E2',
            opacity: 0.4
          },
          data: []
        },
        {
          name: '',
          type: 'line',
          areaStyle: {
            color: '#53A8E2',
            opacity: 0.4
          },
          data: []
        },
        {
          name: '',
          type: 'line',
          areaStyle: {
            color: '#53A8E2',
            stack: '总量',
            opacity: 0.4
          },
          data: []
        }
      ],
      forthdataXline: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],//4
      //8
      eighthSeries: [{
          name: '',
          type: 'line',
          areaStyle: {
            color: '#53A8E2',
            opacity: 0.4
          },
          data: []
        },
        {
          name: '',
          type: 'line',
          areaStyle: {
            color: '#53A8E2',
            opacity: 0.4
          },
          data: []
        },
        {
          name: '',
          type: 'line',
          areaStyle: {
            color: '#53A8E2',
            stack: '总量',
            opacity: 0.4
          },
          data: []
        }
      ],
      eighthdataXline: ['周一', '周二', '周三', '周四', '周五', '周六', '周日22'],//8

      //堆叠柱状图  9
      dataBarFold: [
        {
          name: '',
          type: 'bar',
          barWidth: 20,
          stack: '搜索引擎',
          data: []
        },
        {
          name: '',
          type: 'bar',
          stack: '搜索引擎',
          data: []
        },
        {
          name: '',
          type: 'bar',
          stack: '搜索引擎',
          data: []
        },
        {
          name: '',
          type: 'bar',
          stack: '搜索引擎',
          data: []
        }
      ],
      dataXbarFold: [],//9

      //实心饼图  10
      titlePreNoHollow: '',
      //10
      dataPreNoHollow: [],
      //最后通屏
      // widthBlock: '72.35313vw',//11 35.15625vw
      widthBlock: '35.15625vw',//11 
      //11
      lastSeries: [
        {
          name: '',
          type: 'line',
          areaStyle: {
            color: '#53A8E2',
            opacity: 0.4
          },
          data: []
        },
        {
          name: '',
          type: 'line',
          areaStyle: {
            color: '#53A8E2',
            opacity: 0.4
          },
          data: []
        },
        {
          name: '',
          type: 'line',
          areaStyle: {
            color: '#53A8E2',
            stack: '总量',
            opacity: 0.4
          },
          data: []
        }
      ],
      lastdataXline: ["10岁","20岁","30岁","40岁","50岁","60岁","70岁"],//11
      idsstr:""
    }
  },
  created(){
    //职务级别  title_jobs_level
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
        let jobs = []
        res.data.body.dictValueList.map(function(list){
          jobs.push(list.label)
        })
        this.dataXbarFold = jobs
      }else{
        this.$message.error(res.data.msg); 
      }
    })
  },
  mounted(){
    let objs = {
      userId: JSON.parse(localStorage.getItem('userinfo')).isd,
      officeId:"",
      startDate:this.startDate,
      endDate:this.endDate
    }
    this.init(objs)
    transfer.$on('unitids',(datas)=>{
      console.log(datas)
      this.idsstr = datas
      let objs = {
        userId: JSON.parse(localStorage.getItem('userinfo')).isd,
        officeId:datas,
      }
      this.init(objs)
    })
    transfer.$on('allunitids',(datas)=>{
      this.idsstr = datas
      let objs = {
        userId: JSON.parse(localStorage.getItem('userinfo')).isd,
        officeId:"",
      }
      this.init(objs)
    })
  },
  watch:{
    idsstr(valu){
      // console.log('oldval='+valu)
    },
  },
  methods:{
    init(objs){
      let that = this; 
      this.$ajax({
          method: "POST",
          url: that.globals.requesturl + 'web/index',
          data: objs,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: [function (data) { 
            return qs.stringify(data)
        }]
      }).then(res=>{
          if(res.data.errorCode == "-1"){
            console.log(res.data)
            // ***********************************************
            that.startDate = res.data.body.startDate
            that.endDate = res.data.body.endDate
            // ***********************************************

            let chaertslist = res.data.body;
            //第一个图
            let onenames = [],onedata=[[],[]];
            chaertslist.officePartyMemberList.map(function(list){
              onenames.push(list.name)
              onedata[0].push(list.partyMemberSum)
              onedata[1].push(list.notPartyMemberSum)
            })
            this.datalist = onedata
            this.firstBlock = onenames
            //第二个图   secordBlockData
            let twolist = [];
            chaertslist.fourKindOfFormList.map(function(list){
              twolist.push({
                  value: list.number,
                  name: list.formTitle
              })
            })
            this.secordBlockData = twolist
            //第三个图
            let threenames = [],threedata=[[],[]];
            chaertslist.keyWorkProgressList.map(function(list){
              let num = parseInt(list.avg)
              threenames.push(list.name)
              threedata[0].push(num)
              threedata[1].push(100)
            })
            this.threenames = threenames
            this.threedata = threedata
            //第四个图 forthSeries  forthdataXline
            // let fourtime = [], fourlist = [];
            // chaertslist.problemsOfParameterList.map(function(list){
            //   fourlist.push(list.number)
            //   fourtime.push(list.date)
            //   fourlist.push({
            //       name: list.NAME,
            //       type: 'line',
            //       areaStyle: {
            //           color: '#53A8E2',
            //           opacity: 0.4
            //       },
            //       data: [list.number]
            //   })
            // })
            // this.forthdataXline = fourtime
            // this.forthSeries = fourlist
            //第五个图
            let fivename = [],fivedate = [[],[]];
            chaertslist.problemKindList.map(function(list){
              fivename.push(list.kind);
              fivedate[0].push(list.number)
              fivedate[1].push(0)
            })
            this.fifBlock = fivename
            this.fifdatalist = fivedate
            //第六个图
            let sixdata = [];
            chaertslist.fourKindsDisposalOpinionList.map(function(list){
              sixdata.push({
                  value: list.number,
                  name: list.formTitle,
              })
            })
            this.sixthBlockData = sixdata
            //第七个图
            let severxdata = [];
            chaertslist.sixDisciplineList.map(function(list){
              severxdata.push({
                  value: list.number,
                  name: list.NAME,
              })
            })
            this.seventhBlockData = severxdata
            //第八个图
            let eightlist = [],eightname = [],newArr = [],numArr = [];
            chaertslist.problemsOfParameterYearDataList.map(function(list){
              eightname = list.date
              eightlist.push({
                name: list.name,
                type: 'line',
                areaStyle: {
                  color: '#53A8E2',
                  opacity: 0.4
                },
                data: list.number
              })
            })
            this.eighthdataXline = eightname
            this.eighthSeries = eightlist
            
            // let eightlist = [],eightname = [],newArr = [],numArr = [];
            // chaertslist.problemsOfParameterYearDataList.map(function(list){
            //   numArr.push(list.number)
            //   eightname.push(list.date)
            //   let set = new Set(eightname)
            //   newArr = Array.from(set)
            //   eightlist.push({
            //     name: list.name,
            //     type: 'line',
            //     areaStyle: {
            //       color: '#53A8E2',
            //       opacity: 0.4
            //     },
            //     data: numArr
            //   })
            // })
            // // 数组对象去重
            // let resarr = []
            // let resobj = {}
            // for(let i=0;i<eightlist.length;i++){
            //   if(!resobj[eightlist[i].name]){
            //     resarr.push(eightlist[i])
            //     resobj[eightlist[i].name] = true
            //   }
            // }
            // // this.eighthdataXline = eightname
            // // this.eighthSeries = eightlist
            // this.eighthdataXline = newArr
            // this.eighthSeries = resarr
            // console.log(this.eighthdataXline)
            // console.log(this.eighthSeries)
            
            //第九个图
            let ninelist = [],ninename = [];
            chaertslist.jobLevelList.map(function(list){
              // ninename.push(list.jobLevel)
              let listnumbers = list.numbers
              ninelist.push({
                name: list.name,
                type: 'bar',
                barWidth: 20,
                stack: list.name,
                data: listnumbers
              })
            })
            this.dataBarFold = ninelist
            // this.dataXbarFold = ninename
            //第十个图
            let tenlist = [];
            chaertslist.officeNumberList.map(function(list){
              tenlist.push({
                value: list.number,
                name: list.name,
              })
            })
            this.dataPreNoHollow = tenlist
            //第十一个图
            let elevenlist = [],elevenname=[];
            chaertslist.ageStructuralLayerList.map(function(list){
              // elevenname.push(list.ages+'岁')
              let listnumbers = list.numbers
              elevenlist.push({
                // name: list.NAME,
                name: list.name,
                type: 'line',
                areaStyle: {
                  color: '#53A8E2',
                  opacity: 0.4
                },
                data: listnumbers
              })
            })
            // this.lastdataXline = elevenname
            this.lastSeries = elevenlist
          }
      })
    },

    // =======================================
    findbtn(){
      let that = this; 
      let dateStart = new Date(that.startDate)
      let time1 = dateStart.getTime() // 开始时间-转为时间戳
      let dateEnd = new Date(that.endDate)
      let time2 = dateEnd.getTime() // 开始时间-转为时间戳
      // console.log(time1)
      // console.log(time2)
      let dateobj = {
        userId: JSON.parse(localStorage.getItem('userinfo')).isd,
        officeId:"",
        startDate:that.startDate,
        endDate:that.endDate
      }
      if(that.startDate == ""){
        this.$message.error("请选择开始时间");
      }else if(that.endDate == ""){
        this.$message.error("请选择结束时间");
      }else if(time1 == ""){
        this.$message.error("请选择开始时间");
      }else if(time2== ""){
        this.$message.error("请选择结束时间");
      }else if(time2 < time1){
        this.$message.error("开始时间不得大于结束时间");
      }else{
        this.$ajax({
            method: "POST",
            url: that.globals.requesturl + 'web/index',
            data: dateobj,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: [function (data) { 
              return qs.stringify(data)
          }]
        }).then(res=>{
            if(res.data.errorCode == "-1"){
              // console.log(res.data)
              let chaertslist = res.data.body;
              //第一个图
              let onenames = [],onedata=[[],[]];
              chaertslist.officePartyMemberList.map(function(list){
                onenames.push(list.name)
                onedata[0].push(list.partyMemberSum)
                onedata[1].push(list.notPartyMemberSum)
              })
              this.datalist = onedata
              this.firstBlock = onenames
              //第二个图   secordBlockData
              let twolist = [];
              chaertslist.fourKindOfFormList.map(function(list){
                twolist.push({
                    value: list.number,
                    name: list.formTitle
                })
              })
              this.secordBlockData = twolist
              //第三个图
              let threenames = [],threedata=[[],[]];
              chaertslist.keyWorkProgressList.map(function(list){
                let num = parseInt(list.avg)
                threenames.push(list.name)
                threedata[0].push(num)
                threedata[1].push(100)
              })
              this.threenames = threenames
              this.threedata = threedata
              //第四个图 forthSeries  forthdataXline
              // let fourtime = [], fourlist = [];
              // chaertslist.problemsOfParameterList.map(function(list){
              //   fourlist.push(list.number)
              //   fourtime.push(list.date)
              //   fourlist.push({
              //       name: list.NAME,
              //       type: 'line',
              //       areaStyle: {
              //           color: '#53A8E2',
              //           opacity: 0.4
              //       },
              //       data: [list.number]
              //   })
              // })
              // this.forthdataXline = fourtime
              // this.forthSeries = fourlist
              //第五个图
              let fivename = [],fivedate = [[],[]];
              chaertslist.problemKindList.map(function(list){
                fivename.push(list.kind);
                fivedate[0].push(list.number)
                fivedate[1].push(0)
              })
              this.fifBlock = fivename
              this.fifdatalist = fivedate
              //第六个图
              let sixdata = [];
              chaertslist.fourKindsDisposalOpinionList.map(function(list){
                sixdata.push({
                    value: list.number,
                    name: list.formTitle,
                })
              })
              this.sixthBlockData = sixdata
              //第七个图
              let severxdata = [];
              chaertslist.sixDisciplineList.map(function(list){
                severxdata.push({
                    value: list.number,
                    name: list.NAME,
                })
              })
              this.seventhBlockData = severxdata
              //第八个图
              let eightlist = [],eightname = [],newArr = [],numArr = [];
              chaertslist.problemsOfParameterYearDataList.map(function(list){
                eightname = list.date
                eightlist.push({
                  name: list.name,
                  type: 'line',
                  areaStyle: {
                    color: '#53A8E2',
                    opacity: 0.4
                  },
                  data: list.number
                })
              })
              this.eighthdataXline = eightname
              this.eighthSeries = eightlist
              
              // let eightlist = [],eightname = [],newArr = [],numArr = [];
              // chaertslist.problemsOfParameterYearDataList.map(function(list){
              //   numArr.push(list.number)
              //   eightname.push(list.date)
              //   let set = new Set(eightname)
              //   newArr = Array.from(set)
              //   eightlist.push({
              //     name: list.name,
              //     type: 'line',
              //     areaStyle: {
              //       color: '#53A8E2',
              //       opacity: 0.4
              //     },
              //     data: numArr
              //   })
              // })
              // // 数组对象去重
              // let resarr = []
              // let resobj = {}
              // for(let i=0;i<eightlist.length;i++){
              //   if(!resobj[eightlist[i].name]){
              //     resarr.push(eightlist[i])
              //     resobj[eightlist[i].name] = true
              //   }
              // }
              // // this.eighthdataXline = eightname
              // // this.eighthSeries = eightlist
              // this.eighthdataXline = newArr
              // this.eighthSeries = resarr
              // console.log(this.eighthdataXline)
              // console.log(this.eighthSeries)

              //第九个图
              let ninelist = [],ninename = [];
              chaertslist.jobLevelList.map(function(list){
                // ninename.push(list.jobLevel)
                let listnumbers = list.numbers
                ninelist.push({
                  name: list.name,
                  type: 'bar',
                  barWidth: 20,
                  stack: list.name,
                  data: listnumbers
                })
              })
              this.dataBarFold = ninelist
              // this.dataXbarFold = ninename
              //第十个图
              let tenlist = [];
              chaertslist.officeNumberList.map(function(list){
                tenlist.push({
                  value: list.number,
                  name: list.name,
                })
              })
              this.dataPreNoHollow = tenlist
              //第十一个图
              let elevenlist = [],elevenname=[];
              chaertslist.ageStructuralLayerList.map(function(list){
                // elevenname.push(list.ages+'岁')
                let listnumbers = list.numbers
                elevenlist.push({
                  // name: list.NAME,
                  name: list.name,
                  type: 'line',
                  areaStyle: {
                    color: '#53A8E2',
                    opacity: 0.4
                  },
                  data: listnumbers
                })
              })
              // this.lastdataXline = elevenname
              this.lastSeries = elevenlist
            }
        })
      }
    },
   
    // =======================================

    //获取年份
    //1
    oneselectyear(val){
      this.onemaps(val)
    },
    //2
    twoselectyear(val){
      this.twomaps(val)
    },
    //3
    threeselectyear(val){
      this.threemaps(val)
    },
    //4
    fourselectyear(val){
      this.fourmaps(val)
    },
    //5
    fiveselectyear(val){
      this.fivemaps(val)
    },
    //6
    sixselectyear(val){
      this.sixmaps(val)
    },
    //7
    sevenselectyear(val){
      this.sevenmaps(val)
    },
    //8
    eightselectyear(val){
      this.eightmaps(val)
    },
    //9
    nineselectyear(val){
      this.ninemaps(val)
    },
    //10
    tenselectyear(val){
      this.tenmaps(val)
    },
    //11
    elevenselectyear(val){
      this.elevenmaps(val)
    },
    //获取月份
    //1
    oneselectmonth(val){
      this.onemaps(val)
    },
    //2
    twoselectmonth(val){
      this.twomaps(val)
    },
    //3
    threeselectmonth(val){
      this.threemaps(val)
    },
    //4
    fourselectmonth(val){
      this.fourmaps(val)
    },
    //5
    fiveselectmonth(val){
      this.fivemaps(val)
    },
    //6
    sixselectmonth(val){
      this.sixmaps(val)
    },
    //7
    sevenselectmonth(val){
      this.sevenmaps(val)
    },
    //8
    eightselectmonth(val){
      this.eightmaps(val)
    },
    //9
    nineselectmonth(val){
      this.ninemaps(val)
    },
    //10
    tenselectmonth(val){
      this.tenmaps(val)
    },
    //11
    elevenselectmonth(val){
      this.elevenmaps(val)
    },
    // //第一个图日期删选
    // onemaps(val){
    //   let that = this;
    //   let objs = {
    //     userId: JSON.parse(localStorage.getItem('userinfo')).isd,
    //     officeId:that.idsstr,
    //     date:val
    //   }
    //   this.$ajax({
    //     method: "POST",
    //     url: that.globals.requesturl + 'web/index/officePartyMember',
    //     data: objs,
    //     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    //     transformRequest: [function (data) { 
    //       return qs.stringify(data)
    //     }]
    //   }).then(res=>{
    //     if(res.data.errorCode == "-1"){
    //       let chaertslist = res.data.body
    //       let onenames = [],onedata=[[],[]];
    //       chaertslist.officePartyMemberList.map(function(list){
    //         onenames.push(list.name)
    //         onedata[0].push(list.partyMemberSum)
    //         onedata[1].push(list.notPartyMemberSum)
    //       })
    //       this.datalist = onedata
    //       this.firstBlock = onenames
    //     }else{
    //       this.$message.error(res.data.msg); 
    //     }
    //   })
    // },
    // //第二个图日期删选
    // twomaps(val){
    //   let that = this;
    //   let objs = {
    //     userId: JSON.parse(localStorage.getItem('userinfo')).isd,
    //     officeId:that.idsstr,
    //     date:val
    //   }
    //   this.$ajax({
    //     method: "POST",
    //     url: that.globals.requesturl + 'web/index/fourKindOfForm',
    //     data: objs,
    //     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    //     transformRequest: [function (data) { 
    //       return qs.stringify(data)
    //     }]
    //   }).then(res=>{
    //     if(res.data.errorCode == "-1"){
    //       let chaertslist = res.data.body
    //       let twolist = [];
    //       chaertslist.fourKindOfFormList.map(function(list){
    //         twolist.push({
    //             value: list.number,
    //             name: list.formTitle
    //         })
    //       })
    //       this.secordBlockData = twolist
    //     }else{
    //       this.$message.error(res.data.msg); 
    //     }
    //   })
    // },
    // //第三个图日期删选
    // threemaps(val){
    //   let that = this;
    //   let objs = {
    //     userId: JSON.parse(localStorage.getItem('userinfo')).isd,
    //     officeId:that.idsstr,
    //     date:val
    //   }
    //   this.$ajax({
    //     method: "POST",
    //     url: that.globals.requesturl + 'web/index/keyWorkProgress',
    //     data: objs,
    //     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    //     transformRequest: [function (data) { 
    //       return qs.stringify(data)
    //     }]
    //   }).then(res=>{
    //     if(res.data.errorCode == "-1"){
    //       let chaertslist = res.data.body
    //       if(chaertslist.keyWorkProgressList.length > 0){
    //         let threenames = [],threedata=[[],[]];
    //         chaertslist.keyWorkProgressList.map(function(list){
    //           threenames.push(list.name)
    //           threedata[0].push(list.avg)
    //           threedata[1].push(list.avg)//进度条白底
    //         })
    //         this.threenames = threenames
    //         this.threedata = threedata
    //       }else{
    //         this.$message.error('暂无数据'); 
    //       }
    //     }else{
    //       this.$message.error(res.data.msg); 
    //     }
    //   })
    // },
    // //第四个图日期删选
    // fourmaps(val){
    //   let that = this;
    //   let objs = {
    //     userId: JSON.parse(localStorage.getItem('userinfo')).isd,
    //     officeId:that.idsstr,
    //     date:val
    //   }
    //   this.$ajax({
    //     method: "POST",
    //     url: that.globals.requesturl + 'web/index/problemsOfParameter',
    //     data: objs,
    //     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    //     transformRequest: [function (data) { 
    //       return qs.stringify(data)
    //     }]
    //   }).then(res=>{
    //     if(res.data.errorCode == "-1"){
    //       let chaertslist = res.data.body
    //       let fourtime = [], fourlist = [];
    //       if(chaertslist.problemsOfParameterList.length != 0){
    //         chaertslist.problemsOfParameterList.map(function(list){
    //           fourlist.push(list.number)
    //           fourtime.push(list.date)
    //           fourlist.push({
    //               name: list.NAME,
    //               type: 'line',
    //               areaStyle: {
    //                   color: '#53A8E2',
    //                   opacity: 0.4
    //               },
    //               data: [list.number]
    //           })
    //         })
    //         this.forthdataXline = fourtime
    //         this.forthSeries = fourlist
    //       }else{
    //         this.$message.error('暂无数据'); 
    //       }
    //     }else{
    //       this.$message.error(res.data.msg); 
    //     }
    //   })
    // },
    // //第五个图日期删选  改数据
    // fivemaps(val){
    //   let that = this;
    //   let objs = {
    //     userId: JSON.parse(localStorage.getItem('userinfo')).isd,
    //     officeId:that.idsstr,
    //     date:val
    //   }
    //   this.$ajax({
    //     method: "POST",
    //     url: that.globals.requesturl + 'web/index/problemKind',
    //     data: objs,
    //     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    //     transformRequest: [function (data) { 
    //       return qs.stringify(data)
    //     }]
    //   }).then(res=>{
    //     if(res.data.errorCode == "-1"){
    //       let chaertslist = res.data.body
    //       let fivename = [],fivedate = [[],[]];
    //       chaertslist.problemKindList.map(function(list){
    //         fivename.push(list.kind);
    //         fivedate[0].push(list.number)
    //         fivedate[1].push(0)
    //       })
    //       this.fifBlock = fivename
    //       this.fifdatalist = fivedate
    //     }else{
    //       this.$message.error(res.data.msg); 
    //     }
    //   })
    // },
    // //第六个图日期删选
    // sixmaps(val){
    //   let that = this;
    //   let objs = {
    //     userId: JSON.parse(localStorage.getItem('userinfo')).isd,
    //     officeId:that.idsstr,
    //     date:val
    //   }
    //   this.$ajax({
    //     method: "POST",
    //     url: that.globals.requesturl + 'web/index/fourKindsDisposalOpinion',
    //     data: objs,
    //     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    //     transformRequest: [function (data) { 
    //       return qs.stringify(data)
    //     }]
    //   }).then(res=>{
    //     if(res.data.errorCode == "-1"){
    //       let chaertslist = res.data.body
    //       let sixdata = [];
    //       chaertslist.fourKindsDisposalOpinionList.map(function(list){
    //         sixdata.push({
    //           value: list.number,
    //           name: list.formTitle,
    //         })
    //       })
    //       this.sixthBlockData = sixdata
    //     }else{
    //       this.$message.error(res.data.msg); 
    //     }
    //   })
    // },
    // //第七个图日期删选
    // sevenmaps(val){
    //   let that = this;
    //   let objs = {
    //     userId: JSON.parse(localStorage.getItem('userinfo')).isd,
    //     officeId:that.idsstr,
    //     date:val
    //   }
    //   this.$ajax({
    //     method: "POST",
    //     url: that.globals.requesturl + 'web/index/sixDiscipline',
    //     data: objs,
    //     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    //     transformRequest: [function (data) { 
    //       return qs.stringify(data)
    //     }]
    //   }).then(res=>{
    //     if(res.data.errorCode == "-1"){
    //       let chaertslist = res.data.body
    //       let severxdata = [];
    //       if(chaertslist.sixDisciplineList.length > 0){
    //         chaertslist.sixDisciplineList.map(function(list){
    //           severxdata.push({
    //               value: list.number,
    //               name: list.NAME,
    //           })
    //         })
    //         this.seventhBlockData = severxdata
    //       }else{
    //         this.$message.error('暂无数据');
    //       }
    //     }else{
    //       this.$message.error(res.data.msg); 
    //     }
    //   })
    // },
    // //第八个图日期删选
    // eightmaps(val){
    //   let that = this;
    //   let objs = {
    //     userId: JSON.parse(localStorage.getItem('userinfo')).isd,
    //     officeId:that.idsstr,
    //     date:val
    //   }
    //   this.$ajax({
    //     method: "POST",
    //     url: that.globals.requesturl + 'web/index/problemsOfParameterYear',
    //     data: objs,
    //     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    //     transformRequest: [function (data) { 
    //       return qs.stringify(data)
    //     }]
    //   }).then(res=>{
    //     if(res.data.errorCode == "-1"){
    //       let chaertslist = res.data.body
    //       if(chaertslist.problemsOfParameterYearList.length > 0){
    //         let eightlist = [],eightname = [];
    //         chaertslist.problemsOfParameterYearList.map(function(list){
    //           eightname.push(list.date)
    //           eightlist.push({
    //             name: list.NAME,
    //             type: 'line',
    //             areaStyle: {
    //               color: '#53A8E2',
    //               opacity: 0.4
    //             },
    //             data: [list.number]
    //           })
    //         })
    //         this.eighthdataXline = eightname
    //         this.eighthSeries = eightlist
    //       }else{
    //         this.$message.error('暂无数据');
    //       }
    //     }else{
    //       this.$message.error(res.data.msg); 
    //     }
    //   })
    // },
    // //第九个图日期删选
    // ninemaps(val){
    //   let that = this;
    //   let objs = {
    //     userId: JSON.parse(localStorage.getItem('userinfo')).isd,
    //     officeId:that.idsstr,
    //     date:val
    //   }
    //   this.$ajax({
    //     method: "POST",
    //     url: that.globals.requesturl + 'web/index/jobLevel',
    //     data: objs,
    //     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    //     transformRequest: [function (data) { 
    //       return qs.stringify(data)
    //     }]
    //   }).then(res=>{
    //     if(res.data.errorCode == "-1"){
    //       let chaertslist = res.data.body
    //       if(chaertslist.jobLevelList.length > 0){
    //         let ninelist = [],ninename = [];
    //         chaertslist.jobLevelList.map(function(list){
    //           console.log(list)
    //           // ninename.push(list.jobLevel)
    //           let listnumbers = list.numbers
    //           ninelist.push({
    //             name: list.name,
    //             type: 'bar',
    //             barWidth: 20,
    //             stack: list.name,
    //             data: listnumbers
    //           })
    //         })
    //         this.dataBarFold = ninelist
    //         // this.dataXbarFold = ninename
    //       }else{
    //         this.$message.error('暂无数据');
    //       }
    //     }else{
    //       this.$message.error(res.data.msg); 
    //     }
    //   })
    // },
    // //第十个图日期删选
    // tenmaps(val){
    //   let that = this;
    //   let objs = {
    //     userId: JSON.parse(localStorage.getItem('userinfo')).isd,
    //     officeId:that.idsstr,
    //     date:val
    //   }
    //   this.$ajax({
    //     method: "POST",
    //     url: that.globals.requesturl + 'web/index/officeNumber',
    //     data: objs,
    //     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    //     transformRequest: [function (data) { 
    //       return qs.stringify(data)
    //     }]
    //   }).then(res=>{
    //     if(res.data.errorCode == "-1"){
    //       let chaertslist = res.data.body
    //       if(chaertslist.officeNumberList.length > 0){
    //         let tenlist = [];
    //         chaertslist.officeNumberList.map(function(list){
    //           tenlist.push({
    //             value: list.number,
    //             name: list.name,
    //           })
    //         })
    //         this.dataPreNoHollow = tenlist
    //       }else{
    //         this.$message.error('暂无数据');
    //       }
    //     }else{
    //       this.$message.error(res.data.msg); 
    //     }
    //   })
    // },
    // //第十一个图日期删选
    // elevenmaps(val){
    //   let that = this;
    //   let objs = {
    //     userId: JSON.parse(localStorage.getItem('userinfo')).isd,
    //     officeId:that.idsstr,
    //     date:val
    //   }
    //   this.$ajax({
    //     method: "POST",
    //     url: that.globals.requesturl + 'web/index/ageStructuralLayer',
    //     data: objs,
    //     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    //     transformRequest: [function (data) { 
    //       return qs.stringify(data)
    //     }]
    //   }).then(res=>{
    //     if(res.data.errorCode == "-1"){
    //       let chaertslist = res.data.body
    //       if(chaertslist.ageStructuralLayerList.length > 0){
    //         let elevenlist = [],elevenname=[];
    //         chaertslist.ageStructuralLayerList.map(function(list){
    //           // elevenname.push(list.ages+'岁')
    //           let listnumbers = list.numbers
    //           elevenlist.push({
    //             // name: list.NAME,
    //             name: list.name,
    //             type: 'line',
    //             areaStyle: {
    //               color: '#53A8E2',
    //               opacity: 0.4
    //             },
    //             data: listnumbers
    //           })
    //         })
    //         // this.lastdataXline = elevenname
    //         this.lastSeries = elevenlist
    //       }else{
    //         this.$message.error('暂无数据');
    //       }
    //     }else{
    //       this.$message.error(res.data.msg); 
    //     }
    //   })
    // },
  },
}
