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
        let res = Array(9)
        for (let i = 0; i < 9; i++) {
            if (!!yAxisData[i]&&!!yAxisData[i].value && !!yAxisData[i].number && !!yAxisData[i].key) {
                if (i == 0) {
                    res.push([2.5, 7.5, yAxisData[i].number, yAxisData[i].key])
                }
                else if (i == 1) {
                    res.push([2.8, 16.5, yAxisData[i].number, yAxisData[i].key])
                }
                else if (i== 2) {
                    res.push([3.8, 18.5, yAxisData[i].number, yAxisData[i].key])
                }
                else if (i == 3) {
                    res.push([3.6, 7.5, yAxisData[i].number, yAxisData[i].key])
                }
                else if (i == 4) {
                    res.push([5, 12, yAxisData[i].number, yAxisData[i].key])
                }
                else if (i == 5) {
                    res.push([6.6, 15.5, yAxisData[i].number, yAxisData[i].key])
                }
                else if (i == 6) {
                    res.push([6.2, 5.5, yAxisData[i].number, yAxisData[i].key])
                }
                else if (i == 7) {
                    res.push([7.2, 8.5, yAxisData[i].number, yAxisData[i].key])
                }
                else if (i == 8) {
                    res.push([7.6, 19.5, yAxisData[i].number, yAxisData[i].key])
                }
                else {
                    res.push([k, yAxisData[i].value, yAxisData[i].number, yAxisData[i].key])
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
                left: 0,
                right: 100,
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
                    console.log('data:0', ydata)
                    let indexSize = temp.findIndex((ele) => {
                        if (!!params.data)
                            return ele.number == params.data[2]
                        else {
                            return -1
                        }
                    })
                    console.log('index', indexSize)
                    if (indexSize == 0) {
                        return 200
                    }
                    if (indexSize < 3 && indexSize > 0) {
                        return 150
                    }
                    if (indexSize < 5 && indexSize >= 3) {
                        return 130
                    }
                    else {
                        return 90
                    }
                },
                zlevel: 999,
                label: {
                    show: true,
                    formatter: (params) => {
                        console.log('papa:', params.data)
                        return `${params.data[3]}\n${params.data[2]}`
                    },
                    fontStyle: 'normal',
                    fontSize: 16,
                    fontWeight: 'bold',
                    fontFamily: 'Arial'
                },
                itemStyle: {
                    normal: {
                        color: function (params) {
                            let indexSize = temp.findIndex((ele) => {
                                if (!!params.data) {
                                    return ele.number == params.data[2]
                                }
                                else {
                                    return -1
                                }
                            })
                            if (indexSize == 0) {
                                return '#005FFC'
                            }
                            if (indexSize < 3 && indexSize > 0) {
                                return '#007FF6'
                            }
                            if (indexSize < 5 && indexSize >= 3) {
                                return '#00B0EC'
                            }
                            else {
                                return '#00C2D7'
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