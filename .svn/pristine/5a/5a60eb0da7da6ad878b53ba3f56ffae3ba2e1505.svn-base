export default {
    props:['navtabActive'],
    data(){
        return{
            // 导航栏标记
            navtab: this.navtabActive ||'1'
        }
        
    },
    methods: {
        updatetab(row){
            this.navtab = row
            // 线索台账
            if(row==3){
                this.$router.push({path:'/StandBook'})
            }else if (row==1){
                this.$router.push({path:'/Home'})
            }else if(row==2){
                // 人员台账
                this.$router.push({path:'/StandingBook'})
            }else if(row==4){
                this.$router.push({path:'/problemstandbook'})
            }
        }
    },
    mounted(){
        
    }
}
