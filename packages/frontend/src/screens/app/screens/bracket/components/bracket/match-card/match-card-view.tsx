import React from 'react';

import { BracketMatch } from '../bracket-view';

import { Card, Team } from './match-card-styles';

interface Props {
	match: BracketMatch;
	invisible?: boolean;
}

const MatchCard: React.FC<Props> = ({ match, invisible = false }) => {
	return (
		<Card invisible={invisible}>
			<Team first>{match.firstTeam && match.firstTeam.name}</Team>
			<Team first={false}>{match.secondTeam && match.secondTeam.name}</Team>
		</Card>
	);
};

export default MatchCard;
