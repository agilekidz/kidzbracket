import React, { useState } from 'react';

import { useAuth } from '../../../contexts/auth-context';
import facebookAuthUri from '../utils/facebook-auth-uri';
import gitHubAuthUri from '../utils/github-auth-uri';
import googleAuthUri from '../utils/google-auth-uri';

const Register = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const { register } = useAuth();

	return (
		<>
			<ul>
				<li>
					<a href={facebookAuthUri}>Register with Facebook</a>
				</li>
				<li>
					<a href={gitHubAuthUri}>Register with GitHub</a>
				</li>
				<li>
					<a href={googleAuthUri}>Register with Google</a>
				</li>
			</ul>
			or
			<form
				onSubmit={event => {
					event.preventDefault();
					if (password === passwordConfirm) {
						register(name, email, password);
					}
				}}
			>
				<div>
					<label htmlFor="name">Name</label>
					<input
						type="text"
						id="name"
						value={name}
						onChange={event => setName(event.target.value)}
					/>
				</div>
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
				<div>
					<label htmlFor="password-confirm">Confirm password</label>
					<input
						type="password"
						id="password-confirm"
						value={passwordConfirm}
						onChange={event => setPasswordConfirm(event.target.value)}
					/>
				</div>
				<input type="submit" value="Login" />
			</form>
		</>
	);
};

export default Register;
