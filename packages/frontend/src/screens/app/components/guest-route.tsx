import React from 'react';

import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useAuth } from '../contexts/auth-context';

interface Props extends RouteProps {}

const GuestRoute: React.FC<Props> = ({ ...rest }) => {
	const { isAuthenticated } = useAuth();

	if (isAuthenticated) {
		return <Redirect to="/" />;
	} else {
		return <Route {...rest} />;
	}
};

export default GuestRoute;
