import React, { Component } from 'react'
import Echart from 'echarts';
import './index.less'
import { cloneDeep } from 'lodash'
class Index extends Component {
    constructor(props) {
        super(props)
        this.resizeBind = this.resizeTTY.bind(this)

    }
    componentWillReceiveProps = (nextProps) => {
        let data = cloneDeep(nextProps.data)
        let item = nextProps.item
        let index = !!nextProps.index ? true : false
        data.sort((a, b) => {
            if (a.value > b.value) return -1
            if (a.value < b.value) return 1
            else return 0
        })
        let title = data.length > 3 ? item > 0 ? data[item - 1].key : data[data.length + item].key : ''
        let num = data.length > 3 ? item > 0 ? data[item - 1].value : data[data.length + item].value : ''
        let option = {
            tooltip: {
                show: false,
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },

            color: {
                colorStops: index ? [{
                    offset: 0, color: '#ffffff' // 0% 处的颜色
                }, {
                    offset: 1, color: '#ffffff' // 100% 处的颜色
                }] : [{
                    offset: 0, color: '#00FFDE' // 0% 处的颜色
                }, {
                    offset: 1, color: '#004EFF' // 0% 处的颜色
                }],
            },
            series: [
                {
                    name: title,
                    type: 'pie',
                    radius: ['80%', '85%'],
                    avoidLabelOverlap: false,
                    hoverAnimation: false,
                    animation :false,
                    itemStyle: {
                        backgroundColor: {
                            image: '../../../assets/Oval.png',
                            width: '50%',
                            height:'50%'
                        },
                    },
                    label: {
                        normal: {
                            show: true,
                           
                            position: 'center',
                            formatter: [
                                '{a|' + num + '}',
                                '{b|' + title + '}'
                            ].join('\r\n\r\n'),
                            rich: {
                                a: {
                                    fontSize: 30,
                                    color: '#FFFFFF',
                                    height: 40
                                },
                                b: {
                                    fontSize: 14,
                                    color: '#FFFFFF'
                                },
                            },
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true
                        }
                    },
                    data: [
                        { value: num, name: '本月业绩' },
                    ]
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
            <div ref='charts' className='pies' onClick={this.props.onclick}>

            </div>
        )
    }
}
export default Index