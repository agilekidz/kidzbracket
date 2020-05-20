import React from 'react';

import styled from 'styled-components';

import TournamentCard from './components/tournament-card';

const Wrapper = styled.div`
	margin-right: auto;
	margin-left: auto;
	max-width: 1400px;
	display: flex;
	flex-grow: 1;
`;

const Upcoming = styled.div`
	flex-grow: 2;
`;

interface Tournament {
	id: string;
	name: string;
	description: string;
	game: string;
	maxTeams: number;
	teams: {
		id: string;
		name: string;
	}[];
	winner: { name: string } | null;
}

interface Props {
	tournaments: Tournament[];
}

const HomeView: React.FC<Props> = ({ tournaments }) => {
	return (
		<Wrapper>
			<Upcoming>
				{tournaments.map(tournament => (
					<TournamentCard key={tournament.id} tournament={tournament} />
				))}
			</Upcoming>
		</Wrapper>
	);
};

export default HomeView;
