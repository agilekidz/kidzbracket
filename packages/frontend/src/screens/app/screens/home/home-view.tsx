import React from 'react';

import styled from 'styled-components';

import TournamentCard from './components/tournament-card';

const Wrapper = styled.div`
	margin-right: auto;
	margin-left: auto;
	max-width: 1400px;
	display: flex;
`;

const Upcoming = styled.div`
	flex-grow: 2;
`;

const Newsfeed = styled.div`
	flex-grow: 1;
	flex-shrink: 0;
	flex-basis: 250px;
	margin-left: 20px;
	margin-top: 1%;
`;

/// Info required by card
// name - tournament 1
// date - now()
// desc - "my tournament"
// teams - "15/32"
// game - "Legend league"
// region - "EUW"

const info1 = {
	id: 1,
	name: 'LaggIT CM Counter-Strike: Global Offensive',
	date: new Date(),
	desc: 'cool tournament',
	teams: '19/32',
	game: 'LEagu',
	region: 'Euw',
};

const info2 = {
	id: 2,
	name: 'LaggIT CM League of Legends',
	date: new Date(),
	desc: 'bad tournament',
	teams: '14/32',
	game: 'Valorant',
	region: 'NA',
};

const info = [info1, info2, info1, info2, info1, info2];

const HomeView = () => {
	return (
		<Wrapper>
			<Upcoming>
				{info.map(yeet => (
					<TournamentCard key={yeet.id} info={yeet} />
				))}
			</Upcoming>
			<Newsfeed>
				<div style={{ height: '800px', background: 'red' }} />
			</Newsfeed>
		</Wrapper>
	);
};

export default HomeView;
