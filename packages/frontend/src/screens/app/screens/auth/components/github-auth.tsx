import { useEffect } from 'react';

import { parse } from 'query-string';
import { useLocation } from 'react-router-dom';

import { useAuth } from '../../../contexts/auth-context';

const GitHubAuth = () => {
	const location = useLocation();
	const code = parse(location.search).code;
	const { loginGitHub } = useAuth();

	useEffect(() => {
		loginGitHub(typeof code === 'string' ? code : '');
	}, [code, loginGitHub]);

	return null;
};

export default GitHubAuth;
