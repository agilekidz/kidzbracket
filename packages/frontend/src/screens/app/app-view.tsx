import React from 'react';

import { Link, Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { Normalize } from 'styled-normalize';

import GuestRoute from './components/guest-route';
import PrivateRoute from './components/private-route';
import { useAuth } from './contexts/auth-context';
import AuthScreen from './screens/auth';
import HomeScreen from './screens/home';
import UsersScreen from './screens/users';

const GlobalStyle = createGlobalStyle`
	*{box-sizing: border-box}
`;

const LinkWrapper = styled.div`
	background: rgb(229, 234, 250);
	border: solid 1px black;
	border-top: 0;
	border-bottom: 0;
	width: 200px;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all 0.2s;
	cursor: pointer;
	&:hover {
		box-shadow: inset 0 0 10px #000000;
	}
`;

const AppView = () => {
	const { isAuthenticated, logout, user } = useAuth();

	return (
		<div style={{ background: 'rgb(74, 78, 105)', minHeight: '100vh' }}>
			<GlobalStyle />
			<Normalize />
			<div style={{ background: '#2B2D42', width: '100%', height: '75px', display: 'flex' }}>
				<LinkWrapper
					style={{ marginLeft: 'auto' }}
					//Detta funkade inte så bra pga tsx
					//onClick={() => document.getElementById('link1').click()}
				>
					<Link
						id="link1"
						style={{ font: '1.4em Arial, sans-serif', textDecoration: 'none', color: 'black' }}
						to="/users"
					>
						Users
					</Link>
				</LinkWrapper>
				{!isAuthenticated && (
					<LinkWrapper
					//onClick={() => document.getElementById('link2').click()}
					>
						<Link
							id="link2"
							style={{ font: '1.4em Arial, sans-serif', textDecoration: 'none', color: 'black' }}
							to="/auth/login"
						>
							Login
						</Link>
					</LinkWrapper>
				)}
				{!isAuthenticated && (
					<LinkWrapper
					//onClick={() => document.getElementById('link3').click()}
					>
						<Link
							id="link3"
							style={{ font: '1.4em Arial, sans-serif', textDecoration: 'none', color: 'black' }}
							to="/auth/register"
						>
							Register
						</Link>
					</LinkWrapper>
				)}
				{isAuthenticated && <button onClick={() => logout()}>Logout {user && user.name}</button>}
			</div>
			<Switch>
				<PrivateRoute path="/users" component={UsersScreen} />
				<GuestRoute path="/auth" component={AuthScreen} />
				<Route exact path="/" component={HomeScreen} />
			</Switch>
		</div>
	);
};

export default AppView;
