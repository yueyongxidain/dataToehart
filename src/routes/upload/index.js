import React, { Component } from 'react'
import { connect } from 'dva';
import { Form, Icon, Button, Upload } from 'antd'

import Bg from '../../assets/bg.png'
import Logo from '../../assets/logo.png'
import POST from '../../utils/request.js'
import IconUpload from '../../assets/icon_upload.png'
import './index.less'
class Index extends Component {
    render() {
        return (
            <div className='upload-body'>
                <img src={Bg} className='bg' />
                <img src={Logo} className='logo' />
                <span className='title'>分析数据上传</span>
                <Upload action="/demo/upload.php" directory>
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