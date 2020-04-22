import React, { useState } from 'react';

import { useAuth } from '../../../contexts/auth-context';
import facebookAuthUri from '../utils/facebook-auth-uri';
import gitHubAuthUri from '../utils/github-auth-uri';
import googleAuthUri from '../utils/google-auth-uri';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { loginPassword } = useAuth();

	return (
		<>
			<ul>
				<li>
					<a href={facebookAuthUri}>Login with Facebook</a>
				</li>
				<li>
					<a href={gitHubAuthUri}>Login with GitHub</a>
				</li>
				<li>
					<a href={googleAuthUri}>Login with Google</a>
				</li>
			</ul>
			or
			<form
				onSubmit={event => {
					event.preventDefault();
					loginPassword(email, password);
				}}
			>
				<div>
					<label htmlFor="email">Email</label>
					<input
						type="text"
						id="email"
						value={email}
						onChange={event => setEmail(event.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={event => setPassword(event.target.value)}
					/>
				</div>
				<input type="submit" value="Login" />
			</form>
		</>
	);
};

export default Login;
