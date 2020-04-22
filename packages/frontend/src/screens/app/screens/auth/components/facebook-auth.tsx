import { useEffect } from 'react';

import { parse } from 'query-string';
import { useLocation } from 'react-router-dom';

import { useAuth } from '../../../contexts/auth-context';

const FacebookAuth = () => {
	const location = useLocation();
	const code = parse(location.search).code;
	const { loginFacebook } = useAuth();

	useEffect(() => {
		loginFacebook(typeof code === 'string' ? code : '');
	}, [code, loginFacebook]);

	return null;
};

export default FacebookAuth;
