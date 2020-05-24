import React from 'react';

import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

import { useAuth } from '../../contexts/auth-context';

import { MenuWrapper } from './navbar-styles';

const keyFromPathname = (path: string) => {
	switch (path) {
		case '/':
			return 'home';
		case '/tournaments/create':
			return 'create';
		case '/auth/login':
			return 'login';
		case '/auth/register':
			return 'register';
		case '/profile':
			return 'profile';
	}

	return 'nada';
};

const NavbarView = () => {
	const { pathname } = useLocation();
	const selectedKeys = [keyFromPathname(pathname)];

	const { isAuthenticated, logout } = useAuth();

	return (
		<MenuWrapper>
			<Menu theme="dark" mode="horizontal" selectedKeys={selectedKeys}>
				<Menu.Item key="home">
					<Link to="/">Home</Link>
				</Menu.Item>
				<Menu.Item key="create">
					<Link to="/tournaments/create">Create tournament</Link>
				</Menu.Item>
			</Menu>
			<Menu theme="dark" mode="horizontal" selectedKeys={selectedKeys}>
				{!isAuthenticated && (
					<Menu.Item key="login">
						<Link to="/auth/login">Login</Link>
					</Menu.Item>
				)}
				{!isAuthenticated && (
					<Menu.Item key="register">
						<Link to="/auth/register">Register</Link>
					</Menu.Item>
				)}
				{isAuthenticated && (
					<Menu.Item key="profile">
						<Link to="/profile">Profile</Link>
					</Menu.Item>
				)}
				{isAuthenticated && (
					<Menu.Item key="logout" onClick={() => logout()}>
						Logout
					</Menu.Item>
				)}
			</Menu>
		</MenuWrapper>
	);
};

export default NavbarView;
