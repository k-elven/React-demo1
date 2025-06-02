import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import logo from '@/assets/logo.png'
import { useDispatch } from 'react-redux'
import { fetchUserToken } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = (values) => {
        dispatch(fetchUserToken(values)).then(() => {
            navigate('/')
            message.success('登录成功')
        })
    }
  return (
    <div className="login">
        <Card className="login-container">
            <img className="login-logo" src={logo} alt="" />
            {/* 登录表单 */}
            <Form  labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} validateTrigger="onBlur" onFinish={onFinish}>
                <Form.Item
                    label="手机号"
                    name="mobile"
                    rules={[
                        { required: true, message: '请输入手机号码!' },
                        {pattern: /^1[3-9]\d{9}$/, message: '手机号码格式不对'}
                    ]}
                >
                    <Input size="large" placeholder="请输入手机号" style={{width:'100%'}}/>
                </Form.Item>
                <Form.Item 
                    label="验证码"
                    name="code"
                    rules={[{ required: true, message: '请输入验证码!' }]}
                >
                    <Input size="large" placeholder="请输入验证码" style={{width:'100%'}}/>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 3, span: 18 }}>
                    <Button type="primary" htmlType="submit" size="large" block style={{textAlign:'center'}}>
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    </div>
  )
}

export default Login