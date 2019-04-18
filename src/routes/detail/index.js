import React, { Component } from 'react'
import { connect } from 'dva';
import { Divider, Icon, Select, Carousel } from 'antd'
import { routerRedux } from 'dva/router';
import POST from '../../utils/request.js'
import Bar from '../commpent/scatter/index';
import Pie from '../commpent/pie/index';
// import AddModal from './addModal'
import Del from '../../assets/删除.png'
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import './index.less'
const length = 0;
const Option = Select.Option
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            one: [],
            two: [],
            sortType: 0,
            phone: [],
            phoneSource: [],
            index: 0,
            rightDetail: ''
        }
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
    //散点图点击事件
    Click = (name) => {
        const { data } = this.state;
        debugger
        let res = data.filter((ele) => {
            return ele.key == name
        })
        debugger
        this.setState({
            rightDetail: res.length > 0 ? res[0].string : ''
        })


    }
    //返回点击事件
    back = ()=>{
        this.props.dispatch(routerRedux.goBack())

    }
    componentDidMount = () => {
        const query = this.props.location.search // '?s=1&f=7'
        const arr = decodeURIComponent(query.split('?')[1]) // ['?s=', 'f=7']
        const arrs = arr.split('&') // ['?s=', 'f=7']
        const fileName = arrs[0].split('=')[1] // '1'
        const fileType = arrs[1].split('=')[1]// '7'
        const index = arrs[2].split('=')[1] || 0// '7'
        this.setState({
            index
        })
        POST('/demo/getDetail.php', { name: fileName + '-' + fileType }).then(app => {
            if (app.code == 0) {
                this.setState({
                    data: app.result,
                    phoneSource: !!app.result[0] ? [app.result[0]] : []
                })
                if (!!app.result[0])
                    this.postItem(fileName, 4, 'one')
            }
        })
    }
    render() {
        let { phoneSource, addVisible, data, rightDetail } = this.state

        return (
            <div className='single-body' >
                <div className='table'>
                    <span className='table-title'>手机产品属性情感分析结果</span>
                </div>
                <div className='single-back' onClick={this.back}>返回</div>
                <div className='tables'>
                    <Bar data={data} click={this.Click} />
                    <Divider type='vertical' className='tables-divider' />
                    <div className='tables-Right'>
                        {
                            (rightDetail.length>0?rightDetail.split('、') :[]).map((ele) => {
                                return <div className='table-Right-desc'>{ele}</div>
                            })
                        }
                    </div>
                </div>
                <Divider className='divider' />
                <Carousel vertical className='Carousel'>
                    <div className='pie'>
                        <div className='left'>
                            <span className='left-title'>
                                需改进度最高的产品属性
                            </span>
                            <div className='left-body'>
                                <Pie className='left-pie one' data={this.state.one} item={1} index={this.state.index == 0} />
                                <Pie className='left-pie two' data={this.state.one} item={2} index={this.state.index == 1} />
                                <Pie className='left-pie three' data={this.state.one} item={3} index={this.state.index == 2} />
                            </div>
                        </div>
                        <Divider type='vertical' className='divider-pie' />
                        <div className='right'>
                            <span className='right-title'>
                                需改进度最高的产品属性
                            </span>
                            <div className='right-body'>
                                <Pie className='right-pie one' data={this.state.one} item={-1} />
                                <Pie className='right-pie two' data={this.state.one} item={-2} />
                                <Pie className='right-pie three' data={this.state.one} item={-3} />
                            </div>

                        </div>
                    </div>
                </Carousel>
            </div >
        )
    }
}
export default connect()(Index)

