import React from 'react';

import { Menu } from 'antd';
import { Link } from 'react-router-dom';

import { useAuth } from '../../contexts/auth-context';

import { MenuWrapper } from './navbar-styles';

const NavbarView = () => {
	const { isAuthenticated, logout } = useAuth();

	return (
		<MenuWrapper>
			<Menu theme="dark" mode="horizontal">
				<Menu.Item>
					<Link to="/">Home</Link>
				</Menu.Item>
				<Menu.Item>
					<Link to="/tournaments/create">Create tournament</Link>
				</Menu.Item>
			</Menu>
			<Menu theme="dark" mode="horizontal">
				{!isAuthenticated && (
					<Menu.Item>
						<Link to="/auth/login">Login</Link>
					</Menu.Item>
				)}
				{!isAuthenticated && (
					<Menu.Item>
						<Link to="/auth/register">Register</Link>
					</Menu.Item>
				)}
				{isAuthenticated && (
					<Menu.Item>
						<Link to="/profile">Profile</Link>
					</Menu.Item>
				)}
				{isAuthenticated && <Menu.Item onClick={() => logout()}>Logout</Menu.Item>}
			</Menu>
		</MenuWrapper>
	);
};

export default NavbarView;
