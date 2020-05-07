import React from 'react';

import { useHistory } from 'react-router-dom';

import { BracketMatch } from '../bracket-view';

import { Card, Team } from './match-card-styles';

interface Props {
	match: BracketMatch;
	invisible?: boolean;
}

const MatchCardView: React.FC<Props> = ({ match, invisible = false }) => {
	const history = useHistory();
	return (
		<Card invisible={invisible} onClick={() => history.push('/match/' + match.id)}>
			<Team first>{match.firstTeam && match.firstTeam.name}</Team>
			<Team first={false}>{match.secondTeam && match.secondTeam.name}</Team>
		</Card>
	);
};

export default MatchCardView;
