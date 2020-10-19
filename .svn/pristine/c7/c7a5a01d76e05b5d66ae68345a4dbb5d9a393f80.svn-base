import qs from 'qs'
export default {
  data(){
    return{
      loading:true,
      disabled: false,
      showinput: true, //工作单位查看时显示
      searchlist:true,//查询结果
      treelist:false,//树状图显示
      personnelpops:false,//调动弹框显示切换
      radioTreaty: "1", //调动单选按钮 内部 外部单位
      //搜索查询
      formInline:{
        user:"",
        region:""
      },
      //表格数据
      tableData: [],
      //级联选择
      unitslist:[],
      unitvalue:"",
      //树状图
      datas: [],
      //树状图结构
      defaultProps: {
        children: 'children',
        label: 'label',
        value:"value",
        dex:""
      },
      sexlist:[],//性别数组
      //人员信息
      peoplemsg:{
        name:"",
        age:"",
        sex:"",
        units:"", //单位名称 选择框
        duty:"",
        input:"",
        id:"",
        officeimport:"",//单位名称 输入框
      },
      units:true,
      officeimport:false,
      vals: ""
    }
  },
  created(){
    document.title = "人员调动"
    let that = this;
    //性别
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
  mounted(){
    let objs = {
      userId: JSON.parse(localStorage.getItem('userinfo')).isd,
      name:""
    } 
    this.init(objs);
    this.initunits();
    this.treelistarr();
  },
  methods:{
    changes(val){
      this.vals = val
      // console.log(this.vals)
      if(this.vals == 1){
        this.units = true
        this.officeimport = false
        this.unitvalue = ""
      }else if(this.vals == 2){
        this.officeimport = true
        this.units = false
        this.unitvalue = ""
      }
    },
    // 树状图
    treelistarr(){
      let that = this; 
      let objs = {
        userId: JSON.parse(localStorage.getItem('userinfo')).isd,
      } 
      this.$ajax({
        method: "POST",
        url: that.globals.requesturl + 'web/office/findAllOffices',
        data: objs,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: [function (data) { 
          return qs.stringify(data)
        }]
      }).then(res=>{
        if(res.data.errorCode == "-1"){
          that.treedata = res.data.body.data
        }else{
          this.$message.error(res.data.msg); 
        }
      })
    },
    // 初始化
    init(objs){
      let that = this; 
      this.$ajax({
        method: "POST",
        url: that.globals.requesturl + 'web/personnel/list',
        data: objs,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: [function (data) { 
          return qs.stringify(data)
        }]
      }).then(res=>{
        if(res.data.errorCode == "-1"){
          console.log(res.data)
          let lists = [];
          that.loading=false
          res.data.body.personnelList.map(function(list,index){
            if(list.externalPersonnelUnit == "" || list.externalPersonnelUnit == undefined){
              lists.push({
                num:index+1 > 9?index+1:'0'+(index+1),
                name: list.name,
                sex:list.sex==that.sexlist[0].value?that.sexlist[0].label:that.sexlist[1].label,
                age:list.age,
                unit:list.office?list.officeName:"已调离外部单位",
                // unit:list.office?list.office.name:"已调离外部单位",
                position:list.presentOccupation,//职务
                id:list.id
              })
            }else{
              lists.push({
                num:index+1 > 9?index+1:'0'+(index+1) ,
                name: list.name,
                sex:list.sex==that.sexlist[0].value?that.sexlist[0].label:that.sexlist[1].label,
                age:list.age,
                unit:list.externalPersonnelUnit,
                position:list.presentOccupation,//职务
                id:list.id
              })
            }
          })
          that.tableData = lists
        }else{
          this.$message.error(res.data.msg); 
        }
      })
    },
    //调动
    diaodong(row){
      console.log(row)
      this.personnelpops = true
      this.peoplemsg = {
        name:row.name,
        age:row.age,
        sex:row.sex,
        units:row.unit,
        duty:row.position,
        id:row.id,
        input:this.peoplemsg.input
      }
    },
    //确定调动
    submitchangeunit(){
      let that = this;
      that.loading=true
      console.log(this.vals)
      let querststr = {
        personnelId:that.peoplemsg.id,
        newOfficeId:that.vals == 2 ? that.unitvalue : that.unitvalue[that.unitvalue.length-1],
        newOriginalPosition:that.peoplemsg.input,
        userId:JSON.parse(localStorage.getItem('userinfo')).isd,
      };
      console.log(querststr)
      this.$ajax({
        method: "POST",
        url: that.globals.requesturl + 'web/personneltransfer/transfer',
        data: querststr,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: [function (data) { 
          return qs.stringify(data)
        }]
      }).then(res=>{
        if(res.data.success || res.data.errorCode == -1){
          that.personnelpops = false
          that.loading=false
          this.$message.success(res.data.msg); 
          let objs = {
            userId: JSON.parse(localStorage.getItem('userinfo')).isd,
            name:""
          } 
          this.init(objs);
        }else{
          this.$message.error(res.data.msg); 
        }
      })
    },
    //级联事件
    unitChanges(data) {
      let that = this;
      let objs = {
        userId: JSON.parse(localStorage.getItem("userinfo")).isd,
        parentId: data[data.length - 1]
      };
      this.$ajax({
        method: "POST",
        url: that.globals.requesturl + "web/office/getChildren",
        data: objs,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        transformRequest: [
          function(data) {
            return qs.stringify(data);
          }
        ]
      }).then(res => {
        if (res.data.errorCode == "-1") {
          that.showinput = false
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
                      children: list.hasChildren == false ? "" : []
                    };
                  });
                }
              }
            });
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
                          children: list.hasChildren == false ? "" : []
                        };
                      });
                    }
                  }
                });
              }
            });
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
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    handleChange(value) {
      console.log(value)
    },
    // 查询单位
    initunits(){
      let that = this;
      let objs = {
        userId: JSON.parse(localStorage.getItem("userinfo")).isd
      };
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
        if (res.data.errorCode == "-1") {
          let lists = [];
          that.unitslist = res.data.body.officeList.map(function(list, index) {
            return {
              id: list.id,
              name: list.name,
              children: []
            };
          });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //搜素提交按钮
    onSubmit(){
      let searchstr = {
        userId: JSON.parse(localStorage.getItem('userinfo')).isd,
        name:this.formInline.region
      }
      this.init(searchstr)
      this.treelist = false
      this.searchlist = true
    },
    //树状图选择
    handleNodeClick(data,node,resolve) {
      let that = this; 
      if(node.childNodes.length == 0){
        that.treelist = false
        that.searchlist = true
        let objs = {
          userId: JSON.parse(localStorage.getItem('userinfo')).isd,
          officeId:node.id
        } 
        this.$ajax({
          method: "POST",
          url: that.globals.requesturl + 'web/personnel/index',
          data: objs,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: [function (data) { 
            return qs.stringify(data)
          }]
        }).then(res=>{
          if(res.data.errorCode == "-1"){
            let lists = [];
            res.data.body.personnels.map(function(list,index){
              lists.push({
                num:index+1 > 9?index+1:'0'+(index+1) ,
                name: list.name,
                sex:list.sex==0?'男':'女',
                age:list.age,
                unit:list.office.name,
                position:list.presentOccupation,
                id:list.id
              })
            })
            that.tableData = lists
          }else{
            this.$message.error(res.data.msg); 
          }
        })
      }
    },
    //显示树状图
    treelistbtn(){
      this.treelist = true
      this.searchlist = false
    },
    //新增
    addifon(){this.$router.push({path:"/addInfo",query:{updatas:0}})},
    //查看详情
    lookparticulars(row){
      let id = row.id
      this.$router.push({path:"/AddInfo",query:{id:id,updatas:1}})
    },
    //返回上一页
    goback(){
      this.$router.go(-1)
    }
  }
}