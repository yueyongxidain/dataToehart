import React, { Component } from 'react'
import Echart from 'echarts';
import './index.less'
import {cloneDeep} from 'lodash'
class Index extends Component {
    constructor(props) {
        super(props)

    }
    componentWillReceiveProps = (nextProps) => {
        let data =cloneDeep(nextProps.data)
        let item = nextProps.item
        let index = !!nextProps.index?true :false
        data.sort((a, b) => {
            if (a.value > b.value) return -1
            if (a.value < b.value) return 1
            else return 0
        })
        let title = data.length > 3 ? item > 0 ? data[item - 1].key : data[data.length + item].key : ''
        let num = data.length > 3 ? item > 0 ? data[item - 1].value : data[data.length + item].value : ''
        let option = {
            tooltip: {
                show:false,
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            color: index?['#FFFFFF']:["#00c0ef"],
            series: [
                {
                    name: title,
                    type: 'pie',
                    radius: ['75%', '85%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            position: 'center',
                            formatter: function (argument) {
                                var html;
                                html = num + '\r\n\r\n' + title;
                                return html;
                            },
                            textStyle: {
                                fontSize: 15,
                                color: '#FFFFFF'
                            }
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
    render() {
        return (
            <div ref='charts' className='pies' onClick={this.props.onclick}>

            </div>
        )
    }
}
export default Index