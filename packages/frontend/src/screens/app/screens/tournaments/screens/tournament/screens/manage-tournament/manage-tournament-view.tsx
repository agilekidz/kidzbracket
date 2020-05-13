import React from 'react';

import styled from 'styled-components';

import Item from './components/contested-match-item';

const List = styled.div`
	width: 300px;
	height: 500px;
	background: red;
`;

interface Team {
	id: string;
	name: string;
}

interface Match {
	id: string;
	firstTeam: Team | null;
	secondTeam: Team | null;
}

interface Props {
	matches: Match[];
	tournament: { id: string };
}

const ManageTournamentView: React.FC<Props> = ({ matches, tournament }) => {
	return (
		<div>
			<List>
				{matches.map(match => (
					<Item key={match.id} match={match} tournament={tournament}></Item>
				))}
			</List>
		</div>
	);
};

export default ManageTournamentView;
