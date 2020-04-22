import React, { useCallback, useContext, useState } from 'react';

import { gql, useMutation, useQuery } from '@apollo/client';

interface User {
	id: string;
	name: string;
}

interface AuthContextValue {
	user: User | null;
	isAuthenticated: boolean;
	loginFacebook: (code: string) => Promise<void>;
	loginGitHub: (code: string) => Promise<void>;
	loginGoogle: (code: string) => Promise<void>;
	loginPassword: (email: string, password: string) => Promise<void>;
	register: (name: string, email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextValue>({
	user: null,
	isAuthenticated: false,
	loginFacebook: () => {
		throw new Error('Not implemented');
	},
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

interface FacebookLoginMutationResult {
	loginFacebook: {
		success: boolean;
	};
}

interface FacebookLoginMutationInput {
	input: {
		code: string;
	};
}

const FACEBOOK_LOGIN_MUTATION = gql`
	mutation FacebookLoginMutation($input: LoginFacebookInput!) {
		loginFacebook(input: $input) {
			success
		}
	}
`;

interface GitHubLoginMutationResult {
	loginGitHub: {
		success: boolean;
	};
}

interface GitHubLoginMutationInput {
	input: {
		code: string;
	};
}

const GITHUB_LOGIN_MUTATION = gql`
	mutation GitHubLoginMutation($input: LoginGitHubInput!) {
		loginGitHub(input: $input) {
			success
		}
	}
`;

interface GoogleLoginMutationResult {
	loginGoogle: {
		success: boolean;
	};
}

interface GoogleLoginMutationInput {
	input: {
		code: string;
	};
}

const GOOGLE_LOGIN_MUTATION = gql`
	mutation GoogleLoginMutation($input: LoginGoogleInput!) {
		loginGoogle(input: $input) {
			success
		}
	}
`;

interface PasswordLoginMutationResult {
	loginPassword: {
		success: boolean;
	};
}

interface PasswordLoginMutationInput {
	input: {
		email: string;
		password: string;
	};
}

const PASSWORD_LOGIN_MUTATION = gql`
	mutation PasswordLoginMutation($input: LoginPasswordInput!) {
		loginPassword(input: $input) {
			success
		}
	}
`;

interface RegisterMutationResult {
	register: {
		success: boolean;
	};
}

interface RegisterMutationInput {
	input: {
		name: string;
		email: string;
		password: string;
	};
}

const REGISTER_MUTATION = gql`
	mutation RegisterMutation($input: RegisterInput!) {
		register(input: $input) {
			success
		}
	}
`;

interface LogoutMutationResult {
	logout: {
		success: true;
	};
}

const LOGOUT_MUTATION = gql`
	mutation Logout {
		logout {
			success
		}
	}
`;

interface ProfileQueryResult {
	me: User;
}

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
	const { data, loading, refetch } = useQuery<ProfileQueryResult>(PROFILE_QUERY);

	const [_loginFacebook] = useMutation<FacebookLoginMutationResult, FacebookLoginMutationInput>(
		FACEBOOK_LOGIN_MUTATION,
	);

	const [_loginGitHub] = useMutation<GitHubLoginMutationResult, GitHubLoginMutationInput>(
		GITHUB_LOGIN_MUTATION,
	);

	const [_loginGoogle] = useMutation<GoogleLoginMutationResult, GoogleLoginMutationInput>(
		GOOGLE_LOGIN_MUTATION,
	);

	const [_loginPassword] = useMutation<PasswordLoginMutationResult, PasswordLoginMutationInput>(
		PASSWORD_LOGIN_MUTATION,
	);

	const [_register] = useMutation<RegisterMutationResult, RegisterMutationInput>(REGISTER_MUTATION);

	const [_logout] = useMutation<LogoutMutationResult>(LOGOUT_MUTATION);

	const loginFacebook = useCallback(
		(code: string) => {
			return _loginFacebook({ variables: { input: { code } } })
				.then(({ data }) => {
					if (!data?.loginFacebook.success) {
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
		[_loginFacebook, refetch],
	);

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
					}
				});
		},
		[_register, refetch],
	);

	const logout = useCallback(() => {
		return _logout().then(({ data }) => {
			if (data?.logout.success) {
				setIsAuthenticated(false);
				setUser(null);
			}
		});
	}, [_logout]);

	if (loading && !initialised) {
		return <>Getting authentication...</>;
	}

	if (!loading && !initialised) {
		setInitialised(true);

		if (data) {
			setUser(data.me);
			setIsAuthenticated(true);
		}
	}

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				user,
				loginFacebook,
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
