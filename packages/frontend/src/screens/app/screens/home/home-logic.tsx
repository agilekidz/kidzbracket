import React from 'react';

import HomeView from './home-view';

interface Tournament {
	id: string;
	name: string;
	description: string;
	game: string;
}

interface Tournaments {
	tournaments: Tournament[];
}

const HomeLogic: React.FC<Tournaments> = ({ tournaments }) => {
	return <HomeView tournaments={tournaments} />;
};

export default HomeLogic;
