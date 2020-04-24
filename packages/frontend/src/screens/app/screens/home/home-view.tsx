import React from 'react';

import style from 'styled-components';

import TournamentCard from './components/tournament-card';

const Wrapper = style.div`
  margin-right: auto;
  margin-left:  auto; 
  max-width: 80%;
  height: 800px;
  background: lightgray; 
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

const info = [info1, info2];

const HomeView = () => {
	return (
		<Wrapper>
			{info.map(yeet => (
				<TournamentCard key={yeet.id} info={yeet} />
			))}
		</Wrapper>
	);
};

export default HomeView;
