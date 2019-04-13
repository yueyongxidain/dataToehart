import React, { Component } from 'react'
import { connect } from 'dva';
import { Divider, Icon, Select, Carousel } from 'antd'
import SortDown from '../../assets/icon_sort_down.png'
import SortUp from '../../assets/icon_sort_up.png'
import POST from '../../utils/request.js'
import Bar from '../commpent/singleBar/index';
import Pie from '../commpent/pie/index';
import AddModal from './addModal'
import Del from '../../assets/删除.png'
import { routerRedux } from 'dva/router';
import './index.less'
import {cloneDeep} from 'lodash'
const length = 0;
const Option = Select.Option
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 1,
            barIndex: 1,
            one: [],
            two: [],
            sortType: 0,
            phone: [],
            phoneSource: []
        }
    }
    btnOne = (e) => {
        e.stopPropagation()
        if (this.state.barIndex == 1) return
        for (var index in this.state.phoneSource) {
            this.postItem(this.state.phoneSource[index].phone, 1, index == 0 ? 'one' : 'two')
        }
        this.setState({
            barIndex: 1
        })
    }
    btnTwo = (e) => {
        e.stopPropagation()
        if (this.state.barIndex == 2) return
        for (var index in this.state.phoneSource) {
            this.postItem(this.state.phoneSource[index].phone, 2, index == 0 ? 'one' : 'two')
        }
        this.setState({
            barIndex: 2
        })
    }
    btnThree = (e) => {
        e.stopPropagation()
        if (this.state.barIndex == 3) return
        for (var index in this.state.phoneSource) {
            this.postItem(this.state.phoneSource[index].phone, 3, index == 0 ? 'one' : 'two')
        }
        this.setState({
            barIndex: 3
        })
    }
    btnFour = (e) => {
        e.stopPropagation()
        if (this.state.barIndex == 4) return
        for (var index in this.state.phoneSource) {
            this.postItem(this.state.phoneSource[index].phone, 4, index == 0 ? 'one' : 'two')
        }
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
    postItem = (name, item, stateName) => {
        POST('/demo/getCsv.php', { name: name, item: item }).then(app => {
            if (app.code == 0) {
                stateName == 'one' ?
                    this.setState({
                        one: app.result
                    }) :
                    this.setState({
                        two: app.result
                    })
            }
        })
    }
    //删除第二个
    delClick = () => {
        let { phoneSource } = this.state
        phoneSource.pop()
        this.setState({
            phoneSource
        })
    }
    //下拉改变事件
    handleChange = (e) => {
        let { phone, phoneSource, barIndex } = this.state
        phone.map((ele) => {
            if (ele.phone === e) {
                phoneSource[0] = ele
                this.setState({
                    phoneSource
                })
                this.postItem(e, barIndex, 'one')
            }
        })
    }
    handleChangeTwo = (e) => {
        let { phone, phoneSource, barIndex } = this.state
        phone.map((ele) => {
            if (ele.phone === e) {
                phoneSource[1] = ele
                this.setState({
                    phoneSource
                })
                this.postItem(e, barIndex, 'two')
            }
        })
    }
    //手机对比
    phoneList = (phoneSource) => {
        if (phoneSource.length == 1) {
            return (
                <div>
                    <div className="phone-one">
                        <div className='phone-name'>
                            <Select defaultValue={phoneSource[0].phone} style={{ width: 120 }} onChange={this.handleChange}>
                                {
                                    this.state.phone.map((ele) => {
                                        return <Option value={ele.phone} key={ele.phone}>{ele.phone}</Option>
                                    })
                                }
                            </Select></div>
                        <div className='phone-type'>{phoneSource[0].type} &nbsp;&nbsp;&nbsp;<span>类型</span></div>
                        <div className='phone-info'>

                            <div style={{ display: 'block', verticalAlign: 'top', marginRight: '0.4vw' }}>
                                <div className='phone-info-left'>颜色：</div>
                                <div className='phone-info-right'>
                                    {phoneSource[0].value.map((ele) => {
                                        return (
                                            <span >
                                                {ele.color}、
                                        </span>
                                        )

                                    })}
                                </div>

                            </div>
                            <Divider type='horizontal' className='phone-li-divider' />
                            <div style={{ display: 'block', verticalAlign: 'top', marginRight: '0.4vw' }}>
                                <div className='phone-info-left'>内存：</div>
                                <div className='phone-info-right'>
                                    {phoneSource[0].value.map((ele) => {
                                        return (
                                            <span>
                                                {
                                                    !!ele.size ? ele.size + '、' : null
                                                }

                                            </span>
                                        )

                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Divider type='horizontal' className='phone-divider' />
                    <div className="phone-add" onClick={this.addClick}>
                        <Icon type="plus-circle" style={{ color: 'rgba(255,255,255,0.14)', fontSize: '3vw' }} />
                        <div className='addtext'>添加对比手机</div>
                    </div>
                </div >
            )
        }
        if (phoneSource.length == 2) {
            return (
                <div>
                    <div className="phone-one">
                        <div className='phone-name'>
                            <Select defaultValue={phoneSource[0].phone} style={{ width: 120 }} onChange={this.handleChange}>
                                {
                                    this.state.phone.map((ele) => {
                                        return <Option value={ele.phone} key={ele.phone}>{ele.phone}</Option>
                                    })
                                }
                            </Select></div>
                        <div className='phone-type'>{phoneSource[0].type} &nbsp;&nbsp;&nbsp;<span>类型</span></div>
                        <div className='phone-info'>

                            <div style={{ display: 'block', verticalAlign: 'top', marginRight: '0.4vw' }}>
                                <div className='phone-info-left'>颜色：</div>
                                <div className='phone-info-right'>
                                    {phoneSource[0].value.map((ele) => {
                                        return (
                                            <span >
                                                {ele.color}、
                                        </span>
                                        )

                                    })}
                                </div>

                            </div>
                            <Divider type='horizontal' className='phone-li-divider' />
                            <div style={{ display: 'block', verticalAlign: 'top', marginRight: '0.4vw' }}>
                                <div className='phone-info-left'>内存：</div>
                                <div className='phone-info-right'>
                                    {phoneSource[0].value.map((ele) => {
                                        return (
                                            <span>
                                                {
                                                    !!ele.size ? ele.size + '、' : null
                                                }

                                            </span>
                                        )

                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Divider type='horizontal' className='phone-divider' />
                    <div className="phone-two">
                        <div className='phone-name'>
                            <Select defaultValue={phoneSource[1].phone} style={{ width: 120 }} onChange={this.handleChangeTwo}>
                                {
                                    this.state.phone.map((ele) => {
                                        return <Option value={ele.phone} key={ele.phone}>{ele.phone}</Option>
                                    })
                                }
                            </Select></div>
                        <img src={Del} onClick={this.delClick} />
                        <div className='phone-type'>{phoneSource[1].type} &nbsp;&nbsp;&nbsp;<span>类型</span></div>
                        <div className='phone-info'>

                            <div style={{ display: 'block', verticalAlign: 'top', marginRight: '0.4vw' }}>
                                <div className='phone-info-left'>颜色：</div>
                                <div className='phone-info-right'>
                                    {phoneSource[1].value.map((ele) => {
                                        return (
                                            <span >
                                                {ele.color}、
                                        </span>
                                        )

                                    })}
                                </div>

                            </div>
                            <Divider type='horizontal' className='phone-li-divider' />
                            <div style={{ display: 'block', verticalAlign: 'top', marginRight: '0.4vw' }}>
                                <div className='phone-info-left'>内存：</div>
                                <div className='phone-info-right'>
                                    {phoneSource[1].value.map((ele) => {
                                        return (
                                            <span>
                                                {
                                                    !!ele.size ? ele.size + '、' : null
                                                }

                                            </span>
                                        )

                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
    addClick = () => {
        this.setState({
            addVisible: true
        })
    }
    cancle = () => {
        this.setState({
            addVisible: false
        })
    }
    addPhone = (phoneSource) => {
        this.postItem(phoneSource[0].phone, 1, 'two')
        this.setState({
            phoneSource: [...this.state.phoneSource, ...phoneSource]
        })
    }
    componentWillMount = () => {

        POST('/demo/getPhone.php', {}).then(app => {
            if (app.code == 0) {
                this.setState({
                    phone: app.result,
                    phoneSource: !!app.result[0] ? [app.result[0]] : []
                })
                if (!!app.result[0])
                    this.postItem(app.result[0].phone, 1, 'one')
            }
        })
    }
    //饼图点击事件
    pieClick = (name,data,item)=>{
        let datas =cloneDeep(data)
        datas.sort((a, b) => {
            if (a.value > b.value) return -1
            if (a.value < b.value) return 1
            else return 0
        })
        console.log('kkkkk',data)
        let type = datas[item].key
        this.props.dispatch(routerRedux.push("/home/detail?name="+name+'&type='+type+'&index='+item))
    }
    render() {
        let { phoneSource, addVisible } = this.state
        console.log(phoneSource)
        return (
            <div className='single-body' >
                <div className='table'><span className='table-title'>手机产品属性情感分析结果</span>
                    <div className='table-button btn-one' onClick={this.btnOne} style={{ 'background-image': this.state.barIndex == 1 ? 'linear-gradient(-180deg, #00FFDE 0%, #004EFF 100%)' : null }}>满意度</div>
                    <div className='table-button btn-two' onClick={this.btnTwo} style={{ 'background-image': this.state.barIndex == 2 ? 'linear-gradient(-180deg, #00FFDE 0%, #004EFF 100%)' : null }}>关注度</div>
                    <div className='table-button btn-three' onClick={this.btnThree} style={{ 'background-image': this.state.barIndex == 3 ? 'linear-gradient(-180deg, #00FFDE 0%, #004EFF 100%)' : null }}>情感方差</div>
                    <div className='table-button btn-four' onClick={this.btnFour} style={{ 'background-image': this.state.barIndex == 4 ? 'linear-gradient(-180deg, #00FFDE 0%, #004EFF 100%)' : null }}>需改进度</div>
                </div>
                <div className='sort'><img src={!this.state.sortType ? SortDown : SortUp} onClick={this.sort} /></div>
                <div className='tables'>
                    <Bar one={this.state.one} two={phoneSource.length == 2 ? this.state.two : []} />
                    <Divider type='vertical' className='tables-divider' />
                    <div className='tables-Right'>
                        <div>
                            {
                                phoneSource.length > 0 ? this.phoneList(phoneSource) :
                                    <div className="add" onClick={this.addClick}>
                                        <Icon type="plus-circle" style={{ color: 'rgba(255,255,255,0.14)', fontSize: '3vw' }} />
                                        <div className='addtext'>添加对比手机</div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
                <Divider className='divider' />
                <Carousel vertical className='Carousel'>
                    <div className='pie'>
                        <div className='left'>
                            <span className='left-title'>
                                {!!phoneSource[0] ? phoneSource[0].phone : null}&nbsp;&nbsp;
                                {
                                    this.state.barIndex == 1 ?
                                        '满意度最高的产品属性' :
                                        this.state.barIndex == 2 ?
                                            '关注度最高的产品属性' :
                                            this.state.barIndex == 3 ?
                                                '情感房差最高的产品属性' :
                                                '需改进度最高的产品属性'
                                }
                            </span>
                            <div className='left-body'>
                                <Pie className='left-pie one' data={this.state.one} item={1} onclick={()=> this.state.barIndex==4?this.pieClick(phoneSource[0].phone,this.state.one,0):null}/>
                                <Pie className='left-pie two' data={this.state.one} item={2} onclick={()=>this.state.barIndex==4?this.pieClick(phoneSource[0].phone,this.state.one,1):null}/>
                                <Pie className='left-pie three' data={this.state.one} item={3} onclick={()=>this.state.barIndex==4?this.pieClick(phoneSource[0].phone,this.state.one,2):null}/>
                            </div>
                        </div>
                        <Divider type='vertical' className='divider-pie' />
                        <div className='right'>
                            <span className='right-title'>
                                {!!phoneSource[0] ? phoneSource[0].phone : null}&nbsp;&nbsp;
                                {
                                    this.state.barIndex == 1 ?
                                        '满意度最高的产品属性' :
                                        this.state.barIndex == 2 ?
                                            '关注度最高的产品属性' :
                                            this.state.barIndex == 3 ?
                                                '情感房差最高的产品属性' :
                                                '需改进度最高的产品属性'
                                }
                            </span>
                            <div className='right-body'>
                                <Pie className='right-pie one' data={this.state.one} item={-1} />
                                <Pie className='right-pie two' data={this.state.one} item={-2} />
                                <Pie className='right-pie three' data={this.state.one} item={-3} />
                            </div>

                        </div>
                    </div>
                    {phoneSource.length == 2 ? <div className='pie'>
                        <div className='left'>
                            <span className='left-title'>
                                {!!phoneSource[1] ? phoneSource[1].phone : null}&nbsp;&nbsp;
                                {
                                    this.state.barIndex == 1 ?
                                        '满意度最高的产品属性' :
                                        this.state.barIndex == 2 ?
                                            '关注度最高的产品属性' :
                                            this.state.barIndex == 3 ?
                                                '情感房差最高的产品属性' :
                                                '需改进度最高的产品属性'
                                }
                            </span>
                            <div className='left-body'>
                                <Pie className='left-pie one' data={this.state.two || []} item={1} onclick={()=> this.state.barIndex==4?this.pieClick(phoneSource[1].phone,this.state.two,0):null}/>
                                <Pie className='left-pie two' data={this.state.two || []} item={2} onclick={()=> this.state.barIndex==4?this.pieClick(phoneSource[1].phone,this.state.two,1):null}/>
                                <Pie className='left-pie three' data={this.state.two || []} item={3} onclick={()=> this.state.barIndex==4?this.pieClick(phoneSource[1].phone,this.state.two,2):null}/>
                            </div>
                        </div>
                        <Divider type='vertical' className='divider-pie' />
                        <div className='right'>
                            <span className='right-title'>
                                {!!phoneSource[1] ? phoneSource[1].phone : null}&nbsp;&nbsp;
                                {
                                    this.state.barIndex == 1 ?
                                        '满意度最高的产品属性' :
                                        this.state.barIndex == 2 ?
                                            '关注度最高的产品属性' :
                                            this.state.barIndex == 3 ?
                                                '情感房差最高的产品属性' :
                                                '需改进度最高的产品属性'
                                }
                            </span>
                            <div className='right-body'>
                                <Pie className='right-pie one' data={this.state.two || []} item={-1} />
                                <Pie className='right-pie two' data={this.state.two || []} item={-2} />
                                <Pie className='right-pie three' data={this.state.two || []} item={-3} />
                            </div>

                        </div>
                    </div> : null}
                </Carousel>
                <AddModal date={this.state.phone.filter((ele) => { return ele.phone !== phoneSource[0].phone })} add={this.addPhone} addVisible={addVisible} cancle={this.cancle} />
            </div >
        )
    }
}
export default connect()(Index)

