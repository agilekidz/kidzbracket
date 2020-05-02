import React from 'react';

import { useAuth } from '../../contexts/auth-context';

import { Navbar, Navbox, StyledButton, StyledLink } from './navbar-styles';

const NavbarView = () => {
	const { isAuthenticated, logout, user } = useAuth();

	return (
		<Navbar>
			<Navbox>
				<StyledLink to="/">Home</StyledLink>
				<StyledLink to="/tournament">Testing</StyledLink>
				<StyledLink to="/users">Users</StyledLink>
			</Navbox>
			<Navbox>
				{!isAuthenticated && (
					<>
						<StyledLink to="/auth/login">Login</StyledLink>
						<StyledLink to="/auth/register">Register</StyledLink>
					</>
				)}
				{isAuthenticated && (
					<>
						<StyledButton onClick={() => logout()}>Logout{user && ` ${user.name}`}</StyledButton>
						<StyledLink to="/profile">Profile!?!?{user && ` ${user.name}`}</StyledLink>
					</>
				)}
			</Navbox>
		</Navbar>
	);
};

export default NavbarView;
