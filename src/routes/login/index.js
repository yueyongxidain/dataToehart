import React, { Component } from 'react'
import { connect } from 'dva';
import './index.less'
import { Form, Input, Button, Checkbox } from 'antd'
import Bg from '../../assets/bg.png'
import Logo from '../../assets/logo.png'
import POST from '../../utils/request.js'
class Index extends Component {
    //表单提交
    handleSubmit = () => {
        const { form: { validateFields } } = this.props
        validateFields((error, values) => {
            if (!!error) return;
            POST('/demo/login.php', { userName: 'admin', passWord: '123456' }).then(app => {
                if (app.code == 0) {
                    console.log('登陆成功')
                    debugger
                    const urlParams = new URL(window.location.href);
                    window.location.href = urlParams.origin + '/#/upload';
                }
            })
        })
    }
    render() {
        let { form: { getFieldDecorator } } = this.props
        return (
            <div className='login-body'>
                <img src={Bg} className='bg' />
                <img src={Logo} className='logo' />
                <span className='title'>数据可视化系统</span>
                <span className='hello'>欢迎使用</span>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '请输入用户名' }],
                        })(
                            <Input placeholder={" 用户名"} />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('passWord', {
                            rules: [{ required: true, message: '请输入密码' }],
                        })(
                            <Input placeholder=" 密码" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            initialValue: true,
                            rules: [{ required: true, message: '请输入密码' }],
                        })(
                            <Checkbox>保持登陆状态</Checkbox>
                        )}
                        <a className="login-form-forgot" href="">忘记密码</a>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit">登录</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
export default connect()(Form.create()(Index))