import React from 'react';

import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';

import { useAuth } from '../contexts/auth-context';

interface Props extends RouteProps {}

const GuestRoute: React.FC<Props> = ({ ...rest }) => {
	const { isAuthenticated } = useAuth();
	const { state } = useLocation<{ from: string }>();

	if (isAuthenticated) {
		if (state && state.from) {
			return <Redirect to={state.from} />;
		}

		return <Redirect to="/" />;
	} else {
		return <Route {...rest} />;
	}
};

export default GuestRoute;
