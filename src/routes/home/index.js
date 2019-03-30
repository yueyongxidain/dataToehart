import React, { Component } from 'react'
import { connect } from 'dva';
import { Form, Icon, Button, Upload, Divider } from 'antd'
import { routerRedux } from 'dva/router';
import Bg from '../../assets/bg.png'
import Logo from '../../assets/logo.png'
import POST from '../../utils/request.js'
import Bar from '../commpent/bar/index';
import './index.less'
const length = 0;
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 1,
            barIndex: 1
        }
    }

    one = () => {
        if (this.state.index == 1) return
        this.setState({
            index: 1
        })
    }
    two = () => {
        if (this.state.index == 2) return
        this.setState({
            index: 2
        })
    }
    three = () => {
        if (this.state.index == 3) return
        this.setState({
            index: 3
        })
    }
    btnOne = () => {
        debugger
        if (this.state.barIndex == 1) return
        this.setState({
            barIndex: 1
        })
    }
    btnTwo = () => {
        debugger
        if (this.state.barIndex == 2) return
        this.setState({
            barIndex: 2
        })
    }
    btnThree = () => {
        if (this.state.barIndex == 3) return
        this.setState({
            barIndex: 3
        })
    }
    btnFour = () => {
        if (this.state.barIndex == 4) return
        this.setState({
            barIndex: 4
        })
    }
    componentWillMount=()=>{
        POST('/demo/getCsv.php', { name:'总体手机'}).then(app => {
            // if (app.code == 0) {
            //     console.log('登陆成功')
            //     window.location.href = window.location.origin + '/#/upload';
            // }
        })
    }
    render() {
        return (
            <div className='home-body'>
                <div className='header'>
                    <div className='logo'>
                        <img src={Logo} />
                    </div>
                </div>
                <div className='menu'>
                    <div className='menu-button one' onClick={this.one} style={{ 'background-image': this.state.index == 1 ? 'linear-gradient(-180deg, #00FFDE 0%, #004EFF 100%)' : null }}>总体手机分析</div>
                    <div className='menu-button two' onClick={this.two} style={{ 'background-image': this.state.index == 2 ? 'linear-gradient(-180deg, #00FFDE 0%, #004EFF 100%)' : null }}>多种手机分析</div>
                    <div className='menu-button three' onClick={this.three} style={{ 'background-image': this.state.index == 3 ? 'linear-gradient(-180deg, #00FFDE 0%, #004EFF 100%)' : null }}>单种手机分析</div>
                </div>
                <div className='body'>
                    <div className='table'><span className='table-title'>手机产品属性情感分析结果</span>
                        <div className='table-button btn-one' onClick={this.btnOne} style={{ 'background-image': this.state.barIndex == 1 ? 'linear-gradient(-180deg, #00FFDE 0%, #004EFF 100%)' : null }}>满意度</div>
                        <div className='table-button btn-two' onClick={this.btnTwo} style={{ 'background-image': this.state.barIndex == 2 ? 'linear-gradient(-180deg, #00FFDE 0%, #004EFF 100%)' : null }}>关注度</div>
                        <div className='table-button btn-three' onClick={this.btnThree} style={{ 'background-image': this.state.barIndex == 3 ? 'linear-gradient(-180deg, #00FFDE 0%, #004EFF 100%)' : null }}>情感方差</div>
                        <div className='table-button btn-four' onClick={this.btnFour} style={{ 'background-image': this.state.barIndex == 4 ? 'linear-gradient(-180deg, #00FFDE 0%, #004EFF 100%)' : null }}>需改进度</div>
                    </div>
                    <div className='tables'>
                        <Bar />
                    </div>
                    <Divider className='divider' />
                    <div className='pie'>
                        <div className='left'>

                        </div>
                        <div className='right'>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect()(Index)