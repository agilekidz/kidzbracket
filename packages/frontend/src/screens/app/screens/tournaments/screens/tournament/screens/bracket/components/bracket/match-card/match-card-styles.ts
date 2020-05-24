import styled from 'styled-components';

interface CardProps {
	invisible?: boolean;
}

export const Card = styled.div<CardProps>`
	border: 1px black solid;
	width: 200px;
	opacity: ${({ invisible }) => (invisible ? '0' : '1')};
	border-radius: 3px;
	padding: 5px;
	background: #1f1f1f;
`;

interface TeamProps {
	winner: boolean;
}

export const Team = styled.div<TeamProps>`
	background: ${({ winner }) => (winner ? 'green' : 'none')};
	border-radius: 3px;
	padding: 2px 5px;
	height: 24px;
	color: white;
`;
