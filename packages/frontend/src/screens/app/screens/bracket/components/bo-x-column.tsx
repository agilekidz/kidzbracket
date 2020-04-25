import React from 'react';

import styled from 'styled-components';

import MatchCard from './match-card';

const Column = styled.div`
	height: 500px;
	width: 200px;
	border: 1px solid black;
	background: red;
	display: flex;
	justify-content: center;
	flex-direction: column;
	padding: 40px 0 40px 0;
`;

interface MatchesProps {
	props: {
		matches: number[];
	};
}

const BoXColumn: React.FC<MatchesProps> = ({ props }) => {
	return (
		<Column>
			{props.matches.map(match => (
				<MatchCard match={match}></MatchCard>
			))}
		</Column>
	);
};

export default BoXColumn;
