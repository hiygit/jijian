export default {
    props:['titlePre','dataPre','isHollow'],
    mounted(){
        this.drawLine();
    },
    watch:{
        dataPre(oldval,newval){
            this.drawLine();
        }
    },
    methods:{
        drawLine(){
            var that = this;
            this.shape = this.$echarts.init(this.$refs.shape);
            this.shape.setOption({
                type:'pie',
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
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                // label:{
                //     normal:{
                //         show: true,
                //         position: 'inside',
                //         formatter: '{b},{d}%'
                //     }
                // },
                grid: {
                    left: 50,
                    top: 50,
                    right: 20,
                    bottom: 35,
                    borderColor: '#E7EBEF',
                    
                },
                // 颜色
                color: ['#fff', '#2C82BE', '#53A8E2','#4FC8F1','#1D2E78','#123E6B'],
                
                series: [
                    {
                        name:this.titlePre,
                        type: 'pie',
                        barWidth: 15,
                        label:{
                            show:false
                        },
                        labelLine:{
                            show:false
                        },
                        barGap: 0,
                        radius:!this.isHollow ? ['50%','70%'] : ['0%' ,'70%'],
                        data:this.dataPre
                    },
                ]
            });
            // 设置自适应屏幕大小
            //window.onresize = myChart.resize;
            window.addEventListener("resize",function(){
                
                that.shape.resize();
            });
            }
        }
       
    
}
