import React from 'react';

import { Switch, useRouteMatch } from 'react-router-dom';

import GuestRoute from '../../components/guest-route';

import FacebookAuth from './components/facebook-auth';
import GitHubAuth from './components/github-auth';
import GoogleAuth from './components/google-auth';
import Login from './components/login';
import Register from './components/register';

const AuthView = () => {
	const { url } = useRouteMatch();

	return (
		<Switch>
			<GuestRoute path={`${url}/login`} component={Login} />
			<GuestRoute path={`${url}/register`} component={Register} />
			<GuestRoute path={`${url}/facebook/callback`} component={FacebookAuth} />
			<GuestRoute path={`${url}/github/callback`} component={GitHubAuth} />
			<GuestRoute path={`${url}/google/callback`} component={GoogleAuth} />
		</Switch>
	);
};

export default AuthView;
