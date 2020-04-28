import React from 'react';

import styled from 'styled-components';

// Layout
const LayoutInternal = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
`;

const Nav = styled.nav`
	display: flex;
	justify-content: center;

	background: #2b2d42;
	color: white;
`;

const Content = styled.div`
	flex-grow: 1;
	display: flex;
	justify-content: center;
`;

const Footer = styled.footer`
	display: flex;
	justify-content: center;

	background: #2b2d42;
	color: white;
`;

const Wrapper = styled.div`
	flex-basis: 1300px;
`;

export class Layout extends React.Component {
	static Nav = Nav;
	static Content = Content;
	static Footer = Footer;
	static Wrapper = Wrapper;

	render() {
		this.props;
		return <LayoutInternal>{this.props.children}</LayoutInternal>;
	}
}
