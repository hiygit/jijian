<template>
    <div  class="gendetecharts">
        <div id="gender" style="width: 35.1563vw; height: 15.625vw" ref='gender'></div>
    </div>
</template>

<script>
export default {
    name:'FoldLine',
    props:['dataBarFold','dataXbarFold'],
    data(){
        return {}
    },
    mounted(){
        this.drawLine();
    },
    watch:{
        dataBarFold(oldval,newval){
            this.drawLine();
        },
        dataXbarFold(oldval,newval){
            this.drawLine();
        },
    },
    methods:{
        drawLine(){
            var that = this;
            this.gender = this.$echarts.init(this.$refs.gender);
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
                        axisLine: {
                            lineStyle: {
                                color: "#E7EBEF"
                            }
                        },
                        axisLabel: {
                            fontSize: 14,
                            interval: 0,
                            // 解决Y轴文字过长的问题
                            formatter: function(value) {
                                if (value.length > 12) {
                                    return value.substring(0, 4) + "...";
                                } else {
                                    return value;
                                }
                            }
                        },
                        data: this.dataXbarFold
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            fontSize: 14
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#fff"
                            }
                        }
                    },
                    series: this.dataBarFold
                });
                // 设置自适应屏幕大小
                //window.onresize = myChart.resize;
                window.addEventListener("resize",function(){
                    that.gender.resize();
                });
            },
           
        }
}
</script>

<style lang="scss" scoped>
.gendetecharts{
    width: 450px;
    height: 190px;
    padding-top: 10px;
    .gendetecharts_echarts{
        width: 450px;
        height: 200px;
    }
}
</style>