import React from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

function Login() {
	return (
		<div className='login-container'>
			<Form
				className="login-form"
			>
				<Form.Item
					name="username"
					rules={[{
						required: true,
						message: 'Please input your username',
					}]}>
					<Input prefix={<UserOutlined />} placeholder="Username" />
				</Form.Item>
				<Form.Item
					name="password"
					rules={[{
						required: true,
						message: 'Please input your password',
					}]}>
					<Input
						prefix={<LockOutlined />}
						type="password"
						placeholder="Password"
					/>
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit" className='login-button'>
                    Log in
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default Login

