export default {
  data() {
    return {
      options: [],
      yeardata: '',
      monthoptions: [],
      monthdata: ""
    }
  },
  mounted() {
    var myDate = new Date();
    var startYear = myDate.getFullYear() - 50; //起始年份 
    var endYear = myDate.getFullYear() + 50; //结束年份 
    this.monthdata = parseInt(myDate.getMonth())+1>9? (parseInt(myDate.getMonth())+1)+'月':'0'+(parseInt(myDate.getMonth())+1)+'月'
    for (var i = startYear; i <= endYear; i++) {
      this.options.push(i)
    }
    this.yeardata = myDate.getFullYear();
    for (var i = 1; i < 13; i++) {
      this.monthoptions.push(i + "月")
    }
  },
  methods:{
    selectyear(val){
      let datestr = val + '-' + parseInt(this.monthdata)
        this.$emit('selectyear',datestr)
    },
    selectmonth(val){
      let datestr = this.yeardata + '-' + parseInt(val)
        this.$emit('selectyear',datestr)
    },
  },
}
