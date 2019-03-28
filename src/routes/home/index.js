import React, { Component } from 'react'
import { connect } from 'dva';
class Index extends Component {
    render() {
        return (
                <div className='hover-shadow'>
                    主页
                </div>
            )
    }
}
export default connect()(Index)