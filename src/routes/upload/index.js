import React, { Component } from 'react'
import { connect } from 'dva';
import { Form, Icon, Button, Upload } from 'antd'
import { routerRedux } from 'dva/router';
import Bg from '../../assets/bg.png'
import Logo from '../../assets/logo.png'
import POST from '../../utils/request.js'
import IconUpload from '../../assets/icon_upload.png'
import './index.less'
let length = 0;
class Index extends Component {
    change = (e)=>{
        console.log('e:',e)
        if(length == e.fileList.length){
            let i = e.fileList.find((e)=>{
                return e.status!=='done'
            })||[]
            if(!!i && i.length==0){
                this.props.dispatch(routerRedux.push("/home"))
            }
        }
        else{
            length =e.fileList.length
        }
    }
    render() {
        return (
            <div className='upload-body'>
                <img src={Bg} className='bg' />
                <img src={Logo} className='logo' />
                <span className='title'>分析数据上传</span>
                <Upload action="/demo/upload.php" directory onChange={this.change}>
                    <div className='upload'>
                        <img src={IconUpload} className='icon-upload'/>
                        <div className='upload-text'>请点击此处上传文件</div>
                    </div>
                </Upload>
            </div>
        )
    }
}
export default connect()(Index)