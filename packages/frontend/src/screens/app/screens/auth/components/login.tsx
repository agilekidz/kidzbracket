import React, { useState } from 'react';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Row } from 'antd';

import { useAuth } from '../../../contexts/auth-context';
import gitHubAuthUri from '../utils/github-auth-uri';
import googleAuthUri from '../utils/google-auth-uri';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { loginPassword } = useAuth();

	const onFinish = () => {
		loginPassword(email, password);
	};

	return (
		<Card title="Login" style={{ width: '400px', margin: '16px auto 0 auto' }}>
			<Row justify="center" style={{ marginBottom: '16px' }}>
				<Button
					onClick={() => {
						window.location.href = gitHubAuthUri;
					}}
				>
					Login with GitHub
				</Button>
			</Row>
			<Row justify="center" style={{ marginBottom: '16px' }}>
				<Button
					onClick={() => {
						window.location.href = googleAuthUri;
					}}
				>
					Login with Google
				</Button>
			</Row>
			<Row justify="center">or</Row>
			<Form name="login" layout="vertical" size="large" onFinish={onFinish}>
				<Form.Item
					label="Email"
					name="email"
					rules={[{ required: true, message: 'Please input your email!' }]}
				>
					<Input
						prefix={<UserOutlined className="site-form-item-icon" />}
						onChange={event => setEmail(event.target.value)}
						placeholder="Email"
					/>
				</Form.Item>
				<Form.Item
					label="Password"
					name="password"
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input.Password
						prefix={<LockOutlined className="site-form-item-icon" />}
						onChange={event => setPassword(event.target.value)}
						placeholder="Password"
					/>
				</Form.Item>
				<Row justify="center">
					<Form.Item>
						<Button type="primary" htmlType="submit">
							Login
						</Button>
					</Form.Item>
				</Row>
			</Form>
		</Card>
	);
};

export default Login;
