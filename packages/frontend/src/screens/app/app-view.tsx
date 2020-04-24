import React from 'react';

import { Link, Route, Switch } from 'react-router-dom';
import { Normalize } from 'styled-normalize';

import GuestRoute from './components/guest-route';
import PrivateRoute from './components/private-route';
import { useAuth } from './contexts/auth-context';
import AuthScreen from './screens/auth';
import HomeScreen from './screens/home';
import UsersScreen from './screens/users';

const AppView = () => {
	const { isAuthenticated, logout, user } = useAuth();

	return (
		<div style={{ background: 'black', height: '100vh' }}>
			<Normalize />
			<ul style={{ margin: '0' }}>
				<li>
					<Link to="/users">Users</Link>
				</li>
				{!isAuthenticated && (
					<li>
						<Link to="/auth/login">Login</Link>
					</li>
				)}
				{!isAuthenticated && (
					<li>
						<Link to="/auth/register">Register</Link>
					</li>
				)}
				{isAuthenticated && <button onClick={() => logout()}>Logout {user && user.name}</button>}
			</ul>
			<Switch>
				<PrivateRoute path="/users" component={UsersScreen} />
				<GuestRoute path="/auth" component={AuthScreen} />
				<Route exact path="/" component={HomeScreen} />
			</Switch>
		</div>
	);
};

export default AppView;
