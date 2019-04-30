import React, { Component } from 'react'
import { connect } from 'dva';
import { Divider, Icon, Select, Carousel } from 'antd'
import { routerRedux } from 'dva/router';
import POST from '../../utils/request.js'
import Bar from '../commpent/scatter/index';
import Pie from '../commpent/pie/index';
import { cloneDeep } from 'lodash'
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
            fileType:'',
            phone: [],
            phoneSource: [],
            index: 0,
            rightDetail: '',
            fileName: '',
            backItem: 0,
            single: null,
            parentOne: [],
            parentTwo: [],
            parentPhoneSource:[],
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
        debugger
        const { data } = this.state;
        let res = data.filter((ele) => {
            return ele.key == name
        })
        this.setState({
            rightDetail: res.length > 0 ? res[0].string : ''
        })


    }
    init = () => {
        const { data } = this.state
        let sortData = cloneDeep(data);
        sortData = sortData.sort((a, b) => {
            if (a.value * 1 > b.value * 1) return -1
            if (a.value * 1 < b.value * 1) return 1
            else return 0
        })
        if (!!sortData[0]) {
            setTimeout(this.Click(sortData[0].key), 3000)
        }

    }
    //返回点击事件
    back = () => {
        const { backItem, single, parentPhoneSource, parentOne, parentTwo } = this.state
        debugger
        if (single) {
            this.props.dispatch(routerRedux.push('/home/single?backItem=' + backItem + '&phoneSource=' + encodeURI(JSON.stringify(parentPhoneSource)) + '&one=' + encodeURI(JSON.stringify(parentOne)) + '&two=' + encodeURI(JSON.stringify(parentTwo))))
        }
        else {
            this.props.dispatch(routerRedux.push('/home/mult?backItem=' + backItem))
        }


    }
    //饼图点击事件
    pieClick = (data, index) => {
        let sortData = cloneDeep(data);
        sortData = sortData.sort((a, b) => {
            if (a.value * 1 > b.value * 1) return -1
            if (a.value * 1 < b.value * 1) return 1
            else return 0
        })
        let fileType = sortData[index].key || ''
        const { fileName } = this.state
        this.setState({
            index: index
        })
        POST('/demo/getDetail.php', { name: fileName + '-' + fileType }).then(app => {
            if (app.code == 0) {
                this.setState({
                    data: app.result,
                    phoneSource: !!app.result[0] ? [app.result[0]] : []
                }, this.init)
            }
        })
    }
    componentDidMount = () => {
        const query = this.props.location.search
        const arr = decodeURIComponent(query.split('?')[1])
        const arrs = arr.split('&')
        const fileName = arrs[0].split('=')[1]
        const fileType = arrs[1].split('=')[1]
        const index = arrs[2].split('=')[1] || 0
        const backItem = !!arrs[3] ? arrs[3].split('=')[1] : 0
        const single = !!arrs[4] ? arrs[4].split('=')[1] : null
        const parentPhoneSource = !!arrs[5] ? JSON.parse(arrs[5].split('=')[1]) : null
        const parentOne = !!arrs[6] ? JSON.parse(arrs[6].split('=')[1]) : null
        const parentTwo = !!arrs[7] ? JSON.parse(arrs[7].split('=')[1]) : null
        debugger
        this.setState({
            index,
            fileName,
            backItem,
            single,
            parentOne,
            parentPhoneSource,
            parentTwo,
            fileType
        })
        POST('/demo/getDetail.php', { name: fileName + '-' + fileType }).then(app => {
            if (app.code == 0) {
                this.setState({
                    data: app.result,
                    phoneSource: !!app.result[0] ? [app.result[0]] : []
                }, this.init)
                if (!!app.result[0])
                    this.postItem(fileName, 4, 'one')
            }
        })
    }
    render() {
        let { fileName, fileType, data, rightDetail,single } = this.state

        return (
            <div className='detail-body' >
                <div className='table'>
                    <span className='table-title'>用户对 “{fileType}” 不满点</span>
                </div>
                <div className='single-back' onClick={this.back}>返回</div>
                <div className='tables'>
                    <Bar data={data} click={this.Click} />
                    <Divider type='vertical' className='tables-divider' />
                    <div className='tables-Right'>
                        {
                            (rightDetail.length > 0 ? rightDetail.split('、') : []).map((ele) => {
                                return <div className='table-Right-desc'>{ele}</div>
                            })
                        }
                    </div>
                </div>
                <Divider className='divider' />
                <div className='pie'>
                    <div className='left'>
                        <span className='left-title'>
                            {fileName}{single?` `:null}需改进度最高的产品属性
                            </span>
                        <div className='left-body'>
                            <Pie className='left-pie one' data={this.state.one} item={1} index={this.state.index == 0} onclick={() => this.pieClick(this.state.one, 0)} />
                            <Pie className='left-pie two' data={this.state.one} item={2} index={this.state.index == 1} onclick={() => this.pieClick(this.state.one, 1)} />
                            <Pie className='left-pie three' data={this.state.one} item={3} index={this.state.index == 2} onclick={() => this.pieClick(this.state.one, 2)} />
                        </div>
                    </div>
                    <Divider type='vertical' className='divider-pie' />
                    <div className='right'>
                        <span className='right-title'>
                            {fileName}{single?' ':null}需改进度最低的产品属性
                            </span>
                        <div className='right-body'>
                            <Pie className='right-pie one' data={this.state.one} item={-1} />
                            <Pie className='right-pie two' data={this.state.one} item={-2} />
                            <Pie className='right-pie three' data={this.state.one} item={-3} />
                        </div>

                    </div>
                </div>

            </div >
        )
    }
}
export default connect()(Index)

