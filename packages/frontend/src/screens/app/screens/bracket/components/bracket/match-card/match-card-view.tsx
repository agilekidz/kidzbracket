import React from 'react';

import { BracketMatch } from '../bracket-view';

import { MatchCardOnClickAction } from './match-card-logic';
import { Card, Team } from './match-card-styles';

interface Props {
	match: BracketMatch;
	invisible?: boolean;
}

const MatchCardView: React.FC<Props> = ({ match, invisible = false }) => {
	return (
		<Card
			invisible={invisible}
			onClick={MatchCardOnClickAction({ matchId: match.id, props: this.props })}
		>
			<Team first>{match.firstTeam && match.firstTeam.name}</Team>
			<Team first={false}>{match.secondTeam && match.secondTeam.name}</Team>
		</Card>
	);
};

export default MatchCardView;
