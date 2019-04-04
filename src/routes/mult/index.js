import React, { Component } from 'react'
import { connect } from 'dva';
import { Divider, Carousel } from 'antd'
import SortDown from '../../assets/icon_sort_down.png'
import SortUp from '../../assets/icon_sort_up.png'
import POST from '../../utils/request.js'
import Bar from '../commpent/mulBar/index';
import Pie from '../commpent/pie/index';
import Btn_white from '../../assets/btn_white.png'
import Btn_gao from '../../assets/btn_gao.png'
import Btn_zhong from '../../assets/btn_zhong.png'
import Btn_di from '../../assets/btn_di.png'
import './index.less'
const length = 0;
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 1,
            barIndex: 1,
            gao: [],
            zhong: [],
            di: [],
            gaoBtn: 1,
            zhongBtn: 1,
            diBtn: 1,
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
        let { gao, zhong, di, sortType, gaoBtn, zhongBtn, diBtn } = this.state
        if (gaoBtn) {
            gao.sort((a, b) => {
                if (a.value > b.value) return sortType ? -1 : 1
                if (a.value < b.value) return sortType ? 1 : -1
                else return 0
            })
            let zhong_new = []
            let di_new = []
            gao.map((ele) => {
                zhong.map((zhong_e) => {
                    if (ele.key == zhong_e.key) {
                        zhong_new.push(zhong_e)
                    }
                })
                di.map((di_e) => {
                    if (ele.key == di_e.key) {
                        di_new.push(di_e)
                    }
                })
            })
            this.setState({
                gao,
                zhong: zhong_new,
                di: di_new,
                sortType: sortType ? 0 : 1

            })
        }
        if (zhongBtn) {

            zhong.sort((a, b) => {
                if (a.value > b.value) return sortType ? -1 : 1
                if (a.value < b.value) return sortType ? 1 : -1
                else return 0
            })
            let gao_new = []
            let di_new = []
            zhong.map((ele) => {
                gao.map((gao_e) => {
                    if (ele.key == gao_e.key) {
                        gao_new.push(gao_e)
                    }
                })
                di.map((di_e) => {
                    if (ele.key == di_e.key) {
                        di_new.push(di_e)
                    }
                })
            })
            this.setState({
                gao: gao_new,
                zhong: zhong,
                di: di_new,
                sortType: sortType ? 0 : 1

            })
        }
        if (diBtn) {
            di.sort((a, b) => {
                if (a.value > b.value) return sortType ? -1 : 1
                if (a.value < b.value) return sortType ? 1 : -1
                else return 0
            })
            let zhong_new = []
            let gao_new = []
            di.map((ele) => {
                zhong.map((zhong_e) => {
                    if (ele.key == zhong_e.key) {
                        zhong_new.push(zhong_e)
                    }
                })
                gao.map((gao_e) => {
                    if (ele.key == gao_e.key) {
                        gao_new.push(gao_e)
                    }
                })
            })
            this.setState({
                gao: gao_new,
                zhong: zhong_new,
                di: di,
                sortType: sortType ? 0 : 1

            })
        }
    }
    postItem = (item) => {
        POST('/demo/getCsv.php', { name: '高端手机', item: item }).then(app => {
            if (app.code == 0) {
                this.setState({
                    gao: app.result
                })
            }
        })
        POST('/demo/getCsv.php', { name: '中端手机', item: item }).then(app => {
            if (app.code == 0) {
                this.setState({
                    zhong: app.result
                })
            }
        })
        POST('/demo/getCsv.php', { name: '低端手机', item: item }).then(app => {
            if (app.code == 0) {
                this.setState({
                    di: app.result
                })
            }
        })
    }
    gaoClick = () => {
        this.setState({
            gaoBtn: this.state.gaoBtn ? 0 : 1
        })
    }
    zhongClick = () => {
        this.setState({
            zhongBtn: this.state.zhongBtn ? 0 : 1
        })
    }
    diClick = () => {
        this.setState({
            diBtn: this.state.diBtn ? 0 : 1
        })
    }
    Sortimg = () => {
        const { gaoBtn, zhongBtn, diBtn } = this.state
        if (gaoBtn) {
            if (zhongBtn == 0 && diBtn == 0) return true
        }
        if (zhongBtn) {
            if (gaoBtn == 0 && diBtn == 0) return true
        }
        if (diBtn) {
            if (zhongBtn == 0 && gaoBtn == 0) return true
        }
        return false
    }
    componentWillMount = () => {
        this.postItem(1);

    }
    render() {
        const { gaoBtn, zhongBtn, diBtn } = this.state
        let show = this.Sortimg()
        return (
            <div className='mult-body' >
                <div className='table'><span className='table-title'>手机产品属性情感分析结果</span>
                    <div className='table-button btn-one' onClick={this.btnOne} style={{ 'background-image': this.state.barIndex == 1 ? 'linear-gradient(-180deg, #00FFDE 0%, #004EFF 100%)' : null }}>满意度</div>
                    <div className='table-button btn-two' onClick={this.btnTwo} style={{ 'background-image': this.state.barIndex == 2 ? 'linear-gradient(-180deg, #00FFDE 0%, #004EFF 100%)' : null }}>关注度</div>
                    <div className='table-button btn-three' onClick={this.btnThree} style={{ 'background-image': this.state.barIndex == 3 ? 'linear-gradient(-180deg, #00FFDE 0%, #004EFF 100%)' : null }}>情感方差</div>
                    <div className='table-button btn-four' onClick={this.btnFour} style={{ 'background-image': this.state.barIndex == 4 ? 'linear-gradient(-180deg, #00FFDE 0%, #004EFF 100%)' : null }}>需改进度</div>
                </div>
                <div className='sort'>{show ? <img src={!this.state.sortType ? SortDown : SortUp} onClick={this.sort} /> : null}</div>
                <div className='tables'>
                    <Bar gao={this.state.gao} zhong={this.state.zhong} di={this.state.di} btngao={gaoBtn} btnzhong={zhongBtn} btndi={diBtn} />
                    <div className='tooltip1'><div className='tooltip-icon'> &nbsp; &nbsp; &nbsp; &nbsp;</div><span> &nbsp;高端手机</span></div>
                    <div className='tooltip2'><div className='tooltip-icon'>&nbsp; &nbsp; &nbsp; &nbsp;</div><span > &nbsp;中端手机</span></div>
                    <div className='tooltip3'><div className='tooltip-icon'>&nbsp; &nbsp; &nbsp; &nbsp;</div><span> &nbsp;低端手机</span></div>
                    <Divider type='vertical' className='tables-divider' />
                    <div className='tables-Right'>
                        <div>
                            <span className='title'>高端手机</span>
                            <img className='btn-1' src={!gaoBtn ? Btn_white : Btn_gao} onClick={this.gaoClick} />
                            <span className='desc'>*价格在2500元以上的手机为高端手机</span>
                            <span className='number'><span className='number-number'>22 </span> 手机个数</span>
                        </div>
                        <Divider className='tables-Right-divider' />
                        <div>
                            <span className='title'>中端手机</span>
                            <img className='btn-2' src={!zhongBtn ? Btn_white : Btn_zhong} onClick={this.zhongClick} />
                            <span className='desc'> *价格在1500-2500元之间的手机为中端手机</span>
                            <span className='number'><span className='number-number'>19 </span>  手机个数</span>
                        </div>
                        <Divider className='tables-Right-divider' />
                        <div>
                            <span className='title'>低端手机</span>
                            <img className='btn-3' src={!diBtn ? Btn_white : Btn_di} onClick={this.diClick} />
                            <span className='desc'>*价格在1500元以下的手机为低端手机</span>
                            <span className='number'><span className='number-number'>19 </span>  手机个数</span>
                        </div>
                    </div>
                </div>
                <Divider className='divider' />
                <Carousel vertical className='Carousel'>
                    <div className='pie'>
                        <div className='left'>
                            <span className='left-title'>
                                {
                                    this.state.barIndex == 1 ?
                                        '满意度最高的产品属性-高端' :
                                        this.state.barIndex == 2 ?
                                            '关注度最高的产品属性-高端' :
                                            this.state.barIndex == 3 ?
                                                '情感房差最高的产品属性-高端' :
                                                '需改进度最高的产品属性-高端'
                                }
                            </span>
                            <div className='left-body'>
                                <Pie className='left-pie' data={this.state.gao} item={1} />
                                <Pie className='left-pie' data={this.state.gao} item={2} />
                                <Pie className='left-pie' data={this.state.gao} item={3} />
                            </div>
                        </div>
                        <Divider type='vertical' className='divider-pie' />
                        <div className='right'>
                            <span className='right-title'>
                                {
                                    this.state.barIndex == 1 ?
                                        '满意度最高的产品属性-高端' :
                                        this.state.barIndex == 2 ?
                                            '关注度最高的产品属性-高端' :
                                            this.state.barIndex == 3 ?
                                                '情感房差最高的产品属性-高端' :
                                                '需改进度最高的产品属性-高端'
                                }
                            </span>
                            <div className='right-body'>
                                <Pie className='right-pie' data={this.state.gao} item={-1} />
                                <Pie className='right-pie' data={this.state.gao} item={-2} />
                                <Pie className='right-pie' data={this.state.gao} item={-3} />
                            </div>

                        </div>
                    </div>
                    <div className='pie'>
                        <div className='left'>
                            <span className='left-title'>
                                {
                                    this.state.barIndex == 1 ?
                                        '满意度最高的产品属性-中端' :
                                        this.state.barIndex == 2 ?
                                            '关注度最高的产品属性-中端' :
                                            this.state.barIndex == 3 ?
                                                '情感房差最高的产品属性-中端' :
                                                '需改进度最高的产品属性-中端'
                                }
                            </span>
                            <div className='left-body'>
                                <Pie className='left-pie' data={this.state.zhong} item={1} />
                                <Pie className='left-pie' data={this.state.zhong} item={2} />
                                <Pie className='left-pie' data={this.state.zhong} item={3} />
                            </div>
                        </div>
                        <Divider type='vertical' className='divider-pie' />
                        <div className='right'>
                            <span className='right-title'>
                                {
                                    this.state.barIndex == 1 ?
                                        '满意度最高的产品属性-中端' :
                                        this.state.barIndex == 2 ?
                                            '关注度最高的产品属性-中端' :
                                            this.state.barIndex == 3 ?
                                                '情感房差最高的产品属性-中端' :
                                                '需改进度最高的产品属性-中端'
                                }
                            </span>
                            <div className='right-body'>
                                <Pie className='right-pie' data={this.state.zhong} item={-1} />
                                <Pie className='right-pie' data={this.state.zhong} item={-2} />
                                <Pie className='right-pie' data={this.state.zhong} item={-3} />
                            </div>

                        </div>
                    </div>

                    <div className='pie'>
                        <div className='left'>
                            <span className='left-title'>
                                {
                                    this.state.barIndex == 1 ?
                                        '满意度最高的产品属性-低端' :
                                        this.state.barIndex == 2 ?
                                            '关注度最高的产品属性-低端' :
                                            this.state.barIndex == 3 ?
                                                '情感房差最高的产品属性-低端' :
                                                '需改进度最高的产品属性-低端'
                                }
                            </span>
                            <div className='left-body'>
                                <Pie className='left-pie' data={this.state.di} item={1} />
                                <Pie className='left-pie' data={this.state.di} item={2} />
                                <Pie className='left-pie' data={this.state.di} item={3} />
                            </div>
                        </div>
                        <Divider type='vertical' className='divider-pie' />
                        <div className='right'>
                            <span className='right-title'>
                                {
                                    this.state.barIndex == 1 ?
                                        '满意度最高的产品属性-低端' :
                                        this.state.barIndex == 2 ?
                                            '关注度最高的产品属性-低端' :
                                            this.state.barIndex == 3 ?
                                                '情感房差最高的产品属性-低端' :
                                                '需改进度最高的产品属性-低端'
                                }
                            </span>
                            <div className='right-body'>
                                <Pie className='right-pie' data={this.state.di} item={-1} />
                                <Pie className='right-pie' data={this.state.di} item={-2} />
                                <Pie className='right-pie' data={this.state.di} item={-3} />
                            </div>

                        </div>
                    </div>
                </Carousel>

            </div >
        )
    }
}
export default connect()(Index)

