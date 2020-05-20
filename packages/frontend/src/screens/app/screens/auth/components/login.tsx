import React, { useState } from 'react';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../../contexts/auth-context';
import gitHubAuthUri from '../utils/github-auth-uri';
import googleAuthUri from '../utils/google-auth-uri';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { loginPassword } = useAuth();

	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 16 },
	};

	const tailLayout = {
		wrapperCol: { offset: 8, span: 16 },
	};

	const onFinish = () => {
		loginPassword(email, password);
	};
	const onFinishFailed = () => {};
	return (
		<Form
			{...layout}
			name="login"
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
		>
			<Form.Item {...tailLayout}>
				<Button
					onClick={() => {
						window.location.href = gitHubAuthUri;
					}}
				>
					Login with GitHub
				</Button>
			</Form.Item>
			<Form.Item {...tailLayout}>
				<Button
					onClick={() => {
						window.location.href = googleAuthUri;
					}}
				>
					Login with Google
				</Button>
			</Form.Item>
			<Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
				<Input
					prefix={<UserOutlined className="site-form-item-icon" />}
					onChange={event => setEmail(event.target.value)}
					placeholder="Email"
				/>
			</Form.Item>
			<Form.Item
				name="password"
				rules={[{ required: true, message: 'Please input your password!' }]}
			>
				<Input.Password
					prefix={<LockOutlined className="site-form-item-icon" />}
					onChange={event => setPassword(event.target.value)}
					placeholder="Password"
				/>
			</Form.Item>
			<Form.Item {...tailLayout}>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
};

export default Login;
