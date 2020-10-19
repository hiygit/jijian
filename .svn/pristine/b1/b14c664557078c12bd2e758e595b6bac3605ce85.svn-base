import qs from 'qs'
import transfer from '@/components/Home/transfer.js'
export default {
  data() {
    return {
      commission: "", //代办事项
      // 单位参数
      companydata: [],
      // 标记是否全选
      checkedall: true,
      // allunits:"",//单位数量
      officeCount:"",//直属单位数量
      orgCount:"",//内设机构数量
    }
  },
  mounted() {
    let objs = {
      userId: JSON.parse(localStorage.getItem('userinfo')).isd,
      officeId:""
    }
    this.init(objs)
    let allnum = {officeId:""}
    this.allunitsfun(allnum)
  },
  methods: {
    // 选择单位
    selunit(item){
      let that = this; 
      let idsarr = item.id;
      this.companydata.map(function(list){
        list.checkedstate = false
      })
      item.checkedstate = true
      // transfer.$emit('unitids',idsarr)
      let allnum = {officeId:idsarr}
      this.allunitsfun(allnum)
    },
    // 全选单位
    allcompanychecked() {
      if (this.checkedall) {
        this.companydata.map(item => {
          item.checkedstate = false;
        })
      } else {
        this.companydata.map(item => {
          item.checkedstate = true;
        })
      }
      let idsarr = [];
      this.companydata.map(function(list){
        if(list.checkedstate){
          idsarr.push(list.id)
        }
      })
      // transfer.$emit('allunitids',idsarr.join())
      let allnum = {officeId:""}
      this.allunitsfun(allnum)
    },
    //首页跳转链接
    handleGolink(e) {
      this.$router.push({
        path: e
      })
    },
    //页面初始化
    init(objs) {
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
            let objlist = res.data.body; 
            that.commission = objlist.totalBacklog
            let officeList = objlist.officeList;
            officeList.map(function(list){
                list.checkedstate = true
            })
            that.companydata = officeList
          }
      })
    },
    //获取单位数量
    allunitsfun(obj){
      let that = this; 
      this.$ajax({
        method: "POST",
        url: that.globals.requesturl + 'web/index/getChildOfficeNumber',
        data: obj,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: [function (data) { 
          return qs.stringify(data)
        }]
      }).then(res=>{
          if(res.data.errorCode == "-1"){
            // that.allunits = res.data.body.number
            that.officeCount = res.data.body.officeCount
            that.orgCount = res.data.body.orgCount
          }
      })
    },
  },
  watch: {
    companydata: {
      handler(newVal, oldVal) {
        this.checkedall = true;
        this.companydata.map(item => {
          if (!item.checkedstate) {
            this.checkedall = false;
          }
        })
      },
      deep: true
    }
  }
}
