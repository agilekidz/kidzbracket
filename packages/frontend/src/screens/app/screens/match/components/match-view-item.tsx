import React from 'react';

interface Team {
	id: string;
	name: string;
	players: string[];
}

interface Match {
	id: string;
	firstTeam: Team;
	secondTeam: Team;
}

interface Props {
	match: Match;
}

const MatchViewItem: React.FC<Props> = ({ match }) => {
	return (
		<div>
			<h1>{match.firstTeam.name}</h1>
			{match.firstTeam.players.map(player => (
				<p key={player}>{player}</p>
			))}
			<h1>{match.secondTeam.name}</h1>
			{match.secondTeam.players.map(player => (
				<p key={player}>{player}</p>
			))}
		</div>
	);
};

export default MatchViewItem;
