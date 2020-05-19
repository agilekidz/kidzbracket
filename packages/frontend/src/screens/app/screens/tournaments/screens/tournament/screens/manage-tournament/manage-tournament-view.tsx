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

export interface ManageTournamentTournament {
	id: string;
	started: boolean;
	contestedMatches: Match[];
}

interface Props {
	tournament: ManageTournamentTournament;
	handleTournamentStart: () => void;
}

const ManageTournamentView: React.FC<Props> = ({ tournament, handleTournamentStart }) => {
	return (
		<div>
			{!tournament.started && <button onClick={handleTournamentStart}>Start tournament</button>}
			<List>
				{tournament.contestedMatches.map(match => (
					<Item key={match.id} match={match} tournament={tournament}></Item>
				))}
			</List>
		</div>
	);
};

export default ManageTournamentView;
