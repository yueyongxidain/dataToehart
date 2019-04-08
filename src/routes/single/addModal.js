import React, { Component } from 'react'
import { connect } from 'dva';
import { Form, Modal, Card, Input, Row, Col, Select } from "antd";
const Option = Select.Option
const FormItem = Form.Item;
const formLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
        md: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
        md: { span: 16 },
    },
}
const colLayout = {
    md: 24,
    lg: 24,
}
const gutter = { md: 4, lg: 8, xl: 16 };
class AddModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addVisible: props.addVisible || false,
            date: props.date || []
        }
    }
    componentWillReceiveProps = (nextProps) => {
        if (this.props.addVisible !== nextProps.addVisible) {
            this.props.form.resetFields();
        }
        if (this.props.date !== nextProps.date) {
            debugger
            this.setState({
                date: nextProps.date
            })
        }
        if (this.props.addVisible !== nextProps.addVisible) {
            this.setState({
                addVisible: nextProps.addVisible
            })
        }
    }
    //modal取消事件
    onCancel = () => {
        this.setState({
            addVisible: false
        })
        this.props.cancle()
    }
    //modal确定事件
    onOk = () => {
        const { form: { validateFields } } = this.props;
        const { date } = this.state
        validateFields((error, values) => {
            if (!!error) return;
            let res = date.filter((ele) => {
                return ele.type == values.type && ele.phone == values.phone
            }) || []
            if (res.length == 1) {
                this.props.add(
                    res
                )
                this.props.cancle()
            }
            else{
                return 
            }

        })
    }
    phoneType = (e) => {
        debugger
        let { date } = this.state
        let phone = date.filter((ele) => {
            return ele.type == e
        })
        this.setState({
            phone
        })
    }
    render() {
        const { loading, date, addVisible } = this.state;
        const { form: { getFieldDecorator } } = this.props
        return (
            <Modal
                visible={addVisible}
                title={'添加对比手机'}
                onCancel={this.onCancel}
                onOk={this.onOk}
                maskClosable={false}
                confirmLoading={loading}
                width="34%"
            >
                <Card className="hover-shadow" style={{ width: '100%' }}>
                    <Form >
                        <Row gutter={gutter}>
                            <Col {...colLayout}>
                                <FormItem label={"手机分类"}
                                    {...formLayout}
                                >
                                    {getFieldDecorator('type', {
                                        // initialValue: currentData.id,
                                        rules: [{ required: true, message: '请选择' }],
                                    })(
                                        <Select
                                            style={{ width: '100%' }}
                                            allowClear={true}
                                            showSearch={true}
                                            optionFilterProp="children"
                                            placeholder={"全部"}
                                            onChange={
                                                this.phoneType
                                            }
                                        >
                                            <Option value={'高端手机'} key={'高端手机'}>高端手机</Option>
                                            <Option value={'低端手机'} key={'低端手机'}>低端手机</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={gutter}>
                            <Col {...colLayout}>
                                <FormItem label={"手机型号"}
                                    {...formLayout}
                                >
                                    {getFieldDecorator('phone', {
                                        // initialValue: currentData.k2,
                                        rules: [{ required: true, message: '请选择' }],
                                    })(
                                        <Select
                                            style={{ width: '100%' }}
                                            allowClear={true}
                                            showSearch={true}
                                            optionFilterProp="children"
                                            placeholder={"全部"}
                                        >
                                            {date.map((ele) => {
                                                return <Option value={ele.phone} key={ele.phone}>{ele.phone}</Option>
                                            })}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Modal>
        )
    }
}
export default Form.create()(AddModal)
