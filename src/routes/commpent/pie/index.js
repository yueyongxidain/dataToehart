import React, { Component } from 'react'
import { connect } from 'dva';
import { Card, Form } from 'antd';
import Echart from 'echarts';
import './index.less'
class Index extends Component {
    constructor(props) {
        super(props)

    }
    componentWillReceiveProps = (nextProps) => {
        let data = nextProps.data
        let item = nextProps.item
        data.sort((a, b) => {
            if (a.value > b.value) return -1
            if (a.value < b.value) return 1
            else return 0
        })
        let title = item > 0 ? data[item - 1].key : data[data.length + item].key
        let num = item > 0 ? data[item - 1].value : data[data.length + item].value
        let option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            color: ["#00c0ef"],
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['75%', '85%'],
                    avoidLabelOverlap: false,
                    // hoveranination:false,
                    // silent:true,
                    label: {
                        normal: {
                            show: true,
                            position: 'center',
                            formatter: function (argument) {
                                var html;
                                html = num+'\r\n\r\n' + title;
                                return html;
                            },
                            textStyle: {
                                fontSize: 15,
                                color: '#00c0ef'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true
                        }
                    },
                    data: [
                        { value: 400, name: '本月业绩' }
                    ]
                }
            ]
        };
        let myChart = Echart.init(this.refs.charts);
        myChart.setOption(option);
    }
    render() {
        return (
            <div ref='charts' className='pies'>

            </div>
        )
    }
}
export default Index