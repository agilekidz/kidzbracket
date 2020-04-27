import styled from 'styled-components';

interface CardProps {
	invisible?: boolean;
}

export const Card = styled.div<CardProps>`
	border: 1px black solid;
	width: 200px;
	opacity: ${({ invisible }) => (invisible ? '0' : '1')};
`;

interface TeamProps {
	first: boolean;
}

export const Team = styled.div<TeamProps>`
	background: ${({ first }) => (first ? 'white' : 'gray')};
	height: 20px;
`;
