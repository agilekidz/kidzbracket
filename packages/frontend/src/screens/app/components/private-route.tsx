import React from 'react';

import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useAuth } from '../contexts/auth-context';

interface Props extends RouteProps {}

const PrivateRoute: React.FC<Props> = ({ ...rest }) => {
	const { isAuthenticated } = useAuth();

	if (isAuthenticated) {
		return <Route {...rest} />;
	} else {
		return <Redirect to="/auth/login" />;
	}
};

export default PrivateRoute;
