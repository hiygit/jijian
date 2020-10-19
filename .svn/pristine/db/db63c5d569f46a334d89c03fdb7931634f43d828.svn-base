export default {
    props:['dataLine','dataXline','width'],
    mounted(){
        this.drawLine();
    },
    watch:{
        dataLine(oldval,newval){
            this.drawLine();
        },
        dataXline(oldval,newval){
            this.drawLine();
        },
    },
    methods:{
        drawLine(){
            var that = this;
            this.gender = this.$echarts.init(this.$refs.problemPeople);
            this.gender.setOption({
                    color: [ '#53A8E2','#fff','#2C82BE','#4FC8F1'],
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        left: 0,
                        itemGap : 11,
                        itemHeight: 16,
                        textStyle:{
                            color: '#fff',
                            lineHeight: 16
                        },
                        icon: 'circle'
                    },
                    grid: {
                        left: 50,
                        top: 50,
                        right: 20,
                        bottom: 35,
                        borderColor: '#E7EBEF',
                        
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        axisLine: {
                            lineStyle: {
                                color: "#1964A4"
                            }
                        },
                        axisTick: {
                            show: false
                        }, 
                        axisLabel: {
                            interval: 0,
                            fontSize: 14
                        },
                        data: this.dataXline
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            interval: 0,
                            fontSize: 14
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: "#fff"
                            }
                        }
                    },
                    series: this.dataLine
                });
                // 设置自适应屏幕大小
                //window.onresize = myChart.resize;
                window.addEventListener("resize",function(){
                    that.gender.resize();
                });
            },
           
        }
       
    
}
