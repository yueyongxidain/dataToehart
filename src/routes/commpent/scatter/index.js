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
        let ydata = [];
        let y = 0
        let myChart = Echart.init(this.refs.charts);
        myChart.off('click')
        nextProps.data.map((ele) => {
            xdata.push(ele.key)
            ydata.push(ele.value)
            y < ele.value * 1 ? y = ele.value : y = y
        })
        let yAxisData = ydata.map((ele) => {
            return Math.abs(ele - y)
        })
        let option = {
            title: {
                text: ''
            },
            legend: {
                right: 10,
                data: ["评价"]
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
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                scale: true,
            },
            series: [{
                name: "item",
                data: ydata,
                type: 'scatter',
                symbolSize: function (ydata, params) {
                    return ydata / y < 0.5 ? (ydata / y + 0.5) * 90 : (ydata / y) * 90;
                },
                zlevel: 999,
                label: {
                    show: true,
                    formatter: '{b}\n{c}',
                    fontStyle: 'normal',
                    backgroundColor: 'rgba(0,23,11,0)',
                    fontSize: 16,
                    fontWeight: 'bold',
                    fontFamily: 'Arial'
                },
                itemStyle: {
                    normal: {
                        shadowBlur: 10,
                        shadowOffsetY: 5,
                        color: function (data) {
                            if (data.value > y)
                                return '#2775FF';
                            else
                                return '#00DCBF';
                        }
                    }
                }
            }]
        };

        myChart.setOption(option);
        myChart.on('click', function (params) {
            console.log('dddddddddd', params)
            nextProps.click(params.name)
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