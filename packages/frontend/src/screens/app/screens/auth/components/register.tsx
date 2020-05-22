import React, { useState } from 'react';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Row } from 'antd';

import { useAuth } from '../../../contexts/auth-context';
import gitHubAuthUri from '../utils/github-auth-uri';
import googleAuthUri from '../utils/google-auth-uri';

const Register = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const { register } = useAuth();

	const onFinish = () => {
		if (password.length >= 8 && password === passwordConfirm) {
			register(name, email, password);
		}
	};

	return (
		<Card title="Register" style={{ width: '400px', margin: '16px auto 0 auto' }}>
			<Row justify="center" style={{ marginBottom: '16px' }}>
				<Button
					onClick={() => {
						window.location.href = gitHubAuthUri;
					}}
				>
					Register with GitHub
				</Button>
			</Row>
			<Row justify="center" style={{ marginBottom: '16px' }}>
				<Button
					onClick={() => {
						window.location.href = googleAuthUri;
					}}
				>
					Register with Google
				</Button>
			</Row>
			<Row justify="center">or</Row>
			<Form name="register" layout="vertical" size="large" onFinish={onFinish}>
				<Form.Item
					label="Name"
					name="name"
					rules={[{ required: true, message: 'Please input your name!' }]}
				>
					<Input
						prefix={<UserOutlined className="site-form-item-icon" />}
						onChange={event => setName(event.target.value)}
						placeholder="Name"
					/>
				</Form.Item>
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
				<Form.Item
					name="confirm"
					label="Confirm Password"
					dependencies={['password']}
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Please confirm your password!',
						},
						() => ({
							validator(_rule, value) {
								if (!value || password === value) {
									return Promise.resolve();
								}

								return Promise.reject('The two passwords that you entered do not match!');
							},
						}),
					]}
				>
					<Input.Password
						prefix={<LockOutlined className="site-form-item-icon" />}
						placeholder="Confirm password"
						onChange={event => setPasswordConfirm(event.target.value)}
					/>
				</Form.Item>
				<Row justify="center">
					<Form.Item>
						<Button type="primary" htmlType="submit">
							Register
						</Button>
					</Form.Item>
				</Row>
			</Form>
		</Card>
	);
};

export default Register;
