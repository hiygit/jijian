import qs from 'qs'
export default {
  data() {
    return {
        projectName:"",
        loginform:{
            username:"",
            password:""
        }
    }
  },
  created() {
    document.title = "登录"
  },
  mounted(){
      if(localStorage.getItem("projrecttitle")){
          this.projectName = localStorage.getItem('projrecttitle')
      }else{
        this.init();
      }
  },
  methods: {
    // 去首页
    tohome() {
        if(this.loginform.username == ""){
            this.$message.error("请填写登录账号");
        }else if(this.loginform.password == ""){
            this.$message.error("请填写登录密码");
        }else{
            let formdata = this.loginform
            this.$ajax({
              method: "post",
              url: this.globals.requesturl+'web/login',
              data: formdata,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: [function (data) { 
                    return qs.stringify(data)
                }]
            }).then(res=>{
                console.log(res)
                if(res.data.errorCode == "-1"){
                    let usermsg = {
                        names:res.data.body.name,
                        isd:res.data.body.userId
                    }
                    localStorage.setItem('userinfo',JSON.stringify(usermsg))
                    this.$router.push('/home')
                }else{
                    this.$message.error(res.data.msg); 
                }
            })
        }
    },
    //获取项目名称
    init() {
        this.$ajax.post(this.globals.requesturl + 'web/loginBefore').then(res=>{
            if(res.data.errorCode == "-1"){
                this.projectName = res.data.body.projectTitleSetting.title
                localStorage.setItem('projrecttitle',res.data.body.projectTitleSetting.title)
            }else{
                this.$message({
                    message: res.data.msg,
                    center: true
                });
            }
        })
    },
  }
}
