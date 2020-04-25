import React from 'react';

import { Link, Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { Normalize } from 'styled-normalize';

import GuestRoute from './components/guest-route';
import PrivateRoute from './components/private-route';
import { useAuth } from './contexts/auth-context';
import AuthScreen from './screens/auth';
import BracketScreen from './screens/bracket';
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

const LinkStyling = {
	font: '1.4em Arial, sans-serif',
	textDecoration: 'none',
	color: 'black',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	width: '100%',
	height: '100%',
};

const AppView = () => {
	const { isAuthenticated, logout, user } = useAuth();

	return (
		<div style={{ background: 'rgb(74, 78, 105)', minHeight: '100vh' }}>
			<GlobalStyle />
			<Normalize />
			<div style={{ background: '#2B2D42', width: '100%', height: '75px', display: 'flex' }}>
				<LinkWrapper>
					<Link style={LinkStyling} to="/">
						Home
					</Link>
				</LinkWrapper>
				{
					///maybe add some .env testing thing to this button, its ment to link to the site for new features
				}
				<LinkWrapper style={{ marginRight: 'auto' }}>
					<Link style={LinkStyling} to="/bracket">
						Testing
					</Link>
				</LinkWrapper>
				<LinkWrapper style={{ marginLeft: 'auto' }}>
					<Link style={LinkStyling} to="/users">
						Users
					</Link>
				</LinkWrapper>
				{!isAuthenticated && (
					<LinkWrapper>
						<Link style={LinkStyling} to="/auth/login">
							Login
						</Link>
					</LinkWrapper>
				)}
				{!isAuthenticated && (
					<LinkWrapper>
						<Link style={LinkStyling} to="/auth/register">
							<p>Register</p>
						</Link>
					</LinkWrapper>
				)}
				{isAuthenticated && (
					<LinkWrapper onClick={() => logout()}>
						<p style={{ textAlign: 'center', font: '1.4em Arial, sans-serif' }}>
							Logout <br /> {user && user.name}
						</p>
					</LinkWrapper>
				)}
			</div>
			<Switch>
				<PrivateRoute path="/users" component={UsersScreen} />
				<GuestRoute path="/auth" component={AuthScreen} />
				<Route exact path="/" component={HomeScreen} />
				<Route path="/bracket" component={BracketScreen} />
			</Switch>
		</div>
	);
};

export default AppView;
