import React, { Component } from 'react'
import { connect } from 'dva';
import { Card, Form } from 'antd';
import Echart from 'echarts';
import {cloneDeep} from 'lodash';
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
        let yAxisData = []
        let y = 0;

        let length = nextProps.data.length || 0;
        let myChart = Echart.init(this.refs.charts);
        myChart.off('click')
        nextProps.data.map((ele) => {
            xdata.push(ele.key)
            y < ele.value * 1 ? y = ele.value : y = y
        })
        let temp = cloneDeep( nextProps.data)
        temp=temp.sort((a, b) => {
            if (a.value*1 > b.value*1) return -1
            if (a.value*1 < b.value*1) return 1
            else return 0
        })
       
        //峰值
        let k=0;
        for(let i in temp){
           if(i==0){
                yAxisData[parseInt(length / 2)] = temp[i]
           }
           else{
               if(!!yAxisData[parseInt(length / 2)+ k]&&!!yAxisData[parseInt(length / 2)- k]){
                   k++
               }
            yAxisData[parseInt(length / 2)+ k*Math.pow(-1,i)]=temp[i]
           }
        }
        for(let i in yAxisData){
            if(i==parseInt(length / 2)){
                yAxisData[i].number=yAxisData[i].value
                yAxisData[i].value =  10
            }
            else{
                yAxisData[i].number=yAxisData[i].value
                yAxisData[i].value =  10 + 4*Math.pow(-1,i)
            }
        }
        let index =0
        let option = {
             //-------------  grid区域  ----------------
             grid: {
                show: false,                 //---是否显示直角坐标系网格
                top: 80,
                left: 220,
                right: 220,    
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
            xAxis: {
                show: false,
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                data: xdata,//内容
            },
            yAxis: {
                show: false,
                type: 'value',
                max:10*1.8,
            },
            series: [{
                name: "item",
                data: yAxisData,
                type: 'scatter',
                symbolSize: function (ydata, params) {
                    return params.data.number / y < 0.47 ? (params.data.number / y) * 350 : (params.data.number / y) * 150;
                },
                zlevel: 999,
                label: {
                    show: true,
                    formatter: (params)=>{
                       return `${params.data.key}\n${params.data.number}`
                    },
                    fontStyle: 'normal',
                    fontSize: 16,
                    fontWeight: 'bold',
                    fontFamily: 'Arial'
                },
                itemStyle: {
                    normal: {
                        shadowBlur: 10,
                        shadowOffsetY: 5,
                        color: function (data) {
                            if (data.data.number>y*0.8)
                                return '#2774FE';
                            if (data.data.number>y*0.5)
                                return  '#0097EE';
                            if(data.data.number>y*0.2)
                                return  '#00B3C1';
                            else
                                return '#00DCC0';
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowColor: 'rgba(255,255,255,0.5)'
                    }
                }
            }]
        };

        myChart.setOption(option);
        myChart.on('click', function (params) {
            debugger
            nextProps.click(params.data.key)
            for(let i =0;i<length;i++){
                myChart.dispatchAction({type: 'downplay',seriesIndex: 0,dataIndex: i});//设置默认选中高亮部分
            }
            myChart.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex: params.dataIndex});//设置默认选中高亮部分
        });
        myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: parseInt(length/2)
        });
        
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