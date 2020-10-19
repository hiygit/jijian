export default {
    props:['isDouble','nameList','arrList','datalist'],
    mounted(){
        this.drawLine();
    },
    watch:{
        nameList(oldval,newval){
            this.drawLine();
        },
        datalist(oldval,newval){
            this.drawLine();
        },
    },
    methods:{
        drawLine(){
            var that = this;
            this.gender = this.$echarts.init(this.$refs.gender);
            this.gender.setOption({
                    legend: {
                        left: 0,
                        itemGap : 11,
                        itemHeight: 16,
                        textStyle:{
                            color: '#fff',
                            lineHeight: 16
                        },
                        icon: 'circle',
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data: this.arrList,
                            axisLabel: {
                                show: true,
                                color:'#FFF',
                                interval: 0,
                                    // 解决Y轴文字过长的问题
                                    formatter: function(value) {
                                    if (value.length > 12) {
                                        return value.substring(0, 6) + "...";
                                    } else {
                                        return value;
                                    }
                                    }
                              },
                              axisLine: {
                                show: true,
                                lineStyle:{
                                  color:'#fff'
                                }
                              },
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLabel: {
                                show: true,
                                color:'#FFF',
                              },
                              axisLine: {
                                show: true,
                                lineStyle:{
                                  color:'#fff'
                                }
                              },
                        }
                    ],
                    series : [
                        {
                            name:this.nameList[0],
                            type:'bar',
                            data:this.datalist[0],
                            itemStyle:{
                                color:'#53A8E2'
                            }
                        },
                        this.isDouble && 
                        {
                            name:this.nameList[1],
                            type:'bar',
                            data:this.datalist[1],
                            itemStyle:{
                                color:'#2C82BE'
                            }
                        }
                    ]
                });
                // 设置自适应屏幕大小
                //window.onresize = myChart.resize;
                window.addEventListener("resize",function(){
                    that.gender.resize();
                });
            },
           
        }
       
    
}
