import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const LinkStyling = css`
	text-decoration: none;
	padding: 20px 15px;
	display: block;
	color: white;
	transition: all 0.2s;
	cursor: pointer;

	&:hover {
		box-shadow: inset 0 0 10px #000000;
	}
`;

export const StyledLink = styled(Link)`
	${LinkStyling}
`;

export const StyledButton = styled.button`
	${LinkStyling}
`;

export const Navbar = styled.div`
	background: #2b2d42;
	display: flex;
	justify-content: space-between;
`;

export const Navbox = styled.div`
	display: flex;
`;
