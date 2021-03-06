import React, { Component } from 'react'
import { connect } from 'dva';
import { Divider } from 'antd'
import SortDown from '../../assets/icon_sort_down.png'
import SortUp from '../../assets/icon_sort_up.png'
import POST from '../../utils/request.js'
import Bar from '../commpent/bar/index';
import Pie from '../commpent/pie/index';
import './index.less'


const length = 0;
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 1,
            barIndex: 1,
            data: [],
            sortType: 0
        }
    }
    btnOne = (e) => {
        e.stopPropagation()
        if (this.state.barIndex == 1) return
        this.postItem(1)
        this.setState({
            barIndex: 1
        })
    }
    btnTwo = (e) => {
        e.stopPropagation()
        if (this.state.barIndex == 2) return
        this.postItem(2)
        this.setState({
            barIndex: 2
        })
    }
    btnThree = (e) => {
        e.stopPropagation()
        if (this.state.barIndex == 3) return
        this.postItem(3)
        this.setState({
            barIndex: 3
        })
    }
    btnFour = (e) => {
        e.stopPropagation()
        if (this.state.barIndex == 4) return
        this.postItem(4)
        this.setState({
            barIndex: 4
        })
    }
    //排序点击
    sort = (e) => {
        e.stopPropagation()
        let { data, sortType } = this.state
        data.sort((a, b) => {
            if (a.value > b.value) return sortType ? -1 : 1
            if (a.value < b.value) return sortType ? 1 : -1
            else return 0
        })
        this.setState({
            data: data,
            sortType: sortType ? 0 : 1
        })
    }
    postItem = (item) => {
        POST('/demo/getCsv.php', { name: '总体手机', item: item }).then(app => {
            if (app.code == 0) {
                this.setState({
                    data: app.result
                })
            }
        })
    }

    
    componentWillMount = () => {
        this.postItem(1)
    }
    render() {
        return (
            <div className='all-body' >
                <div className='table'><span className='table-title'>⼿机评价指标得分</span>
                    <div className='table-button btn-one' onClick={this.btnOne} style={{ 'background-image': this.state.barIndex == 1 ? 'linear-gradient(75deg, #00FFDE 0%, #004EFF 100%)' : null }}>满意度</div>
                    <div className='table-button btn-two' onClick={this.btnTwo} style={{ 'background-image': this.state.barIndex == 2 ? 'linear-gradient(75deg, #00FFDE 0%, #004EFF 100%)' : null }}>关注度</div>
                    <div className='table-button btn-three' onClick={this.btnThree} style={{ 'background-image': this.state.barIndex == 3 ? 'linear-gradient(75deg, #00FFDE 0%, #004EFF 100%)' : null }}>情感方差</div>
                    <div className='table-button btn-four' onClick={this.btnFour} style={{ 'background-image': this.state.barIndex == 4 ? 'linear-gradient(75deg, #00FFDE 0%, #004EFF 100%)' : null }}>需改进度</div>
                </div>
                <div className='sort'><img src={!this.state.sortType ? SortDown : SortUp} onClick={this.sort} /></div>
                <div className='tables'>
                    <Bar data={this.state.data} />
                </div>
                <Divider className='divider' />
                <div className='pie'>
                    <div className='left'>
                        <span className='left-title'>
                            {
                                this.state.barIndex == 1 ?
                                    '满意度最高的产品属性' :
                                    this.state.barIndex == 2 ?
                                        '关注度最高的产品属性' :
                                        this.state.barIndex == 3 ?
                                            '情感方差最高的产品属性' :
                                            '需改进度最高的产品属性'
                            }
                        </span>
                        <div className='left-body'>
                            <Pie className='left-pie one' data={this.state.data} item={1} />
                            <Pie className='left-pie two' data={this.state.data} item={2} />
                            <Pie className='left-pie three' data={this.state.data} item={3} />
                        </div>
                    </div>
                    <Divider type='vertical' className='divider-pie' />
                    <div className='right'>
                        <span className='right-title'>
                            {
                                this.state.barIndex == 1 ?
                                    '满意度最低的产品属性' :
                                    this.state.barIndex == 2 ?
                                        '关注度最低的产品属性' :
                                        this.state.barIndex == 3 ?
                                            '情感方差最低的产品属性' :
                                            '需改进度最低的产品属性'
                            }
                        </span>
                        <div className='right-body'>
                            <Pie className='right-pie one' data={this.state.data} item={-1} />
                            <Pie className='right-pie two' data={this.state.data} item={-2} />
                            <Pie className='right-pie three' data={this.state.data} item={-3} />
                        </div>

                    </div>
                </div>
            </div >
        )
    }
}
export default connect()(Index)

