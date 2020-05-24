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

	const hasBothTeams = match.firstTeam !== null && match.secondTeam !== null;

	return (
		<Card
			invisible={invisible}
			onClick={() => {
				if (hasBothTeams) {
					history.push(`/matches/${match.id}`);
				}
			}}
			style={{
				cursor: hasBothTeams ? 'pointer' : 'auto',
			}}
		>
			<Team
				winner={
					(match.winner && match.firstTeam && match.winner.id === match.firstTeam.id) || false
				}
			>
				{match.firstTeam && match.firstTeam.name}
			</Team>
			<Team
				winner={
					(match.winner && match.secondTeam && match.winner.id === match.secondTeam.id) || false
				}
			>
				{match.secondTeam && match.secondTeam.name}
			</Team>
		</Card>
	);
};

export default MatchCardView;
