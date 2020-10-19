export default {
    data(){
        return{
            username:"",
            projrecttitle:""
        }
    },
    mounted(){
        this.projrecttitle = localStorage.getItem('projrecttitle');
        this.username = JSON.parse(localStorage.getItem('userinfo')).names
    },
    methods:{
        // 页面跳转
        goLink(e){
            this.$router.push({path:e})
        }
    }
}