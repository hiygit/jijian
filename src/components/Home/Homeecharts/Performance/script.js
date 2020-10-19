export default {
    props:['threenames','threedata'],
    mounted(){
        this.drawLine();
    },
    watch:{
      threenames(oldval,newval){
          this.drawLine();
      },
      threedata(oldval,newval){
          this.drawLine();
      },
    },
    methods:{
        drawLine(){
            var that = this;
            this.gender = this.$echarts.init(this.$refs.performance);
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
                tooltip: {
                  show: true,
                  trigger:'axis',
                  axisPointer:{type:'none'},
                  formatter: "{b}:{c}%"
                },
                grid: {
                  top: '0',
                  left: '-15%',
                  right: '4.75%',
                  bottom: '0',
                  containLabel: true
                },
                yAxis: [{
                  type: 'category',
                  data: that.threenames,
                  inverse: true,
                  axisTick: {
                    show: false
                  },
                  axisLabel: {
                    color: '#fff',
                    interval:0,
                    margin:100,
                    textStyle: {
                      align:'left',
                      baseline:'middle'
                  },
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
                    show: false
                  }
                }],
                xAxis: [{
                  type: 'value',
                  axisLabel: {
                    show: true,
                    color:'#FFF',
                    formatter: '{value} %'
                  },
                  axisLine: {
                    show: true,
                    lineStyle:{
                      color:'#fff'
                    }
                  },
                  splitLine: {
                    show: false
                  }
                }],
                series: [{
                  type: 'bar',
                  barWidth: 14,
                  data: that.threedata[0],
                  label: {
                    normal: {
                      show: false,
                      position: 'insideBottomRight',
                      formatter: '{c}%',
                      distance: 0,
                      offset: [30, -20],
                      color: '#fff',
                      fontSize: 16,
                      padding: [5, 15, 5, 15]
                    }
                  },
                  itemStyle: {
                    normal: {
                      color:  '#53A8E2',
                      barBorderRadius: 14
                    }
                  }
                }, {
                  type: "bar",
                  barWidth: 14,
                  xAxisIndex: 0,
                  barGap: "-100%",
                  data: that.threedata[1],
                  itemStyle: {
                    normal: {
                      color: "#fff",
                      barBorderRadius: 14
                    }
                  },
                  zlevel: -1
                }]
                });
                // 设置自适应屏幕大小
                //window.onresize = myChart.resize;
                window.addEventListener("resize",function(){
                    that.gender.resize();
                });
            },

        }


}
