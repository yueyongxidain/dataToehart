import React, { Component } from 'react'
import Echart from 'echarts';
import { cloneDeep } from 'lodash';
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
        let yAxisData = Array(9)
        let y = 0;

        let length = nextProps.data.length || 0;
        let myChart = Echart.init(this.refs.charts);
        myChart.off('click')
        nextProps.data.map((ele) => {
            xdata.push(ele.key)
            y < ele.value * 1 ? y = ele.value : y = y
        })
        let temp = cloneDeep(nextProps.data)
        temp = temp.sort((a, b) => {
            if (a.value * 1 > b.value * 1) return -1
            if (a.value * 1 < b.value * 1) return 1
            else return 0
        })

        //峰值
        let k = 0;
        for (let i in temp) {
            if (i == 0) {
                yAxisData[4] = temp[i]
            }
            else {
                if (!!yAxisData[4 + k] && !!yAxisData[4 - k]) {
                    k++
                }
                yAxisData[4 + k * Math.pow(-1, i)] = temp[i]
            }
        }
        for (let i in yAxisData) {
            if (i == 4) {
                if (!!yAxisData[i].value) {
                    yAxisData[i].number = yAxisData[i].value
                    yAxisData[i].value = 12.5
                }

            }
            else {
                if (!!yAxisData[i].value) {
                    yAxisData[i].number = yAxisData[i].value
                    yAxisData[i].value = 12 + 5.5 * Math.pow(-1, i)
                }
            }
        }
        let res = []
        for (let i = 0; i < 9; i++) {
            if (!!yAxisData[i] && !!yAxisData[i].value && !!yAxisData[i].number && !!yAxisData[i].key) {
                if (i == 0) {
                    res.push([0.8, 8.5, yAxisData[i].number, yAxisData[i].key, i])
                }
                else if (i == 1) {
                    res.push([1.2, 16.5, yAxisData[i].number, yAxisData[i].key, i])
                }
                else if (i == 2) {
                    res.push([2.8, 18.5, yAxisData[i].number, yAxisData[i].key, i])
                }
                else if (i == 3) {
                    res.push([2.4, 7.5, yAxisData[i].number, yAxisData[i].key, i])
                }
                else if (i == 4) {
                    res.push([4.5, 12, yAxisData[i].number, yAxisData[i].key, i])
                }
                else if (i == 5) {
                    res.push([6.6, 16.5, yAxisData[i].number, yAxisData[i].key, i])
                }
                else if (i == 6) {
                    res.push([6.2, 5.5, yAxisData[i].number, yAxisData[i].key, i])
                }
                else if (i == 7) {
                    res.push([7.8, 8.5, yAxisData[i].number, yAxisData[i].key, i])
                }
                else if (i == 8) {
                    res.push([8.2, 16.5, yAxisData[i].number, yAxisData[i].key, i])
                }
                else {
                    res.push([k, yAxisData[i].value, yAxisData[i].number, yAxisData[i].key, i])
                }
            }
            else {
                res.push([])
            }
        }
        console.log('res', res)
        let option = {
            //-------------  grid区域  ----------------
            grid: {
                show: false,                 //---是否显示直角坐标系网格
                top: 80,
                left: 60,
                right: 40,
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
            large: true,
            xAxis: {
                show: false,
                splitNumber: 9,
                min: 0,
                max: 9,
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                scale: true,
            },
            yAxis: {
                show: false,
                max: 12 * 2,
            },
            series: [{
                name: "item",
                data: res,
                type: 'scatter',
                symbolSize: function (ydata, params) {
                    if (!!ydata) {
                        if (ydata[4] == 0) {
                            return 90
                        }
                        if (ydata[4] == 1) {
                            return 130
                        }
                        if (ydata[4] == 2) {
                            return 140
                        }
                        if (ydata[4] == 3) {
                            return 180
                        }
                        if (ydata[4] == 4) {
                            return 250
                        }
                        if (ydata[4] == 5) {
                            return 180
                        }
                        if (ydata[4] == 6) {
                            return 140
                        }
                        if (ydata[4] == 7) {
                            return 130
                        }
                        if (ydata[4] == 8) {
                            return 90
                        }
                    }
                },
                zlevel: 999,
                label: {
                    show: true,
                    formatter: (params) => {
                        return `${params.data[3]}\n${params.data[2]}`
                    },
                    offset:[0,6],
                    fontStyle: 'normal',
                    fontSize: 20,
                    fontWeight: 'bold',
                    fontFamily: 'Arial'
                },
                itemStyle: {
                    normal: {
                        color: function (params) {
                            if (!!params.data) {
                                if (params.data[4] == 0) {
                                    return '#00DCBF'
                                }
                                if (params.data[4] == 1) {
                                    return '#00CAD5'
                                }
                                if (params.data[4] == 2) {
                                    return '#00CAD5'
                                }
                                if (params.data[4] == 3) {
                                    return '#0098FF'
                                }
                                if (params.data[4] == 4) {
                                    return '#005FFC'
                                }
                                if (params.data[4] == 5) {
                                    return '#0098FF'
                                }
                                if (params.data[4] == 6) {
                                    return '#00CAD5'
                                }
                                if (params.data[4] == 7) {
                                    return '#00CAD5'
                                }
                                if (params.data[4] == 8) {
                                    return '#00DCBF'
                                }
                            }
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
            nextProps.click(params.data[3])
            for (let i = 0; i < length; i++) {
                myChart.dispatchAction({ type: 'downplay', seriesIndex: 0, dataIndex: i });//设置默认选中高亮部分
            }
            myChart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: params.dataIndex });//设置默认选中高亮部分
        });
        myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: 4
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