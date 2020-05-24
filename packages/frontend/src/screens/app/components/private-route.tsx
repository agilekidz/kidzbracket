import React from 'react';

import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';

import { useAuth } from '../contexts/auth-context';

interface Props extends RouteProps {}

const PrivateRoute: React.FC<Props> = ({ ...rest }) => {
	const { isAuthenticated } = useAuth();
	const { pathname } = useLocation();

	if (isAuthenticated) {
		return <Route {...rest} />;
	} else {
		return <Redirect to={{ pathname: '/auth/login', state: { from: pathname } }} />;
	}
};

export default PrivateRoute;
