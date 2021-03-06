import React, { Component } from 'react'
import { connect } from 'dva';
import { Card, Form } from 'antd';
import Echart from 'echarts';
import './index.less'
class Index extends Component {
    constructor(props) {
        super(props)
        this.resizeBind = this.resizeTTY.bind(this)
        this.state = {
            data: this.props.data || []
        }
    }
    componentWillReceiveProps = (nextProps) => {
        let xdata = [];
        let gao = [];
        let zhong = [];
        let di = [];
        let min = 0
        nextProps.gao.map((ele) => {
            xdata.push(ele.key)
            gao.push(ele.value)
        })
        nextProps.zhong.map((ele) => {
            zhong.push(ele.value)
        })
        nextProps.di.map((ele) => {
            di.push(ele.value)
        })
        let { btngao, btnzhong, btndi } = nextProps
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
                top: 80,
                left: 60,
                right: 20,
                bottom: 25,                 //---相对位置，top\bottom\left\right  
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
                boundaryGap: true,
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
                    interval: 0,
                    lengt: 3,                    //---长度
                    lineStyle: {
                        width: 1,
                        type: 'solid',
                    },
                },
                axisLabel: {                 //---坐标轴 标签
                    show: true,                  //---是否显示
                    inside: true,               //---是否朝内
                    interval: 0,
                    rotate: 0,                   //---旋转角度   
                    margin: 8,                  //---刻度标签与轴线之间的距离
                    //color:,             //---默认取轴线的颜色
                    fontSize: 14,
                },
                splitLine: {                 //---grid 区域中的分隔线
                    show: true,                 //---是否显示，'category'类目轴不显示，此时我的X轴为类目轴，splitLine属性是无意义的
                    interval: 0,
                    lineStyle: {
                        //color:'red',
                        //width:1,
                        //type:'solid',
                    },
                },
                splitArea: {                 //--网格区域
                    show: false,                 //---是否显示，默认false
                },
                data: xdata,//内容
            },
            //----------------------  y轴  ------------------------
            yAxis: {
                show: true,                  //---是否显示
                position: 'left',            //---y轴位置
                offset: 0,                   //---y轴相对于默认位置的偏移
                min: function (value) {
                    min = value.min
                    if (value.min < 0) {
                        return value.min - (value.max * 1.1 / 9).toFixed(2);

                    }
                    return -(value.max * 1.1 / 9).toFixed(2);
                },
                max: function (value) {
                    return (value.max * 1.1).toFixed(2);
                },
                splitNumber: 10,
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
                    splitNumber: 15,
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
                    color: function (value, index) {
                        let minvalues = min
                        if (minvalues > 0) minvalues = 0
                        return value - minvalues >= 0 ? '#fff' : '#1C2128';
                    },
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
                    name: '高端手机',             //---系列名称
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
                            color: '#004EFF',
                            barBorderRadius: [5, 5, 5, 5],
                        },
                    },
                    barWidth: '10%',              //---柱形宽度
                    barCategoryGap: '20%',       //---柱形间距
                    data: btngao != 0 ? gao : []
                },
                {
                    name: '中端手机',             //---系列名称
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
                            color: '#00FFCC',
                            barBorderRadius: [5, 5, 5, 5],
                        },
                    },
                    barWidth: '10%',              //---柱形宽度
                    barCategoryGap: '20%',       //---柱形间距
                    data: btnzhong != 0 ? zhong : []
                },
                {
                    name: '低端手机',             //---系列名称
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
                            color: '#FF8600',
                            barBorderRadius: [5, 5, 5, 5],
                        },
                    },
                    barWidth: '10%',              //---柱形宽度
                    barCategoryGap: '20%',       //---柱形间距
                    data: btndi != 0 ? di : []
                }
            ]
        };
        let myChart = Echart.init(this.refs.charts);
        myChart.setOption(option);
    }
    componentDidMount = () => {
        window.addEventListener('resize', this.resizeBind)
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeBind)
    }
    resizeTTY = () => {
        let myChart = Echart.init(this.refs.charts);
        myChart.resize()
    }
    render() {
        return (
            <div ref='charts' className='bar'>

            </div>
        )
    }
}
export default Index