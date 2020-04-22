import { useEffect } from 'react';

import { parse } from 'query-string';
import { useLocation } from 'react-router-dom';

import { useAuth } from '../../../contexts/auth-context';

const GoogleAuth = () => {
	const location = useLocation();
	const code = parse(location.search).code;
	const { loginGoogle } = useAuth();

	useEffect(() => {
		loginGoogle(typeof code === 'string' ? code : '');
	}, [code, loginGoogle]);

	return null;
};

export default GoogleAuth;
