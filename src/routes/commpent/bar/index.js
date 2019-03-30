import React, { Component } from 'react'
import { connect } from 'dva';
import { Card, Form } from 'antd';
import Echart from 'echarts';
import './index.less'
class Index extends Component {
    componentDidMount = () => {
        let option = {
            //--------------   提示框 -----------------
            tooltip: {
                show: true,                  //---是否显示提示框,默认为true
                trigger: 'item',             //---数据项图形触发
                axisPointer: {               //---指示样式
                    type: 'shadow',
                    axis: 'auto',

                },
                padding: 5,
                textStyle: {                 //---提示框内容样式
                    color: "#fff",
                },
            },

            //-------------  grid区域  ----------------
            grid: {
                show: true,                 //---是否显示直角坐标系网格
                top: 80,                     //---相对位置，top\bottom\left\right  
                containLabel: false,         //---grid 区域是否包含坐标轴的刻度标签
                tooltip: {                   //---鼠标焦点放在图形上，产生的提示框
                    show: true,
                    trigger: 'item',         //---触发类型
                    textStyle: {
                        color: '#666',
                    },
                }
            },
            //-------------   x轴   -------------------
            xAxis: {
                show: true,                  //---是否显示
                position: 'bottom',          //---x轴位置
                offset: 0,                   //---x轴相对于默认位置的偏移
                type: 'category',            //---轴类型，默认'category'
                /*name:'月份', */             //---轴名称
                nameLocation: 'end',         //---轴名称相对位置
                nameTextStyle: { //---坐标轴名称样式
                    color: "#fff",
                    padding: [5, 0, 0, -5], //---坐标轴名称相对位置
                },
                nameGap: 15,                 //---坐标轴名称与轴线之间的距离
                //nameRotate:270,           //---坐标轴名字旋转
                axisLine: {                  //---坐标轴 轴线
                    show: false,                  //---是否显示
                    //------------------- 箭头 -------------------------
                    symbol: ['none', 'arrow'],   //---是否显示轴线箭头
                    symbolSize: [8, 8],         //---箭头大小
                    symbolOffset: [0, 7],         //---箭头位置
                    //------------------- 线 -------------------------
                    lineStyle: {
                        color: '#fff',
                        width: 1,
                        type: 'solid',
                    },
                },
                axisTick: {                  //---坐标轴 刻度
                    show: true,                  //---是否显示
                    inside: true,                //---是否朝内
                    lengt: 3,                    //---长度
                    lineStyle: {
                        //color:'red',          //---默认取轴线的颜色
                        width: 1,
                        type: 'solid',
                    },
                },
                axisLabel: {                 //---坐标轴 标签
                    show: true,                  //---是否显示
                    inside: false,               //---是否朝内
                    rotate: 0,                   //---旋转角度   
                    margin: 5,                  //---刻度标签与轴线之间的距离
                    //color:,             //---默认取轴线的颜色
                },
                splitLine: {                 //---grid 区域中的分隔线
                    show: true,                 //---是否显示，'category'类目轴不显示，此时我的X轴为类目轴，splitLine属性是无意义的
                    lineStyle: {
                        //color:'red',
                        //width:1,
                        //type:'solid',
                    },
                },
                splitArea: {                 //--网格区域
                    show: false,                 //---是否显示，默认false
                },
                data: ["包装清单", "尺寸变量", "处理器", "存储", "电池", "服务", "感应器", "价格", "耐用性", "拍摄", "屏幕", "数据连接", "外观", "系统", "音频视频"],//内容
            },
            //----------------------  y轴  ------------------------
            yAxis: {
                show: true,                  //---是否显示
                position: 'left',            //---y轴位置
                offset: 0,                   //---y轴相对于默认位置的偏移
                type: 'value',           //---轴类型，默认'category'
                /*name:'销量',*/              //---轴名称
                nameLocation: 'end',         //---轴名称相对位置value
                nameTextStyle: {             //---坐标轴名称样式
                    color: "#fff",
                    padding: [5, 0, 0, 5],  //---坐标轴名称相对位置
                },
                nameGap: 15,                 //---坐标轴名称与轴线之间的距离
                //nameRotate:270,           //---坐标轴名字旋转
                axisLine: {                  //---坐标轴 轴线------------>销量
                    show: true,                  //---是否显示
                    //------------------- 箭头 -------------------------
                    symbol: ['none', 'arrow'],   //---是否显示轴线箭头
                    symbolSize: [8, 8],         //---箭头大小
                    symbolOffset: [0, 7],         //---箭头位置
                    //------------------- 线 -------------------------
                    lineStyle: {
                        color: '#fff',
                        width: 1,
                        type: 'solid',
                    },
                },
                axisTick: {                  //---坐标轴 刻度
                    show: true,                  //---是否显示
                    inside: true,                //---是否朝内
                    lengt: 3,                    //---长度
                    lineStyle: {
                        //color:'red',          //---默认取轴线的颜色
                        width: 1,
                        type: 'solid',
                    },
                },
                axisLabel: {                     //---坐标轴 标签
                    show: true,                  //---是否显示
                    inside: false,               //---是否朝内
                    rotate: 0,                   //---旋转角度   
                    margin: 8,                  //---刻度标签与轴线之间的距离
                    //color:'red',              //---默认取轴线的颜色
                },
                splitLine: {                     //---grid 区域中的分隔线
                    show: false,                  //---是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
                    lineStyle: {
                        color: '#666',
                        width: 1,
                        type: 'dashed',          //---类型
                    },
                },
                splitArea: {                     //--网格区域
                    show: false,                 //---是否显示，默认false
                }
            },
            //------------ 内容数据  -----------------
            series: [
                {
                    name: '销量',             //---系列名称
                    type: 'bar',                //---类型
                    legendHoverLink: true,       //---是否启用图例 hover 时的联动高亮
                    label: {                     //---图形上的文本标签
                        show: false,
                        position: 'insideTop',   //---相对位置
                        rotate: 0,               //---旋转角度
                        color: '#eee',
                    },
                    itemStyle: {                 //---图形形状
                        /*color:'red',
                        barBorderRadius:[18,18,0,0],*/
                        normal: {
                            color: function (params) {
                                return new Echart.graphic.LinearGradient(0, 0, 0, 1,
                                    [
                                        { offset: 0, color: '#004EFF' },
                                        { offset: 1, color: '#00FFDE' }
                                    ]);
                            },
                            barBorderRadius: [5, 5, 0, 0],
                        },
                    },
                    barWidth: '20',              //---柱形宽度
                    barCategoryGap: '20%',       //---柱形间距
                    data: [3020, 4800, 3600, 6050, 4320, 6200, 5050, 7200, 4521, 6700, 8000, 5020, 1000, 500, 200]
                }
            ]
        };
        let myChart = Echart.init(this.refs.charts);
        myChart.setOption(option);
    }
    render() {
        return (
            <div ref='charts' className='bar'>

            </div>
        )
    }
}
export default Index