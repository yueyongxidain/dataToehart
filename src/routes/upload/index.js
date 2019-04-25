import React, { Component } from 'react'
import { connect } from 'dva';
import { Upload,Spin,Popover } from 'antd'
import { routerRedux } from 'dva/router';
import Bg from '../../assets/bg.png'
import Logo from '../../assets/logo.png'
import IconUpload from '../../assets/icon_upload.png'
import './index.less'
import Icon from '../../assets/icon_home.png'
let length = 0;
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading : false
        }
    }
    change = (e)=>{
        if(length == e.fileList.length){
            let i = e.fileList.find((e)=>{
                return e.status!=='done'
            })||[]
            if(!!i && i.length==0){
                this.setState({
                    loading : false
                })
                this.props.dispatch(routerRedux.push("/home/all"))
            }
            else{
                this.setState({
                    loading : true
                })
            }
        }
        else{
            this.setState({
                loading : true
            })
            length =e.fileList.length
        }
    }
    render() {
        return (
            <div className='upload-body'>
            <Spin spinning={this.state.loading}>
                <img src={Bg} className='bg' />
                <img src={Logo} className='logo' />
                <Popover content={<a href='javascript:' onClick={this.logOut}>注销</a>}>
                        <img src={Icon} className='header-Icon' />
                </Popover>
                <span className='header-Icon-title1'>admin</span>
                <span className='header-Icon-title2'>管理员</span>
                <span className='title'>分析数据上传</span>
                <Upload action="/demo/upload.php" directory onChange={this.change}>
                        <img src={IconUpload} className='icon-upload'/>
                </Upload>
            </Spin>
            </div>
        )
    }
}
export default connect()(Index)