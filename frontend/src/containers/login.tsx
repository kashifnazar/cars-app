import React, { useState } from 'react'
import { Form, Input, Button, Alert } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useForm } from 'antd/es/form/Form'
import useLogin, { LoginRequest } from '../hooks/useLogin'
import { useAuth } from '../context/auth'

function Login() {

	const [form] = useForm<LoginRequest>()

	const [error, setError] = useState('')

	const { login } = useAuth()
	const {
		login: requestLogin
	} = useLogin({
		onSuccess(token) {
			setError('')
			login(token)
		},
		onFailed() {
			setError('Failed to login')
		}
	})

	async function onSubmit() {
		try {
			const user = await form.validateFields()
			requestLogin(user)
		} catch(e) {
			//
		}
	}

	return (
		<div className='login-container'>
			
			<Form form={form} className="login-form">

				{error && <div className='mb-2'><Alert message={error} type='error' /></div>}

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
					<Button type="primary" htmlType="submit" className='login-button' onClick={onSubmit}>
                    Log in
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default Login

