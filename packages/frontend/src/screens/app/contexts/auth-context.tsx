import React, { useCallback, useContext, useState } from 'react';

import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useHistory } from 'react-router-dom';

import { Spinner } from '../shared/components/spinner';

import {
	GitHubLoginMutation,
	GitHubLoginMutationVariables,
} from './__generated__/GitHubLoginMutation';
import {
	GoogleLoginMutation,
	GoogleLoginMutationVariables,
} from './__generated__/GoogleLoginMutation';
import { LogoutMutation } from './__generated__/LogoutMutation';
import {
	PasswordLoginMutation,
	PasswordLoginMutationVariables,
} from './__generated__/PasswordLoginMutation';
import { ProfileQuery } from './__generated__/ProfileQuery';
import { RegisterMutation, RegisterMutationVariables } from './__generated__/RegisterMutation';

interface User {
	id: string;
	name: string;
}

interface AuthContextValue {
	user: User | null;
	isAuthenticated: boolean;
	loginGitHub: (code: string) => Promise<void>;
	loginGoogle: (code: string) => Promise<void>;
	loginPassword: (email: string, password: string) => Promise<void>;
	register: (name: string, email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextValue>({
	user: null,
	isAuthenticated: false,
	loginGitHub: () => {
		throw new Error('Not implemented');
	},
	loginGoogle: () => {
		throw new Error('Not implemented');
	},
	loginPassword: () => {
		throw new Error('Not implemented');
	},
	register: () => {
		throw new Error('Not implemented');
	},
	logout: () => {
		throw new Error('Not implemented');
	},
});

const GITHUB_LOGIN_MUTATION = gql`
	mutation GitHubLoginMutation($input: LoginGitHubInput!) {
		loginGitHub(input: $input) {
			success
		}
	}
`;

const GOOGLE_LOGIN_MUTATION = gql`
	mutation GoogleLoginMutation($input: LoginGoogleInput!) {
		loginGoogle(input: $input) {
			success
		}
	}
`;

const PASSWORD_LOGIN_MUTATION = gql`
	mutation PasswordLoginMutation($input: LoginPasswordInput!) {
		loginPassword(input: $input) {
			success
		}
	}
`;

const REGISTER_MUTATION = gql`
	mutation RegisterMutation($input: RegisterInput!) {
		register(input: $input) {
			success
		}
	}
`;

const LOGOUT_MUTATION = gql`
	mutation LogoutMutation {
		logout {
			success
		}
	}
`;

const PROFILE_QUERY = gql`
	query ProfileQuery {
		me {
			id
			name
		}
	}
`;

export const AuthProvider: React.FC = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [initialised, setInitialised] = useState(false);

	const client = useApolloClient();
	const history = useHistory();

	const { data, error, loading, refetch } = useQuery<ProfileQuery>(PROFILE_QUERY);

	const [_loginGitHub] = useMutation<GitHubLoginMutation, GitHubLoginMutationVariables>(
		GITHUB_LOGIN_MUTATION,
	);

	const [_loginGoogle] = useMutation<GoogleLoginMutation, GoogleLoginMutationVariables>(
		GOOGLE_LOGIN_MUTATION,
	);

	const [_loginPassword] = useMutation<PasswordLoginMutation, PasswordLoginMutationVariables>(
		PASSWORD_LOGIN_MUTATION,
	);

	const [_register] = useMutation<RegisterMutation, RegisterMutationVariables>(REGISTER_MUTATION);

	const [_logout] = useMutation<LogoutMutation>(LOGOUT_MUTATION);

	const loginGitHub = useCallback(
		(code: string) => {
			return _loginGitHub({ variables: { input: { code } } })
				.then(({ data }) => {
					if (!data?.loginGitHub.success) {
						throw new Error('Unsuccessful login attempt');
					}

					return refetch();
				})
				.then(({ data }) => {
					if (data) {
						setIsAuthenticated(true);
						setUser(data.me);
					}
				});
		},
		[_loginGitHub, refetch],
	);

	const loginGoogle = useCallback(
		(code: string) => {
			return _loginGoogle({ variables: { input: { code } } })
				.then(({ data }) => {
					if (!data?.loginGoogle.success) {
						throw new Error('Unsuccessful login attempt');
					}

					return refetch();
				})
				.then(({ data }) => {
					if (data) {
						setIsAuthenticated(true);
						setUser(data.me);
					}
				});
		},
		[_loginGoogle, refetch],
	);

	const loginPassword = useCallback(
		(email: string, password: string) => {
			return _loginPassword({ variables: { input: { email, password } } })
				.then(({ data }) => {
					if (!data?.loginPassword.success) {
						throw new Error('Unsuccessful login attempt');
					}

					return refetch();
				})
				.then(({ data }) => {
					if (data) {
						setIsAuthenticated(true);
						setUser(data.me);
					}
				});
		},
		[_loginPassword, refetch],
	);

	const register = useCallback(
		(name: string, email: string, password: string) => {
			return _register({ variables: { input: { name, email, password } } })
				.then(({ data }) => {
					if (!data?.register.success) {
						throw new Error('Unsuccessful registration attempt');
					}

					return refetch();
				})
				.then(({ data }) => {
					if (data) {
						setIsAuthenticated(true);
						setUser(data.me);
						history.replace('/profile');
					}
				});
		},
		[_register, history, refetch],
	);

	const logout = useCallback(() => {
		return _logout().then(({ data }) => {
			if (data?.logout.success) {
				setIsAuthenticated(false);
				setUser(null);
				client.resetStore();
			}
		});
	}, [_logout, client]);

	if (error && user) {
		setUser(null);
		setIsAuthenticated(false);
	}

	if (loading && !initialised) {
		return <Spinner />;
	}

	if (!loading && !initialised) {
		setInitialised(true);

		if (data) {
			setUser(data.me);
			setIsAuthenticated(true);
		}
	}

	if (data && data.me !== user) {
		setUser(data.me);
	}

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				user,
				loginGitHub,
				loginGoogle,
				loginPassword,
				register,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
