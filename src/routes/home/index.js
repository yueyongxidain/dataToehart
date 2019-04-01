import React, { Component } from 'react'
import { connect } from 'dva';
import { Router, Route, Switch, Redirect } from 'dva/router';
import { routerRedux } from 'dva/router';
import Logo from '../../assets/logo.png'
import Icon from '../../assets/icon_home.png'
import All from '../all'
import Mult from '../mult'
import Single from '../single'
import './index.less'
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

    one = (e) => {
        e.stopPropagation()
        if (this.state.index == 1) return
        this.setState({
            index: 1
        })
        this.props.dispatch(routerRedux.push("/home/all"))
    }
    two = (e) => {
        e.stopPropagation()
        if (this.state.index == 2) return
        this.setState({
            index: 2
        })
        this.props.dispatch(routerRedux.push("/home/mult"))
    }
    three = (e) => {
        e.stopPropagation()
        if (this.state.index == 3) return
        this.setState({
            index: 3
        })
        this.props.dispatch(routerRedux.push("/home/single"))
    }

    render() {
        return (
            <div className='home-body'>
                <div className='header'>
                    <div className='logo'>
                        <img src={Logo} />
                    </div>
                    <span className='header-title one '>评论数据数量： <span>1,257,482</span></span>
                    <span className='header-title two'>有效评论数量： <span>808,426</span></span>
                    <img src={Icon} className='header-Icon' />
                    <span className='header-Icon-title1'>admin</span>
                    <span className='header-Icon-title2'>管理员</span>
                </div>
                <div className='menu'>
                    <div className='menu-button one' onClick={this.one} style={{ 'background-image': this.state.index == 1 ? 'linear-gradient(-180deg, #00FFDE 0%, #004EFF 100%)' : null }}>总体手机分析</div>
                    <div className='menu-button two' onClick={this.two} style={{ 'background-image': this.state.index == 2 ? 'linear-gradient(-180deg, #00FFDE 0%, #004EFF 100%)' : null }}>多种手机分析</div>
                    <div className='menu-button three' onClick={this.three} style={{ 'background-image': this.state.index == 3 ? 'linear-gradient(-180deg, #00FFDE 0%, #004EFF 100%)' : null }}>单种手机分析</div>
                </div>
                <Switch>
                    <Redirect exact from="/home" to="/home/all" />
                    <Route exact path="/home/all" component={All} />
                    <Route exact path="/home/mult" component={Mult} />
                    <Route exact path="/home/single" component={Single} />

                </Switch>

            </div>
        )
    }
}
export default connect()(Index)