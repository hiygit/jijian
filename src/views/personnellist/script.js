import qs from 'qs'
export default {
  data(){
    return{
      loading:true,
      // disabled: false,
      // showinput: true, //工作单位查看时显示
      searchlist:true,//查询结果
      treelist:false,//树状图显示
      personnelpops:false,//调动弹框显示切换
      //搜索查询
      formInline:{
        user:"",
        region:""
      },
      currentRow: 2,//选中行数
      //表格数据
      tableData: [],
      //级联选择
      unitslist:[],
      unitvalue:"",
      value:"",
      //树状图
      datas: [],
      //树状图结构
      defaultProps: {
        children: 'children',
        label: 'label',
        value:"value",
        dex:""
      },
      sexlist:[],
      //人员信息
      peoplemsg:{
        times:'',
        oldunit:'',
        oldposition:'',
        newunit:'',
        newposition:'',
        handles:'',
        num:'',
        name: '',
        sex:'',
        age:'',
        id:''
      },
    }
  },
  created(){
    document.title = "人员调动记录"
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
    // 初始化
    init(objs){
      let that = this; 
      this.$ajax({
        method: "POST",
        url: that.globals.requesturl + 'web/personneltransfer/recordList',
        data: objs,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: [function (data) { 
          return qs.stringify(data)
        }]
      }).then(res=>{
        if(res.data.errorCode == "-1"){
          let lists = [];
          that.loading=false
          if(res.data.body.personnelTransferRecords.length != 0){
            res.data.body.personnelTransferRecords.map(function(list,index){
              lists.push({
                times:list.createDate,
                oldunit:list.officeName?list.officeName:"",
                // oldunit:list.office?list.office.name:"",
                oldposition:list.originalPosition,
                newunit:list.newOffice?list.newOffice:"",
                newposition:list.newOriginalPosition,
                handles:list.createBy.name,
                num:index+1 > 9?index+1:'0'+(index+1) ,
                name: list.personnel.name,
                sex:list.personnel.sex==that.sexlist[0].value?that.sexlist[0].label:that.sexlist[1].label,
                age:list.personnel.age,
                id:list.personnel.id,
                input:"",
              })
            })
          }
          that.tableData = lists
        }else{
          this.$message.error(res.data.msg); 
        }
      })
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
    //确定调动
    submitchangeunit(){
      let that = this;
      that.loading=true
      let querststr = {
        personnelId:that.peoplemsg.id,
        newOfficeId:that.unitvalue[that.unitvalue.length-1],
        newOriginalPosition:that.peoplemsg.input,
        userId:JSON.parse(localStorage.getItem('userinfo')).isd,
      };
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
          this.$message.success('调动成功'); 
          that.loading = false
          location.reload()
        }else{
          this.$message.error('调动失败'); 
        }
      })
    },
    //搜索提交按钮
    onSubmit(){
      let searchstr = {
        userId: JSON.parse(localStorage.getItem('userinfo')).isd,
        name:this.formInline.region
      }
      this.init(searchstr)
      this.treelist = false
      this.searchlist = true
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
    //表格行点击事件
    handleCurrentChange(val){
      console.log(val)
      this.currentRow = val;
      this.peoplemsg = {
        times:val.times,
        oldunit:val.oldunit,
        oldposition:val.oldposition,
        newunit:val.newunit,
        newposition:val.newposition,
        handles:val.handles,
        num:val.num,
        name: val.name,
        sex:val.sex,
        age:val.age,
        id:val.id,
        input:"",
      }
    },
    //导出
    educebtn(){
      let objs = {
        userId: JSON.parse(localStorage.getItem('userinfo')).isd,
        ids:''
      } 
      this.$ajax({
        method: "POST",
        url: this.globals.requesturl + 'web/personneltransfer/export',
        data: objs,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: [function (data) { 
          return qs.stringify(data)
        }]
      }).then(res=>{
        if(res.data.errorCode == "-1"){
          let url = res.data.body.path
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', '人员调动记录表')
          document.body.appendChild(link)
          link.click()
          this.$message.success(res.data.msg); 
        }else{
          this.$message.error(res.data.msg); 
        }
      })
    },
    //点击一行，背景色变化
    selectedHighlight({row, rowIndex}) {
      if ((this.getIndex) === rowIndex ) {      
        return {
          "background-color": "#025BFF"
        };
      }
    },
    tableRowClassName ({row, rowIndex}) {
      //把每一行的索引放进row
      row.index = rowIndex;
    },
    rowClick (row) {
      console.log(row,"row");
      this.getIndex=row.index
    },
    // 返回上一页
    goback(){
      this.$router.go(-1)
    }
  }
}